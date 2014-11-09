var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?";

var db = text2city.db('../browser_action/data');

$('#inputForm').submit(function(ev) {
	ev.preventDefault();
  var title = $('#page-title').val();
  var body = $('#page-body').val();
	function finish () {
		$(window).trigger('destinationUpdated');
	}
  text2city.find(db, title, body)
  .then(function (city) {
    console.log(city);
		if (city and city.name) {
			$('#destination').val(city.name);
		}
  })
	.done(finish, finish);
});
