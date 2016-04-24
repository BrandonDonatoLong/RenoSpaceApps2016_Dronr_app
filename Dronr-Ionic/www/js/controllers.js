angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, DronrUpdate) {
  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

  var mapOptions = {
    center: myLatlng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var noFlyZones = [];

  $scope.$watch(function () {return DronrUpdate.value;}, function(newDronrData, oldDronrData)
  {
	  if(newDronrData){    
		if (newDronrData.location){
			console.log(newDronrData);
			updatePosition(newDronrData.location.lat, newDronrData.location.lng);
		}
		if(newDronrData.no_fly_zones){
			for(var key in newDronrData.no_fly_zones){
				var noFlyZone = newDronrData.no_fly_zones [key];
				var drawNoFlyZone = true;
				
				for(var currentNoFlyZoneKey in noFlyZones){
					var currentNoFlyZone = noFlyZones[currentNoFlyZoneKey];
					if(currentNoFlyZone.name == noFlyZone.name){
						drawNoFlyZone = false;
					}
				}
				
				if(drawNoFlyZone == true){
					
				if(noFlyZone.type == "polygon"){
					var Coords = noFlyZone.coords;
					
					var restrictedAirspace = new google.maps.Polygon({
						paths: Coords,
						strokeColor: '#FF0000',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#FF0000',
						fillOpacity: 0.35
						});
					restrictedAirspace.setMap(map);
					
					noFlyZones.push(noFlyZone);
				}
				else{
					
					var restrictedAirspaceAirport = new google.maps.Circle({
						strokeColor: '#FF0000',
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: '#FF0000',
						fillOpacity: 0.35,
						map: map,
						center: noFlyZone.coords[0],
						radius: 8046.72
					});
					
					noFlyZones.push(noFlyZone);
				}
				}
			}
		}
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
