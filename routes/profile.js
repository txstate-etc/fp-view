var express = require('express');
var router = express.Router();
var http = require('http');
require('./fp-api.js')()

router.get('/:facultyId', function(req, res, next) {
  var facultyId = req.params.facultyId;
  getProfileById(facultyId)
  .then(function(results) {
    var profile_photo = '';
    var upload_vita = '';
    if (results.portrait) profile_photo = '/api'+results.portrait.path;
    if (results.uploadedcv) upload_vita = '/api'+results.uploadedcv.path;
    res.render('profile', { profile : results, profile_photo: profile_photo, upload_vita: upload_vita});
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
