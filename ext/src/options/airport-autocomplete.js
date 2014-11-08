var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/airports/autocomplete?";
var API_URL = [BASE_URL, 'apikey=', API_KEY].join('');

$("#input_text").autocomplete({source: API_URL });
