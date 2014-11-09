'use strict';

angular.module('ngApp', ['ngRoute']).
config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
    $routeProvider.when('/search', {templateUrl: 'search.html', controller: 'searchController'});
    $routeProvider.when('/result', {templateUrl: 'results.html', controller: 'resultController'});
    $routeProvider.otherwise({redirectTo: '/search'});
}])

.controller('searchController',['$scope','$http','$location','passQueryInfo','$timeout', function($scope,$http,$location,passQueryInfo,$timeout){

  Parse.initialize("M7lfx2FsgvSMRr5pPVgpXM7lwxscDZ1oGQMfZe67", "04YFegY2SVyxpCXQz6HBFf0XQzwACId8johQKWxe");
  var timer=false;
  $scope.query = null;
  $scope.starting = getCurrentAirport();
  $scope.destination = null;
  $scope.fullname = null;

  $scope.$watch('query', function(){
    if(timer){
        $timeout.cancel(timer)
    } 
    if($scope.query){
    timer= $timeout(function(){
      Parse.Cloud.run('autocomplete', {query: $scope.query}, {
      success: function(result) {
        //console.log(result);
        var json = JSON.parse(result).predictions;
        //console.log(result);
        $scope.fullname = json[0];
        //$scope.destination = ;
        console.log(json[0].terms[0].value);
        //passQueryInfo.setDestination($scope.destination);
      }
      });
     },1000)
  }
  });

  $(window).on('airportUpdated', function () {
    $scope.$apply(function(){
      $scope.starting = JSON.parse(localStorage.getItem('airport'));
    })
  });

  $scope.submit = function(){
    console.log($scope.query);
    if($scope.fullname){
      Parse.Cloud.run('getAirport', {query: $scope.fullname.description},{
      success: function(result) {
        console.log($scope.destination);
        var json = JSON.parse(result);
        console.log(json);
        $scope.destination = json[0].airport;
        passQueryInfo.setQuery($scope.fullname);
        passQueryInfo.setDestination($scope.destination);
        $location.path('result');
      }
      });
    }
    else{
      Parse.Cloud.run('autocomplete', {query: $scope.query}, {
      success: function(result) {
        //console.log(result);
        var json = JSON.parse(result).predictions;
        //console.log(result);
        $scope.fullname = json[0];
        //$scope.destination = ;
        //passQueryInfo.setDestination($scope.destination);
      }
      });
      Parse.Cloud.run('getAirport', {query: $scope.query},{
      success: function(result) {
        var json = JSON.parse(result);
        $scope.destination = json[0].airport;
        console.log($scope.destination);
        passQueryInfo.setQuery($scope.fullname);
        passQueryInfo.setDestination($scope.destination);
        $location.path('result');
      }
      });
    }
  }
}])


.controller('resultController',['$scope','$http','passQueryInfo', function($scope,$http,passQueryInfo){
  var API_KEY = "DahDhyNAdiEw4JgwwiiG7FZG9qke7Sm9";
  var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?";
  $scope.price = null;
  $scope.depDate = null;
  $scope.retDate = null;


  console.log("result");
  $scope.starting = getCurrentAirport();
  $scope.fullname = passQueryInfo.getQuery().terms[0].value;
  $scope.destination = passQueryInfo.getDestination();

  var url = [BASE_URL,"origin=",$scope.starting.airport,'&destination=',$scope.destination,'&duration=8&apikey=',API_KEY];
  url = url.join('');
  $http({method:"GET",url: url}).success(function(data){
    console.log(data);
  }).
  error(function(data){
    var BASE_URL = "http://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?";
    var departureDate = moment().add(28, 'day').format("YYYY-MM-DD");
    var returnDate = moment().add(35, 'day').format("YYYY-MM-DD");
    var url = [BASE_URL,"origin=",$scope.starting.airport,'&destination=',$scope.destination,'&departure_date=',departureDate,'&return_date=',returnDate,'&number_of_results=1&apikey=',API_KEY];
    url = url.join('');

    $http({method:"GET",url: url}).success(function(data){
      console.log("SECOND")
      console.log(data)
      $scope.result = data.results[0];
      $scope.price = $scope.result.fare.total_price;
      $scope.depDate = departureDate;
      $scope.reDate = returnDate;
      $scope.result = data.results[0];
    })
  });

}])



.service('passQueryInfo',[function() {
  var origin = null;
  var destination = null;
  var query = null;
    return {
      setQuery: function(value){
        query = value;
      },
      getQuery: function(){
        return query;
      },
      getOrigin:  function(){
        return origin;
      },
      setOrigin:  function(value){
        origin = value;
      },
      getDestination:  function(){
        return destination;
      },
      setDestination:  function(value){
        destination = value;
      }
    }
}]);



//angular.module('ngApp.services', []);

/*
function search (query, delay) {
  delay = delay || 2000
  $('#results-list').html('');
  setTimeout(function () {
    items = [
      {
        departureDate: new Date(Date.now() + 14 * 86400 * 1000),
        returnDate: new Date(Date.now() + 20 * 86400 * 1000),
        price: '$563'
      },
      {
        departureDate: new Date(Date.now() + 15 * 86400 * 1000),
        returnDate: new Date(Date.now() + 19 * 86400 * 1000),
        price: '$564'
      },
      {
        departureDate: new Date(Date.now() + 16 * 86400 * 1000),
        returnDate: new Date(Date.now() + 32 * 86400 * 1000),
        price: '$565'
      }
    ];
    for (var i=0; i<items.length; i++) {
      var item = items[i];
      var titleText = '';
      var depDate = item.departureDate;
      var retDate = item.returnDate;
      var showReturnMonth = depDate.getMonth() != retDate.getMonth();
      var titleText = moment(depDate).format('MMM '+(showReturnMonth ? 'Do' : 'D'));
      titleText += ' - ';
      titleText += moment(retDate).format((showReturnMonth ? 'MMM ' : '')+'Do');
      //if (.format('MMM Do')
      var title = $('<h2>');
      title
      .addClass('result-title')
      .html(titleText);
      var buyButton = $('<button>');
      buyButton
      .addClass('buy-button')
      .html(item.price);
      var li = $('<li>');
      li
      .addClass('results')
      .append(title)
      .append(buyButton);
      $('#results-list').append(li);
    }
  }, delay);
}

$(document).ready(function () {


  $('.origin').html('BOS');
  $('.destination').html('SFO');
  $('#search-query').val('SFO');
  $('.popup-form').submit(function (e) {
    e.preventDefault();
    $('#form-holder').fadeOut(500);
    $('#results-holder').delay(1000).fadeIn(500);
    var destination = $('#search-query').val();
    $('.destination').html(destination);
    search(destination);
    return false;
  });
//<<<<<<< HEAD


return;

  $('#form-holder').hide();
  $('#results-holder').show();
  search('SFO', 1);
//=======
//>>>>>>> c96fa3efdee322568da63d5f72e90c3f6fef68e4
});
*/
