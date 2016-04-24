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

.controller('WeatherCtrl', function($scope, DronrUpdate) {
  var weather = {
    "time": "24 Apr 11:150 am PDT",
    "temp": 29.2,
    "wind_speed": 1.5,
    "wind_direction": 1,
    "wind_gust": 4.5,
    "precip": 0.5,
    "visibility": 10.1,
    "hazards":
    [
      {
        "desc": "This is a hazard.",
        "url": "http://www.weather.gov/hazard_url"
      }
    ]
  };

  $scope.$watch(function () {return DronrUpdate.value;}, function(newDronrData, oldDronrData) {
    if (newDronrData && newDronrData.weather) {
      weather = newDronrData.weather;
    }
  });

  $scope.weather = weather;
})

.filter('degreesToDirection', function() {
  return function (degrees) {
    if (degrees >= 348.75 || (degrees >= 0 && degrees < 11.25)) {
      return 'N';
    }
    else if (degrees >= 11.25 && degrees < 33.75) {
      return 'NNE'
    }
    else if (degrees >= 33.75 && degrees < 56.25) {
      return 'NE'
    }
    else if (degrees >= 56.25 && degrees < 78.75) {
      return 'ENE'
    }
    else if (degrees >= 78.75 && degrees < 101.25) {
      return 'E'
    }
    else if (degrees >= 101.25 && degrees < 123.75) {
      return 'ESE'
    }
    else if (degrees >= 123.75 && degrees < 146.25) {
      return 'SE'
    }
    else if (degrees >= 146.25 && degrees < 168.75) {
      return 'SSE'
    }
    else if (degrees >= 168.75 && degrees < 191.25) {
      return 'S'
    }
    else if (degrees >= 191.25 && degrees < 213.75) {
      return 'SSW'
    }
    else if (degrees >= 213.75 && degrees < 236.25) {
      return 'SW'
    }
    else if (degrees >= 236.25 && degrees < 258.75) {
      return 'WSW'
    }
    else if (degrees >= 258.75 && degrees < 281.25) {
      return 'W'
    }
    else if (degrees >= 281.25 && degrees < 303.75) {
      return 'WNW'
    }
    else if (degrees >= 303.75 && degrees < 326.25) {
      return 'NW'
    }
    else if (degrees >= 326.25 && degrees < 348.75) {
      return 'NNW'
    }
    else return 'unknown';
  }
})

.controller('FlightPathCtrl', function($scope) {
})

.controller('SettingsCtrl', function($scope, DronrSettings) {
  $scope.settings = DronrSettings;
});
