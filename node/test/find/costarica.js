var find = require('../../find');

describe('find a city in Costa Rica', function () {
  it('should find San José', function (done) {
    var data = this.fixtures.costarica;
    find(this.db, data.title, data.body)
    .then(function (city) {
      Should.exist(city);
      city.name.should.equal('San Jose');
    })
    .done(function() {done();}, done);
  });
});
