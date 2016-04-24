'use strict';
var utility = require('./utility');
var bodyParser = require('body-parser');
var fs = require("fs");
const COLLECTION_NAME = "obiImages";

module.exports = function(app){
    var keys = JSON.parse(fs.readFileSync(__dirname + '../../data/keys.json', 'utf8'));
    var albums = fs.createWriteStream(__dirname + '/images.json');
    var Flickr = require("flickrapi"),
        flickrOptions = {
            api_key: keys.api_key,
            secret: keys.secret,
            user_id: keys.user_id,
            access_token: keys.access_token,
            access_token_secret: keys.access_token_secret
        };
     
     // Authenticate flicker 
     Flickr.authenticate(flickrOptions, function(err, flickr) {
         
         //get collection's albums - then get all images from albums - then save to file
         getTree(flickr).then(function(albums){
              var promises = albums.map(function(photoset){
                     return getPhotoset(flickr, photoset);
               });
               Promise.all(promises).then(function(images){
                   updateImages(images);
               })
         })
        
     });
   
     function updateImages(images){
         albums.write(JSON.stringify(images));
         console.log("albums updated");
     }
     
     // [Promise] Gets the tree collections tree and returns an array of albums
     // in the COLLECTION_NAME collection
     function getTree(flickr){
         return new Promise(function (resolve, reject){
             
             flickr.collections.getTree({
             user_id: flickr.options.user_id,
             authenticated: true
         }, function(err, result){
             if(err) { 
                 reject(err);
                }
             
             //get photosets from desired collection
             result.collections.collection.forEach( function(collection) {
                 if(collection.title === COLLECTION_NAME){
                     var albums = collection.set.map(function(photoset){
                         return photoset;
                     });
                     resolve(albums);
                 }
                 //return null;
             })
         })
         }
      )};
      
     /*
     function getTree(flickr){
         flickr.collections.getTree({
             user_id: flickr.options.user_id,
             authenticated: true
         }, function(err, result){
             if(err) { console.log(err); throw new Error(err);}
             result.collections.collection.forEach( function(collection) {
                 if(collection.title === "obiImages"){
                     var promises = collection.set.map(function(photoset){
                         return getPhotoset(flickr, photoset);
                     });
                     var p2 = Promise.all([promises]);
                     p2.then(function(data){
                            updateImages(data);
                        }, function(reason){
                            console.log(reason)
                        });
                      var p1 = getPhotoset(flickr, collection.set[0]);
                      p1.then(function(data){
                          console.log("fullfilled");
                          console.log(data);
                      })  
                 }
             })
         })
     };
     */
     
     var getPhotoset = function(flickr, photoset){
         return new Promise(function(resolve, reject){
             var set = {};
              flickr.photosets.getPhotos({
                    photoset_id: photoset.id,
                    user_id: flickr.options.user_id,
                    authenticated: true
                }, function(err, result){
                    if(err) {reject(err);}
                    var photos = [];
                    result.photoset.photo.forEach(function(image){
                        photos.push(utility.buildPhotoUrl(image));
                    });
                    set = {title: result.photoset.title, photos: photos}
                    console.log('promise');
                    resolve(set);
                });
         
         })
     }
}