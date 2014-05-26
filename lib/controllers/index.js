'use strict';

var path = require('path');
var instance_url='https://emea.salesforce.com';

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      console.log("Error rendering partial '" + requestedView + "'\n", err);
      res.status(404);
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {
  res.render('index');
};


exports.test = function(req, res) {
    var certificate= {
        grant_type: 'password',
        client_id: '3MVG9WtWSKUDG.x64c7y7Be_Acc1n6e9L30vAQ.YDylNO6U3B8a4D5F7O1TbHL0aXuZzgTjqVaai0iaxV46NI',
        client_secret: '399060433996306618',
        username: 'ronihcohen@gmail.com',
        password: '1q2w3e4r5VHCnNnx79tnOMY1bd76MBgP'
    };
    var request = require('request');
    request.post({
                    form: certificate,
                    url:'https://login.salesforce.com/services/oauth2/token'
                 } ,
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.redirect('/t/' + JSON.parse(body).access_token);
            }
            else res.send (response.statusCode);

        });
};


exports.token = function(req, res) {
    var getToken = req.param('token');
    var query = 'SELECT Name, Id from Account LIMIT 100';
    var queryUrl = instance_url+'/services/data/v20.0/query/?q=' + encodeURIComponent(query);

    var request = require('request');
    request.get({url:queryUrl,headers: {Authorization: 'OAuth '+getToken}},
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                res.send(JSON.parse(body).records);
            }
            else res.send (response.statusCode);
        }
    );
};


