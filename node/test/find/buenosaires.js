var find = require('../../find');

describe('find Buenos Aires', function () {
  it('should find Buenos Aires', function (done) {
    var data = this.fixtures.buenosaires;
    find(this.db, data.title, data.body)
    .then(function (city) {
      Should.exist(city);
      city.name.should.equal('Buenos Aires');
    })
    .done(function() {done();}, done);
  });
});
