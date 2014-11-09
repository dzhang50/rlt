var find = require('../../find');

describe('find Berlin', function () {
  it('should find Berlin', function (done) {
    var data = this.fixtures.berlin;
    find(this.db, data.title, data.body)
    .then(function (city) {
      Should.exist(city);
      city.name.should.equal('Berlin');
    })
    .done(function() {done();}, done);
  });
});
