var find = require('../../find');

describe('find Tulum', function () {
  it('should find tulum', function (done) {
    var obj = this.fixtures.tulum;
    find(this.db, this.fixtures.tulum.title, this.fixtures.tulum.body)
    .then(function (city) {
      Should.exist(city);
      city.name.should.equal('Tulum');
    })
    .done(function() {done();}, done);
  });
});
