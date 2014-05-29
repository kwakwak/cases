'use strict';

angular.module('casesApp')
  .factory('casesResource', ['$resource','$http', function($resource,$http) {
        return $resource('api/cases/:token/:caseId',
            {
                token: '@token' ,
                caseId:'@caseId'
            },

            {
            update: {
                method: 'PUT'
            }
        });
    }]);
