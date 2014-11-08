chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
	
	
});


// Application ID, Javascript Key
Parse.initialize("M7lfx2FsgvSMRr5pPVgpXM7lwxscDZ1oGQMfZe67", "04YFegY2SVyxpCXQz6HBFf0XQzwACId8johQKWxe");

console.log("Testing Road Less Traveled");

Parse.Cloud.run('getAirport', {query: "Nice"}, {
	success: function(result) {
		console.log("Success");
		//console.log(result);
		var json = JSON.parse(result);
		console.log(json[0].airport);
		//console.log(json.result.geometry.location.lat+", "+json.result.geometry.location.lng);
		//console.log(json.predictions[0].description+" has a place_id of "+json.predictions[0].place_id);
	}
});
