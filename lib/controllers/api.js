'use strict';

var request = require('request');
var instance_url='https://emea.salesforce.com';

exports.getToken = function(req, res) {
    var certificate= {
        grant_type: 'password',
        client_id: '3MVG9WtWSKUDG.x64c7y7Be_Acc1n6e9L30vAQ.YDylNO6U3B8a4D5F7O1TbHL0aXuZzgTjqVaai0iaxV46NI',
        client_secret: '399060433996306618',
        username: 'ronihcohen@gmail.com',
        password: '1q2w3e4r5VHCnNnx79tnOMY1bd76MBgP'
    };

    request.post({
            form: certificate,
            url:'https://login.salesforce.com/services/oauth2/token'
        } ,
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.json({token : JSON.parse(body).access_token});
            }
            else res.send (response.statusCode);

        });
};


exports.getCases = function(req, res) {
    var getToken = req.param('token');
    var query = 'SELECT Name, Id from Account LIMIT 100';
    var queryUrl = instance_url+'/services/data/v20.0/query/?q=' + encodeURIComponent(query);

    request.get({url:queryUrl,headers: {Authorization: 'OAuth '+getToken}},
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.send(JSON.parse(body).records);
            }
            else res.send (response.statusCode);
        }
    );
};


exports.createCase = function(req, res) {
    var getToken = req.param('token');
    var Url = instance_url+'/services/data/v20.0/sobjects/Account/';

    var data = {
        Name: req.body.Name
    }

    request.post({
            url:Url,
            headers: {Authorization: 'OAuth '+getToken},
            body : data,
            json: true
        },
        function (error, response, body) {
            if (!error && response.statusCode === 201) {

                data.Id = body.id;
                data.success = true;
                res.send(data);
            }
            else res.send (response.statusCode);
        }
    );
};


exports.deleteCase = function(req, res) {
    var getToken = req.param('token');
    var getId = req.param('id');
    var Url = instance_url+'/services/data/v20.0/sobjects/Account/'+getId;

    request.del({
            url:Url,
            headers: {Authorization: 'OAuth '+getToken},
            json: true
        },
        function (error, response, body) {
            if (!error && response.statusCode === 204) {
                res.json({
                    success:true,
                    Id:getId

                });
            }
            else res.status(response.statusCode).json({msg:body[0].message});
        }
    );
};


