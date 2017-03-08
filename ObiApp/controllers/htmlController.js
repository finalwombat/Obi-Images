var fs = require('fs');
var images = fs.readFileSync( './data/images.json', 'utf-8');


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

    app.get('/index/:galleryName', function(req, res){
      var gallery = getGalleryImages(req.params.galleryName);
      console.log(gallery);
      res.render('index', {
        gallery: gallery[0]
      });
    });

    app.get('/contact', function(req, res){
      res.render('contact.ejs');
    });

    app.get('/login', function(req, res){
      res.render('login.ejs');
    });

  }


  function getGalleryImages(galleryName){
    if(!galleryName){galleryName = 'featured'};

    var galleries = JSON.parse(images);
    var album = galleries.filter(function(album){
        return album.title === galleryName;
    })
    return album;
  }

  function getThumbnailsForGalleries(){
    var galleries = JSON.parse(images);

    var thumbnails = galleries.map(function(gallery){
      return {title: gallery.title, img: gallery.photos[1]};
    });

    return thumbnails;
  }
