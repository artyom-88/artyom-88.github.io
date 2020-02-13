const request = require('request');
const ROOT = 'https://artyom-ganev-test.herokuapp.com';
const MAIN = 'https://artyom-ganev-test.herokuapp.com/#/main';
const ABOUT = 'https://artyom-ganev-test.herokuapp.com/#/about';
const BLOG = 'https://artyom-ganev-test.herokuapp.com/#/blog';
const CAREER = 'https://artyom-ganev-test.herokuapp.com/#/career';
const CONTACTS = 'https://artyom-ganev-test.herokuapp.com/#/contacts';

describe('Should return 200', function () {
  test(ROOT, function (done) {
    request.get(ROOT, function (err, res, body) {
      expect(res.statusCode).toEqual(200);
    });
    done();
  });
  
  test(MAIN, function (done) {
    request.get(MAIN, function (err, res, body) {
      expect(res.statusCode).toEqual(200);
    });
    done();
  });
  
  test(ABOUT, function (done) {
    request.get(ABOUT, function (err, res, body) {
      expect(res.statusCode).toEqual(200);
    });
    done();
  });
  
  test(BLOG, function (done) {
    request.get(BLOG, function (err, res, body) {
      expect(res.statusCode).toEqual(200);
    });
    done();
  });
  
  test(CAREER, function (done) {
    request.get(CAREER, function (err, res, body) {
      expect(res.statusCode).toEqual(200);
    });
    done();
  });
  
  test(CONTACTS, function (done) {
    request.get(CONTACTS, function (err, res, body) {
      expect(res.statusCode).toEqual(200);
    });
    done();
  });
});