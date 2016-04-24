angular.module('starter.services', [])

.factory('DronrSettings', function($http, $timeout){
    var settings = {
      droneId: '123',
      server: 'http://localhost:8080/'
    };

    return settings;
  })

.factory('DronrUpdate', function($http, $timeout, DronrSettings){
  var data = {
    value: {},
    status: 0,
    statusText: ''
  };

  var pollData = function() {
      $http.get(DronrSettings.server + 'drone/' + DronrSettings.droneId).then(function (r) {
        console.log(r);
        data.value = r.data;
        data.status = r.status;
        data.statusText = r.statusText;
        $timeout(pollData, 30000);
      }, function(e){
        console.log(e);
        $timeout(pollData, 30000);
      });
  };

  pollData();

  return data;
});

