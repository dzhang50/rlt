
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("getAirport", function(request, response) {
	var query = request.params.query;
	var apiKey = "AIzaSyBCYAXektzIaR1yeYS3ul9dkf5iukc2QBU";
	
	// POI -> Google Place
	Parse.Cloud.httpRequest({
		url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+query+"&key="+apiKey,
		success: function(httpResponse) {
			
			response.success(httpResponse.text);
		},
		error: function(httpResponse) {
			console.error('Request failed with response code ' + httpResponse.status);
			response.error('Request failed: ' + httpResponse.status);
		}
	});
	
});