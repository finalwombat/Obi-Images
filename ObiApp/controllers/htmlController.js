var fs = require('fs');


module.exports = function(app) {
    app.get('/', function(req, res) {

      var gallery = getGalleryImages();
      console.log('gallery: ', gallery[0]);
      res.render('index', {
        gallery: gallery[0]
      });
    });

    app.get('/gallery', function(req, res){
      res.render('gallery.ejs');
    });

    app.get('/contact', function(req, res){
      res.render('contact.ejs');
    });
}

function getGalleryImages(galleryName){
  var images = fs.readFileSync( './controllers/images.json', 'utf-8');
  if(!galleryName){galleryName = 'featured'};

  var gallery = JSON.parse(images);
  var album = gallery.filter(function(album){
      return album.title === galleryName;
  })
  return album;
}
