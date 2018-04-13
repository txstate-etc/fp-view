var express = require('express');
var router = express.Router();
var http = require('http');
require('./fp-api.js')()

router.get('/:facultyId', function(req, res, next) {
  //for testing
  // var profile = require('../data/profile.json');
  // res.render('profile', {profile: profile})

  var facultyId = req.params.facultyId;
  getProfileById(facultyId)
  .then(function(results) {
    res.render('profile', { profile :  results});
  })
  .catch(function(err) {
    next(err)
  })
})

router.get('/:facultyId/activity/:type', function(req, res, next) {
  //TODO: This will use some other ID, not netId
  var facultyId = req.params.facultyId;
  var type = req.params.type;
  getActivitiesByTypeAndId(facultyId, type)
  .then(function(results) {
    res.render('more', {content: results, facultyId: facultyId})
  })
  .catch(function(err) {
    next(err)
  })

  // var moreActivities = require('../data/more-scholarly-creative.json');
  // res.render('more', {content: moreActivities})
})

module.exports = router;
