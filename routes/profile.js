var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/:netId', function(req, res, next) {
  //for testing
  // var profile = require('../data/profile.json');
  // res.render('profile', {profile: profile})

  var netId = req.params.netId;
  var options = {
    host: process.env.API_HOST,
    port: process.env.API_PORT || 80,
    path: '/profile/' + netId,
    method: 'GET'
  }
  var httpRequest = http.request(options, function(httpResponse) {
    httpResponse.setEncoding('utf8');
    var data = '';
    httpResponse.on('data', function(chunk) {
      data += chunk;
    })
    httpResponse.on('end', function() {
      try {
        var jsonObject = JSON.parse(data)
        res.render('profile', { profile: jsonObject})
      }
      catch(e) {
        next(e)
      }
    })
  }).end();
})

router.get('/:netId/activity/:type', function(req, res, next) {
  var netId = req.params.netId;
  //TODO: will need to send the Professor's name, position, and department to UI too.
  var options = {
    host: process.env.API_HOST,
    port: process.env.API_PORT || 80,
    path: '/profile/' + netId + '/activity/' + req.params.type,
    method: 'GET'
  }
  var httpRequest = http.request(options, function(httpResponse) {
    httpResponse.setEncoding('utf8');
    var data = '';
    httpResponse.on('data', function(chunk) {
      data += chunk;
    })
    httpResponse.on('end', function(){
      try {
        var jsonObject = JSON.parse(data);
        res.render('more', {content: jsonObject, netId: netId})
      }
      catch(e) {
        console.log("Error: " + e)
        next(e)
      }
    })
  }).end()
  // var moreActivities = require('../data/more-scholarly-creative.json');
  // res.render('more', {content: moreActivities})
})

module.exports = router;
