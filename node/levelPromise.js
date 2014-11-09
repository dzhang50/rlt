fs = require('fs');
path = require('path');
Promise = require('when');

module.exports = function (db) {
  return {
    get: function (key) {
      var deferred = Promise.defer();
      db.get(key, function (err, value) {
        if (err) {
          return deferred.reject(err);
        }
        deferred.resolve(value);
      });
      return deferred.promise;
    },
    get2: function (key) {
      var deferred = Promise.defer();
      if (!key) {
        deferred.reject(new Error('Not found key: '+key));
        return deferred.promise;
      }
      var prefix = key.substring(0, 2);
      var fileName = path.join(db, prefix+'.json');
      if (!fs.existsSync(fileName)) {
        deferred.reject(new Error('Not found file: '+fileName));
        return deferred.promise;
      }
      var blob = require(fileName);
      var item = blob[key];
      if (!item) {
        deferred.reject(new Error('Not found within: '+key));
        return deferred.promise;
      }
      if (typeof item == 'string') {
        item = item.split(',');
      }
      deferred.resolve({key: key, value: item});
      return deferred.promise;
    },
    getRange: function (start, end) {
      var deferred = Promise.defer();
      var items = [];
      var options = {
        start: start,
        end: end
      };
      db.createReadStream(options)
      .on('data', function (item) {
        items.push(item.value);
      })
      .on('end', function () {
        deferred.resolve(items);
      });
      return deferred.promise;
    }
  };
}
