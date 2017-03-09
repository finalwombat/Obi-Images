var fs = require('fs');
var images = fs.readFileSync( './data/images.json', 'utf-8');
var flickrController = require('./flickrController');
var firebaseAdmin = require.main.require('firebase-admin');
var serviceAccount = require('../data/serviceAccountKey.json');
var cookie = require('cookie');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://login-test-27aba.firebaseio.com"
});

module.exports = function(app) {

    app.use('/admin', authorizeUser);
    app.use('/update/FlickrImages', authorizeUser)

    app.get('/update/FlickrImages', function(req, res){
      flickrController(app, function(){
        res.redirect('/gallery');
      });

    });
    app.get('/admin', function(req, res){
        res.render('admin');

    });

    app.get('*', function(req, res) {
      res.redirect('/');
    });
}

var authorizeUser = function(req, res, next){
  var cookies = cookie.parse(req.headers.cookie || '');
  var idToken = cookies.idToken;
  if(idToken){
    firebaseAdmin.auth().verifyIdToken(idToken)
      .then(function(decodedToken){
        console.log('decodedToken');
        next()
      })
      .catch(function(err){
        res.redirect('/login');
      })
  } else {
    res.redirect('/');
  }
}
