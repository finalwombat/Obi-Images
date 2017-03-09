var test = require('tape');

var utill = require('../../controllers/utility');
var photo = {
  farm: 'photoFarm',
  server: 'photoServer',
  id: 'photoId',
  secret: 'photoSecret'
}
var expected = 'https://farmphotoFarm.staticflickr.com/photoServer/photoId_photoSecret.jpg';

test('buildPhotoUrl test', function(t){
  var result = utill.buildPhotoUrl(photo);
  t.equal(result, expected);

  t.end();
})
