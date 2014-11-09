var find = require('../../find');

describe('find Santiago', function () {
  it('should find Santiago', function (done) {
    var data = this.fixtures.santiago;
    find(this.db, data.title, data.body)
    .then(function (city) {
      Should.exist(city);
      city.name.should.equal('Santiago');
    })
    .done(function() {done();}, done);
  });
});
