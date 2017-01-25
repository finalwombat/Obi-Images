module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/gallery', function(req, res){
      res.render('gallery.ejs')
    });

    app.get('/contact', function(req, res){
      res.render('contact.ejs')
    });
}
