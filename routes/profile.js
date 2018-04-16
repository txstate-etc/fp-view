var express = require('express');
var router = express.Router();
var http = require('http');
require('./fp-api.js')()

router.get('/:facultyId', function(req, res, next) {
  var facultyId = req.params.facultyId;
  getProfileById(facultyId)
  .then(function(results) {
    var profile_photo = '';
    if (results.portrait) profile_photo = '/api'+results.portrait.path;
    res.render('profile', { profile : results, profile_photo: profile_photo});
  })
  .catch(function(err) {
    next(err)
  })
})

router.get('/:facultyId/activity/:type', function(req, res, next) {
  var facultyId = req.params.facultyId;
  var type = req.params.type;
  getActivitiesByTypeAndId(facultyId, type)
  .then(function(results) {
    res.render('more', {content: results, facultyId: facultyId})
  })
  .catch(function(err) {
    next(err)
  })
})

module.exports = router;
