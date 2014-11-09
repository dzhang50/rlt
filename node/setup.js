var fs = require('fs');
var _ = require('lodash');
var optimist = require('optimist');
var rimraf = require('rimraf');
var levelup = require('levelup');
var cities1000 = require('cities1000');
var csv = require('csv-stream');
var isoCountries = require('iso-countries');
var db;

var args = optimist
.default('clear', false)
.default('db', './db')
.argv;
var dbDir = args.db;

function clear () {
  rimraf(dbDir, function (err) {
    if (err) { throw err; }
    console.log('deleted', dbDir);
  });
}

var cities = [];
function saveCity (city) {
  var id = city.id;
  var names = [city.name, city.asciiname].concat(city.alternativeNames.split(','));
  names = _.filter(_.uniq(names), function (name) {
    if (name == '') { return false; }
    return true;
  });
  names = _.map(names, function (name) {
    return name.toLowerCase();
  });
  var obj = {
    id: city.id,
    name: city.name,
    region: city.adminCode,
    country: city.country,
    pop: parseInt(city.population),
    lat: parseFloat(city.lat),
    lng: parseFloat(city.lon)
  };
  db.put(id, obj, function (err) {
    if (err) console.error(err);
  });
  _.each(names, function (name) {
    db.put(name+':'+city.adminCode+':'+city.country, id, function (err) {
      if (err) console.error(err);
    });
  });
  cities.push(city);
  if (cities.length > 10) {
    return;
  }
  //console.log('save city', names);
}

function setup () {
  db = levelup(dbDir, {valueEncoding: 'json'});
  console.log('setting up');

  var csvOptions = {
    delimiter: '\t',
    columns: cities1000.fields
  };

  fs.createReadStream(cities1000.file, 'utf8')
  .pipe(csv.createStream(csvOptions))
  .on('data', saveCity)
  .on('error', function (err) {
    console.error(err);
  })
  .on('end', function () {
    console.log("done! inserted "+cities.length+" items");
  });
}

if (args.clear) {
  clear();
} else {
  setup();
}
