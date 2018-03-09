var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
  //for testing
  var profile = require('../data/profile.json');
  res.render('profile', { profile: profile})
})

router.get('/profile/:netId', function(req, res, next) {
  //for testing
  var profile = require('../data/profile.json');
  res.render('profile', {profile: profile})


  // Anne uses this commented out code to get the profile from fp-api

//   var netId = req.params.netId;
//   var options = {
//     host: 'localhost',
//     port: 3001,
//     path: '/profile/' + netId,
//     method: 'GET'
//   }
//   var httpRequest = http.request(options, function(httpResponse) {
//     httpResponse.setEncoding('utf8');
//     httpResponse.on('data', function(profile) {
//       var jsonObject = JSON.parse(profile)
//       res.render('profile', { profile: jsonObject})
//     })
//   }).end();
})

router.get('/profile/:netId/activity/:type', function(req, res, next) {
  // var netId = req.params.netId;
  // var options = {
  //   host: 'localhost',
  //   port: 3001,
  //   path: '/profile/' + netId + '/activity/' + req.params.type,
  //   method: 'GET'
  // }
  // var httpRequest = http.request(options, function(httpResponse) {
  //   httpResponse.setEncoding('utf8');
  //   httpResponse.on('data', function(activities) {
  //     var jsonObject = JSON.parse(activities);
  //     res.render('more', {message: activities})
  //   })
  // }).end()
  var moreActivities = require('../data/more-scholarly-creative.json');
  res.render('more', {content: moreActivities})
})

module.exports = router;
