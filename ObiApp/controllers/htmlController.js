module.exports = function(app) {
    app.get('/', function(req, res) {

      var currentPage = 'home';
      res.render('index', {
        currentPage: currentPage
      });
    });

    app.get('/gallery', function(req, res){

      var currentPage = 'gallery';
      res.render('gallery.ejs', {
        currentPage: currentPage
      });
    });

    app.get('/contact', function(req, res){

      var currentPage = 'contact'
      res.render('contact.ejs', {
        currentPage: currentPage
      });
    });
}
