'use strict';
var utility = require('./utility');
var bodyParser = require('body-parser');
var fs = require("fs");
var path = require("path");
const COLLECTION_NAME = "WR Photography";

module.exports = function(app, callback){
    var keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/keys.json'), 'utf8'));
    var albums = fs.createWriteStream('./data/images.json');
    var Flickr = require("flickrapi"),
        flickrOptions = {
            api_key: keys.api_key,
            secret: keys.secret,
            user_id: keys.user_id,
        };

     // Authenticate flicker
     Flickr.tokenOnly(flickrOptions, function(err, flickr) {

        if(err){
          console.log('Authentication Error', err);
        }
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
         if(callback){callback();}
     }

     // [Promise] Gets the tree collections tree and returns an array of albums
     // in the COLLECTION_NAME collection
     function getTree(flickr){
         return new Promise(function (resolve, reject){

             flickr.collections.getTree({
             user_id: flickr.options.user_id,
         }, function(err, result){
             if(err) {
                 reject(err);
              }else{
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
              }


         })
         }
      )};

     var getPhotoset = function(flickr, photoset){
         return new Promise(function(resolve, reject){
             var set = {};
              flickr.photosets.getPhotos({
                    photoset_id: photoset.id,
                    user_id: flickr.options.user_id,
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
