$(document).ready(function() {
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
		
		if(origin.length > 3 || destination.length > 3)
		{
			if(origin.length > 3){
				/* convert location to coordinates */
			}
			var latitude = $("#latitude").val();
	    	var longitude = $("#longitude").val();
	    	var url = [BASE_URL,'apikey=',API_KEY,'&latitude=',latitude,'&longitude=',longitude];
	    	url = url.join('');
	    	console.log(url);
	    	$.ajax({url: url})
			.done(function( data ) {
				console.log(data);
			});
		};


		function inspiration(origin,destination){
				//create string array
			var url = [BASE_URL,"origin=",origin,'&destination=',destination,'&duration=8&apikey=',API_KEY];
			//concat array
			url = url.join('');
			//ajax request on url
			$.ajax({url: url})
			.done(function( data ) {
				console.log(data.results);
				//begin injecting response into #flightList container
				var html = []
				for(var i = 0;i < data.results.length; i++){
					//begin creating single item
					flight = data.results[i]
					var fair = flight.price;
					var destination = flight.destination;
					var departure_date = flight.departure_date;
					var return_date = flight.return_date;
					var airline = flight.airline;
					//append html variable
					html.push(['Airline: ',airline,'<br/>'].join(''));
					html.push(['Destination: ',destination,'<br/>'].join(''));
					html.push(['departure: ',departure_date,'   '].join(''));
					html.push(['return: ',return_date,'<br/>'].join(''));
					html.push(['Price: ',fair,'<br/><br/>'].join(''));
					//end creating single item
				}
				$('#flightList').append(html.join(''));
			});
		}

		inspiration(origin,destination);
	});
});
