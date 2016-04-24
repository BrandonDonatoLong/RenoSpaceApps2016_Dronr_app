angular.module('starter.services', [])

.factory('DronrUpdate', function($http, $timeout){
  var data = {
    value: {},
    status: 0,
    statusText: ''
  };

  var pollData = function() {
      $http.get('http://localhost:8080/drone').then(function (r) {
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

