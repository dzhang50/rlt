var fs = require('fs');
var path = require('path');
var levelup = require('levelup');
var db = levelup(path.resolve(__dirname,'./db'), {valueEncoding: 'json'});;

var levelPromise = require('../levelPromise');
global.Should = require('should');

before(function (done) {
  //this.db = levelPromise(db);
  this.db = levelPromise(path.resolve(__dirname, '../export/'));
  var fixturesPath = path.resolve(__dirname, './fixtures');
  var fixtures;
  this.fixtures = fixtures = {};

  fs.readdir(fixturesPath, function (err, files) {
    files.forEach(function (file) {
      fixtures[file.replace('.json', '')] = require(path.resolve(fixturesPath, './'+file));
    });
    done();
  });
});
