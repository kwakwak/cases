'use strict';

angular.module('casesApp')
  .controller('MainCtrl', ['$scope','$http','casesResource', function ($scope, $http,casesResource) {

    // get token
    $http.get('/api/getToken').success(function(sf) {
        var sfToken = sf.token;
        // Getting cases
        var Cases = casesResource.query({token:sfToken},function() {
            $scope.Cases =Cases;
        });

    });
  }]);
