var find = require('../../find');

describe('find something in national parks text', function () {
  it('should find .. Los Angeles?', function (done) {
    var data = this.fixtures.nationalparks;
    find(this.db, data.title, data.body)
    .then(function (city) {
      Should.exist(city);
      city.name.should.equal('Los Angeles');
    })
    .done(function() {done();}, done);
  });
});
