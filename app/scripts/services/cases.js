'use strict';

angular.module('casesApp')
  .factory('casesResource', ['$resource','$http', function($resource,$http) {
        return $resource('api/cases/:token',{token: '@token'} ,{
            caseId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
