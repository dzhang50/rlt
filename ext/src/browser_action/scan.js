chrome.tabs.executeScript(null, {
  code: 'JSON.stringify([document.title, document.body.innerHTML]);'
}, function (arrayOfResults) {
  if (!arrayOfResults || !arrayOfResults[0]) {
    return;
  }
  var title;
  try {
    var json = JSON.parse(arrayOfResults[0]);
    title = json[0];
    var rawHTML = json[1];
    rawHTML = rawHTML.replace(/<script.*\/script>/gi, '');
    var r = new Readability(rawHTML, {});
  } catch (ex) {
    return console.log(ex);
  }
  var div = document.createElement('div');
  window.r = r;
  window.docTitle = title;
  div.innerHTML = r.getContent(true);
  var text = div.innerText;
  text = text.replace(/^\s+|\s+$/g, '');
  text = text.replace(/\s{2,}/g, ' ');

  var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
  var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?";

  var db = text2city.db('./data');

  var body = text;
	function finish () {
		$(window).trigger('destinationUpdated');
	}
  text2city.find(db, title, body)
  .then(function (city) {
    console.log(city);
		if (city && city.name) {
			$('#destination').val(city.name);
		}
  })
	.done(finish, finish);
});
