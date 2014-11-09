
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("autocomplete", function(request, response) {
	var query = encodeURIComponent(request.params.query);
	var apiKey = "AIzaSyBCYAXektzIaR1yeYS3ul9dkf5iukc2QBU";
	
	// POI -> Google Place
	Parse.Cloud.httpRequest({
		url: "https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input="+query+"&key="+apiKey,
		success: function(httpResponse) {
			response.success(httpResponse.text);
		},
		error: function(httpResponse) {
			console.error('Request 1 failed with response code ' + httpResponse.status);
			response.error('Request 1 failed: ' + httpResponse.status);
		}
	});
	
});

Parse.Cloud.define("getAirport", function(request, response) {
	var query = encodeURIComponent(request.params.query);
	var googKey = "AIzaSyBCYAXektzIaR1yeYS3ul9dkf5iukc2QBU";
	var amadKey = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
	
	// POI -> Google place_id
	Parse.Cloud.httpRequest({
		url: "https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input="+query+"&key="+googKey,
		success: function(httpResponse) {
			var json = JSON.parse(httpResponse.text);
			console.log("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+query+"&key="+googKey);
			//console.log(json);
			console.log(json.predictions[0].description+" has a place_id of "+json.predictions[0].place_id);
			
			var placeid = json.predictions[0].place_id;
			
			// Google Place -> latlong
			Parse.Cloud.httpRequest({
				url: "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeid+"&key="+googKey,
				success: function(httpResponse) {
					
					var detJson = JSON.parse(httpResponse.text);
					
					var lat = detJson.result.geometry.location.lat;
					var lng = detJson.result.geometry.location.lng;
					
					Parse.Cloud.httpRequest({
						url: "http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?latitude="+lat+"&longitude="+lng+"&apikey="+amadKey,
						success: function(httpResponse) {
							response.success(httpResponse.text);
						},
						error: function(httpResponse) {
							response.error("Request 4 failed: " + httpResponse.status);
						}
					});
				},
				error: function(httpResponse) {
					response.error("Request 3 failed: " + httpResponse.status);
				}
			});
		},
		error: function(httpResponse) {
			console.error('Request 2 failed with response code ' + httpResponse.status);
			response.error('Request 2 failed: ' + httpResponse.status);
		}
	});
	
});