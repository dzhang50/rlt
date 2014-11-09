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
