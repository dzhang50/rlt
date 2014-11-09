var find = require('../../find');

describe('find London', function () {
  it('should find London', function (done) {
    var paddington = this.fixtures.paddington;
    find(this.db, paddington.title, paddington.body)
    .then(function (city) {
      Should.exist(city);
      city.name.should.equal('London');
    })
    .done(function() {done();}, done);
  });
});
