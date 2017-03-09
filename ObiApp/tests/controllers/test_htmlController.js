var test = require('tape');
var supertest = require('supertest');

var app = require('../../app.js');

test('GET /', function(t) {
  supertest(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();
    });

});

test('GET /gallery', function(t) {
  supertest(app)
    .get('/gallery')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();
    });

});

test('GET /index/galleryName', function(t){
  supertest(app)
    .get('/index/featured')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();
    });
});

test('GET /index/galleryName Should not exist', function(t){
  supertest(app)
    .get('/index/ShouldNotExist')
    .expect(302)
    .expect('location', /gallery/)
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();

    });
});

test('GET /contact', function(t){
  supertest(app)
    .get('/contact')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();
    });
});

test('GET /login', function(t){
  supertest(app)
    .get('/login')
    .expect(200)
    .expect('Content-Type', /html/)
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();
      process.exit(0);
    });
});
