var _ = require('lodash');
var Promise = require('when');
var natural = require('natural');
var NGrams = natural.NGrams;
var diacritics = require('diacritics');
tokenizer = new natural.TreebankWordTokenizer();

module.exports = function (db, title, body) {
  title = diacritics.remove(title);
  body = diacritics.remove(body);
  var titleWords = tokenizer.tokenize(title);
  var bigrams = _.map(NGrams.bigrams(titleWords), function (bigram) {
    return bigram.join(' ');
  });
  titleWords = titleWords.concat(bigrams);
  var bodyWords = tokenizer.tokenize(body);
  var cityCountry = [];
  var capitalized = [];
  var match;
  var cityPattern = /(\b[A-Z][A-Za-z\-]), [A-Z]/g
  while (match = cityPattern.exec(body)) {
    cityCountry.push(match[1]);
  }
  var ngramCityPattern = /(\b[A-Z][A-Za-z\-]+) ([A-Z][A-Za-z\-]+)\b/g
  while (match = ngramCityPattern.exec(body)) {
    capitalized.push(String(match[1] + ' ' + match[2]));
  }
  _.each(bodyWords, function (word) {
    if (/^[A-Z]/.test(word)) {
      capitalized.push(word);
    }
  });
  var queries = _.unique(titleWords.concat(cityCountry).concat(capitalized));
  queries = _.map(queries, function (query) { return query.toLowerCase(); });
  return Promise.all(_.map(queries, function (query) {
    //return db.getRange(query+':', query+';').catch(function (err) { return true; });
    //console.log('query', query);
    return db.get2(query).catch(function (err) { return true; });
  }))
  .then(function (results) {
    return _.flatten(_.pluck(results, 'value'));
  })
  .then(function (results) {
    return _.without(results, true);
  })
  .then(function (results) {
    return _.without(results, undefined);
  })
  .then(function (results) {
    return Promise.all(_.map(results, function (result) {
      //console.log('get', result);
      return db.get2(result);
    }));
  })
  .then(function (cities) {
    return _.map(cities, function (city) {
      return city.value[0];
    });
  })
  .then(function (cities) {
    cities = _.map(cities, function (city) {
      return {
        id: city.key,
        name: city[0],
        region: city[1],
        country: city[2],
        population: city[3],
        lat: city[4],
        lng: city[5],
      };
    });
    citiesGrouped = _.groupBy(cities, function (city) {
      return city.name;
    });
    return _.max(cities, function (city) {
      var score = 0;
      var multiplier = cities.length * city.population / 1000000;
      if (title.indexOf(city.name) != -1) {
        score += 100 * city.name.length * multiplier;
      } else {
        score -= 10;
      }
      if (title.indexOf(city.name + ', ') != -1) {
        score += 200 * multiplier;
      } else {
        score -= 1;
      }
      if (body.indexOf(city.name) != -1) {
        score += 100 * body.split(city.name + ', ').length * multiplier;
      } else {
        score -= 1000;
      }
      if (body.indexOf(city.name + ', ') != -1) {
        score += 100 * body.split(city.name + ', ').length * multiplier;
      } else {
        score -= 10;
      }
      return score;
    });
  });
}
