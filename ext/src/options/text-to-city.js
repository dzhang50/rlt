var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?";

var db = text2city.db('../browser_action/data');

$('#inputForm').submit(function(ev) {
	ev.preventDefault();
  var title = $('#page-title').val();
  var body = $('#page-body').val();
  text2city.find(db, title, body)
  .then(function (city) {
    console.log(city);
    var latitude = city.lat;
    var longitude = city.lng;
  	var url = [BASE_URL,'apikey=',API_KEY,'&latitude=',latitude,'&longitude=',longitude];
  	url = url.join('');
  	console.log(url);
  	$.ajax({url: url})
  	.done(function( data ) {
			if (data && data[0] && data[0].airport) {
  			console.log('data', data);
  			alert('Airport: '+data[0].airport_name + ' ('+data[0].airport+')');
			} else {
				alert('Airport not found');
			}
  	})
    .error(console.log.bind(console));
    alert("Are you talking about "+city.name+"? \n("+city.lng+", "+city.lat+")");
  });
});
