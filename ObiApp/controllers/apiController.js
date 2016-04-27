var fs = require('fs');
var images = fs.readFileSync(__dirname + '/images.json', 'utf-8');

module.exports = function(app) {
    app.get('/galleries', function(req, res) {
        var images = fs.readFileSync(__dirname + '/images.json', 'utf-8');
        //console.log(images);
        res.json(images);
    });
    
    app.get('/viewer/:id', function(req, res) {
        //get the images for the gallery id
        //return the images 
    });
}