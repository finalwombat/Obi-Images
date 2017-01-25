var express = require('express');
var app = express();

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');
var flickrController = require('./controllers/flickrController');

var port = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

htmlController(app);
apiController(app);
//flickrController(app);

app.listen(port);
