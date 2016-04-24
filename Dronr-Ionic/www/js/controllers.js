angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, DronrUpdate) {
  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

  var mapOptions = {
    center: myLatlng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  $scope.$watch(function () {return DronrUpdate.value;}, function(newDronrData, oldDronrData){
    if (newDronrData && newDronrData.location){
      console.log(newDronrData);
      updatePosition(newDronrData.location.lat, newDronrData.location.lng);
    }
  });

  var updatePosition = function (lat, lng){
    map.setCenter(new google.maps.LatLng(lat, lng));
  };

  $scope.map = map;
  updatePosition ({latitude: 37.3000, longitude: -120.4833});
})

.controller('VideoCtrl', function($scope) {

})

.controller('VideoCtrl', function($scope) {

})

.controller('WeatherCtrl', function($scope) {
})

.controller('FlightPathCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope, DronrSettings) {
  $scope.settings = DronrSettings;
});
