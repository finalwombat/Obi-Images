var fs = require('fs');
var images = fs.readFileSync( './data/images.json', 'utf-8');
var flickrController = require('./flickrController');
var firebaseAdmin = require.main.require('firebase-admin');
var serviceAccount = require('../data/serviceAccountKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://login-test-27aba.firebaseio.com"
});

module.exports = function(app) {

    app.get('/update/FlickerImages', function(req, res){
      flickrController(app, function(){
        res.redirect('/gallery');
      });

    });
    app.all('/admin/:idToken', function(req, res){
      var idToken = req.params.idToken;
      if(idToken){
        firebaseAdmin.auth().verifyIdToken(idToken)
          .then(function(decodedToken){
            res.render('admin');
          })
          .catch(function(err){
            res.redirect('/login');
          });
      } else {
        res.redirect('/');
      }

    });

    app.get('*', function(req, res) {
      res.redirect('/');
    });
}
