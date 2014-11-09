chrome.tabs.executeScript(null, {
  code: 'document.body.innerHTML;'
}, function (arrayOfResults) {
  if (!arrayOfResults || !arrayOfResults[0]) {
    return;
  }
  try {
    var r = new Readability(arrayOfResults[0], {});
  } catch (ex) {
    return console.log(ex);
  }
  var div = document.createElement('div');
  div.innerHTML = r.getContent(true);
  var text = div.innerText;
  text = text.replace(/^\s+|\s+$/g, '');
  text = text.replace(/\s{2,}/g, ' ');

  var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
  var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?";

  var db = text2city.db('./data');

  var title = '';
  var body = text;
  text2city.find(db, title, body)
  .then(function (city) {
    console.log(city);
    var latitude = city.lat;
    var longitude = city.lng;
  	var url = [BASE_URL,'apikey=',API_KEY,'&latitude=',latitude,'&longitude=',longitude];
  	url = url.join('');
  	console.log(url);
    console.log("Are you talking about "+city.name+"? \n("+city.lng+", "+city.lat+")");
  	$.ajax({url: url})
  	.done(function( data ) {
			if (data && data[0] && data[0].airport) {
  			console.log('data', data);
  			console.log('Airport: '+data[0].airport_name + ' ('+data[0].airport+')');
			} else {
				console.log('Airport not found');
			}
  	})
    .error(console.log.bind(console));
  });
});
