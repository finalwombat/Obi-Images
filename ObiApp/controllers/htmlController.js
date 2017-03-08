var fs = require('fs');
var url = require('url');
var firebaseAdmin = require.main.require('firebase-admin');
var serviceAccount = require('../data/serviceAccountKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://login-test-27aba.firebaseio.com"
});


module.exports = function(app) {
    app.get('/', function(req, res) {

      var gallery = getGalleryImages();
      console.log('gallery: ', gallery[0]);
      res.render('index', {
        gallery: gallery[0]
      });
    });

    app.get('/gallery', function(req, res){
      var thumbnails = getThumbnailsForGalleries();
      res.render('gallery.ejs', {
        thumbnails: thumbnails
      });
    });

    app.get('/contact', function(req, res){
      res.render('contact.ejs');
    });

    app.get('/login', function(req, res){
      res.render('login.ejs');
    });

    app.all('/admin/:idToken', function(req, res){
      var idToken = req.params.idToken;
      if(idToken){
        firebaseAdmin.auth().verifyIdToken(idToken)
          .then(function(decodedToken){
            console.log(decodedToken);
            res.render('admin');
          })
          .catch(function(err){
            console.log(err);
            res.redirect('/login');
          });
      } else {
        console.log('no user token');
        res.redirect('/');
      }

    });

    app.get('/index/:galleryName', function(req, res){
      var gallery = getGalleryImages(req.params.galleryName);
      console.log(gallery);
      res.render('index', {
        gallery: gallery[0]
      });
    });


}

function getGalleryImages(galleryName){
  var images = fs.readFileSync( './data/images.json', 'utf-8');
  if(!galleryName){galleryName = 'featured'};

  var galleries = JSON.parse(images);
  var album = galleries.filter(function(album){
      return album.title === galleryName;
  })
  return album;
}

function getThumbnailsForGalleries(){
  var images = fs.readFileSync( './data/images.json', 'utf-8');
  var galleries = JSON.parse(images);

  var thumbnails = galleries.map(function(gallery){
    return {title: gallery.title, img: gallery.photos[1]};
  });

  return thumbnails;
}
