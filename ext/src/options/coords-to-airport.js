	var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
	var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?";

	$('#inputForm').submit(function(ev) {
    	ev.preventDefault();
    	var latitude = $("#latitude").val();
    	var longitude = $("#longitude").val();
    	var url = [BASE_URL,'apikey=',API_KEY,'&latitude=',latitude,'&longitude=',longitude];
    	url = url.join('');
    	console.log(url);
    	$.ajax({url: url})
		.done(function( data ) {
			console.log(data);
		});
	});
