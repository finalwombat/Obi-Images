var utility = require('./utility');
var bodyParser = require('body-parser');
var fs = require("fs");

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
     function updateImages(images){
         albums.write(JSON.stringify(images));
     }
        
     Flickr.authenticate(flickrOptions, function(err, flickr) {
         getTree(flickr);
        
     });
     
     function getTree(flickr){
         flickr.collections.getTree({
             user_id: flickr.options.user_id,
             authenticated: true
         }, function(err, result){
             if(err) { console.log(err); throw new Error(err);}
             result.collections.collection.forEach( function(collection) {
                 if(collection.title === "obiImages"){
                     collection.set.forEach( function(photoset) {
                         getPhotoset(flickr, photoset.id);
                     })
                 }
             })
         })
     };
     function getPhotoset(flickr, id){
                flickr.photosets.getPhotos({
                    photoset_id: id,
                    user_id: flickr.options.user_id,
                    authenticated: true
                }, function(err, result){
                    if(err) { console.log(err); throw new Error(err);}
                    photos = [];
                    result.photoset.photo.forEach(function(image){
                        photos.push(utility.buildPhotoUrl(image));
                    });

                    updateImages({title: result.photoset.title, photos: photos});
                });
      };
}