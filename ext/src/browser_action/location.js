var currentLocation = {};

/*
airport = {
    "airport": "BOS",
    "airport_name": "General Edward Lawrence Logan International Airport",
    "city": "BOS",
    "city_name": "Boston",
    "distance": 22.842064650678058,
    "location": {
      "latitude": 42.364347,
      "longitude": -71.005181
    },
    "aircraft_movements": 143466,
    "timezone": "America/New_York"
  }
*/


function locationOverride () {
  var override = localStorage.getItem('locationOverride');
  return (override == 'true' || override == true ? true : false);
}

function getCurrentAirport () {
  var airport;
  var airportString = localStorage.getItem('airport');
  if (!airportString) {
    return null;
  }
  try {
    return JSON.parse(airportString);
  } catch (ex) {
    return null;
  }
}

/*$(window).on('airportUpdated', function () {
  var airport = JSON.parse(localStorage.getItem('airport'));
  $('.origin').html(airport.city_name+'.');
});*/

(function () {
var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?";

function updateLocation (geolocation) {
  currentLocation.longitude = geolocation.coords.longitude;
  currentLocation.latitude = geolocation.coords.latitude;

	var url = [
    BASE_URL,
    'apikey=', API_KEY,
    '&latitude=', currentLocation.latitude,
    '&longitude=', currentLocation.longitude
  ];
	url = url.join('');
	$.ajax({url: url})
	.done(function(data) {
    if (data && data.length > 0) {
      currentLocation.airport = data[0];
      if (!locationOverride()) {
        localStorage.setItem('airport', JSON.stringify(currentLocation.airport));
      }
    }
    //$(window).trigger('airportUpdated');
	});
}
navigator.geolocation.getCurrentPosition(updateLocation);

})();
/*
$(document).ready(function () {
  var airport = getCurrentAirport();
  if (!airport) {
    return;
  }
  $('.origin').html(airport.city_name+'.');
});
*/