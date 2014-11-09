var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var optimist = require('optimist');
var Promise = require('when');
var mkdirp = require('mkdirp');
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

  var obj = [
    city.name,
    city.adminCode,
    city.country,
    parseInt(city.population),
    parseFloat(city.lat),
    parseFloat(city.lon)
  ];
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

function exportData () {
  db = levelup(dbDir, {valueEncoding: 'json'});
  console.log('exporting');
  var prefixString = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var prefixes = [];
  var promises = [];
  var dir = path.join(__dirname, args.o);
  mkdirp(dir, function (err) {
    for (var i=0; i<prefixString.length; i++) {
      for (var j=0; j<prefixString.length; j++) {
        var prefix = prefixString.charAt(i) + prefixString.charAt(j);
        //console.log('prefix', prefix);
        promises.push(exportPrefix(db, prefix));
      }
    }
    Promise.all(promises)
    .then(function (results) {
      console.log('done!');
    });
  });
}

function exportPrefix (db, prefix) {
  var deferred = Promise.defer();
  var end = prefix.substring(0, prefix.length-1);
  end += String.fromCharCode(prefix.charCodeAt(prefix.length-1)+1);
  var options = {
    start: prefix,
    end: end
  };
  console.log(options);
  var items = {};
  var any = false;
  db.createReadStream(options)
  .on('data', function (item) {
    any = true;
    var key = item.key.split(':')[0];
    if (typeof item.value == 'string') {
      if (items[key]) {
        items[key] += ',';
      } else {
        items[key] = '';
      }
      items[key] += item.value;
    } else {
      items[key] = items[key] || [];
      items[key].push(item.value);
    }
  })
  .on('end', function () {
    if (!any) {
      return deferred.resolve();
    }
    var fileName = path.join(__dirname, args.o, prefix + '.json');
    var content = JSON.stringify(items);
    fs.writeFile(fileName, content, function (err) {
      if (err) {
        return deferred.reject(err);
      }
      deferred.resolve();
    })
  });
  return deferred.promise;
}

if (args.clear) {
  clear();
} else if (args.export && args.o) {
  exportData();
} else {
  setup();
}
