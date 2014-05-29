'use strict';

angular.module('casesApp')
  .controller('MainCtrl', ['$log','$scope','$http','casesResource', function ($log,$scope, $http,casesResource) {

    var sfToken = '';
    // get token
    $http.get('/api/getToken').success(function(sf) {
        sfToken = sf.token;
        // Getting cases
        var Cases = casesResource.query({token:sfToken},function() {
            $scope.Cases =Cases;
        });
    });

    // create case
    $scope.create = function() {
        var Case = new casesResource({
            Name: $scope.form.name
        });
        Case.$save({token:sfToken},function(res){
            if (res.success==true){
                $scope.Cases.push(Case);
                $scope.form='';
            }
        });
    };

    // remove case
    $scope.remove = function(Case){

        Case.$remove({token:sfToken,caseId:Case.Id},function(res){
            if(res.success==true){
                for (var i in $scope.Cases) {
                    if ($scope.Cases[i].Id == Case.Id) {
                        $scope.Cases.splice(i, 1);
                    }
                }
            }
        }, function(res) {
            if(res.status === 400) {
                $scope.msg=res.data.msg;
                $log.error(res.data.msg);
            }
        });

    }




    // debug - log
    $scope.log = function(Case){
        $log.info(Case);
    };

  }]);
