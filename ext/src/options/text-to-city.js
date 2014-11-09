var db = text2city.db('../browser_action/data');

$('#inputForm').submit(function(ev) {
	ev.preventDefault();
  var title = $('#page-title').val();
  var body = $('#page-body').val();
  text2city.find(db, title, body)
  .then(function (city) {
    console.log(city);
    alert("Are you talking about "+city.name+"? \n("+city.lng+", "+city.lat+")");
  });
});
