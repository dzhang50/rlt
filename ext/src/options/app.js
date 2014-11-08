	var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
	var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?";

	$('#inputForm').submit(function(ev) {
    	ev.preventDefault();
    	var origin = $("#origin").val();
    	var destination = $("#destination").val();
    	var url = [BASE_URL,"origin=",origin,"&destination=",destination,'&departure_date=2014-11-15&return_date=2014-11-21&number_of_results=3&apikey=',API_KEY];
    	url = url.join('');
    	console.log(url);
    	$.ajax({url: url})
		.done(function( data ) {
			console.log(data)
		});
	});