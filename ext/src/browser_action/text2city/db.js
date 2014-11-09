var path = require('path');
var Promise = require('when');
var $ = require('../../../js/jquery/dist/jquery.js');

module.exports = function (dbPath) {
  return {
    get: function (key) {
      var deferred = Promise.defer();
      if (!key) {
        deferred.reject(new Error('Not found key: '+key));
        return deferred.promise;
      }
      var prefix = key.substring(0, 2);
      var fileName = path.join(dbPath, prefix+'.json');
      if (!/[a-z0-9]{2}/.test(prefix)) {
        deferred.reject(new Error('Not found key: '+key));
        return deferred.promise;
      }
      $.getJSON(fileName)
      .done(function (data) {
        var item = data[key];
        if (!item) {
          deferred.reject(new Error('Not found within: '+key));
          return deferred.promise;
        }
        if (typeof item == 'string') {
          item = item.split(',');
        }
        deferred.resolve({key: key, value: item});
      })
      .error(deferred.reject);
      return deferred.promise;
    }
  };
}
