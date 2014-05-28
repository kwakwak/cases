'use strict';

//var myToken ='00D20000000lxvx!AQUAQJPmYb.S4E.h3u2SwiyaZvYFacngT.G_JuXoo0BSLB1UWfN1G1kRj8CKAK1PtX1Pe8ujbENB2gxzsr98kr4yBy1wVuc2';
//var Token;

angular.module('casesApp')
  .factory('casesResource', ['$resource','$http', function($resource,$http) {
        return $resource('t/:token',{token: '@token'} ,{
            caseId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
