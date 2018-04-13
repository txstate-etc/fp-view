var express = require('express');
var router = express.Router();
var http = require('http');
require('./fp-api.js')()

router.get('/:netId', function(req, res, next) {
  //for testing
  // var profile = require('../data/profile.json');
  // res.render('profile', {profile: profile})

  //TODO: This will use some other ID, not netId
  var netId = req.params.netId;
  getProfileById(netId)
  .then(function(results) {
    res.render('profile', { profile :  results});
  })
  .catch(function(err) {
    next(err)
  })
})

router.get('/:netId/activity/:type', function(req, res, next) {
  //TODO: This will use some other ID, not netId
  var netId = req.params.netId;
  var type = req.params.type;
  getActivitiesByTypeAndId(netId, type)
  .then(function(results) {
    res.render('more', {content: results, facultyId: netId})
  })
  .catch(function(err) {
    next(err)
  })

  // var moreActivities = require('../data/more-scholarly-creative.json');
  // res.render('more', {content: moreActivities})
})

module.exports = router;
