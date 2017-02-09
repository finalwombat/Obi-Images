module.exports = {
    
     buildPhotoUrl: function(photo){
        return 'https://farm' + photo.farm + '.staticflickr.com/' 
        + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    }
};