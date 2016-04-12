module.exports = function(app) {
    app.get('/galleries', function(req, res) {
       //get the galleries from flickr
       //create thumbnails
       //return thumbnails 
    });
    
    app.get('/viewer/:id', function(req, res) {
        //get the images for the gallery id
        //return the images 
    });
}