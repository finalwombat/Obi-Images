var test = require('tape');
var supertest = require('supertest');

var app = require('../../app.js');

test('GET /admin Should redirect to login with invalis id ', function(t) {
  supertest(app)
    .get('/admin/InvalidID')
    .expect(302)
    .expect('location', /login/)
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();
    });

});

test('GET /admin Should redirect to home with no id ', function(t) {
  supertest(app)
    .get('/admin/')
    .expect(302)
    .expect('location', '/')
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();
    });

});

test('GET /randomURL Should redirect to home with randomURL', function(t) {
  supertest(app)
    .get('/RandomURL')
    .expect(302)
    .expect('location', '/')
    .end(function(err, res){
      t.error(err, 'No Error');
      t.end();
      process.exit(1);
    });

});
