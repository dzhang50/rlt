//set big variables
var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?";

//on form submission execute function
$('#inputForm').submit(function(ev) {
	//prevent form submission
	ev.preventDefault();

	//get variables from form
	var origin = $("#origin").val();
	var destination = $("#destination").val();

	//create string array
	var url = [BASE_URL,"origin=",origin,"&destination=",destination,'&apikey=',API_KEY];
	//concat array
	url = url.join('');

	//ajax request on url
	$.ajax({url: url})
	.done(function( data ) {
		console.log(data.results);

		//begin injecting response into #flightList container
		for(var i = 0;i < data.results.length; i++){
			flight = data.results[i]
			var fair = flight.fair.
			html = 'yo';
			$('#flightList').append(html);
		}
		

	});
});
