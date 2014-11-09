var find = require('../../find');

describe('find Florence', function () {
  it('should find Florence', function (done) {
    var data = this.fixtures.florence;
    find(this.db, data.title, data.body)
    .then(function (city) {
      Should.exist(city);
      city.name.should.equal('Florence');
    })
    .done(function() {done();}, done);
  });
});
