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
    if (results.portrait) profile_photo = image_handler(req, '/api'+results.portrait.path);
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
    var profile_photo = '';
    if (results.person.portrait) profile_photo = image_handler(req, '/api'+results.person.portrait.path);
    res.render('more', {content: results, facultyId: facultyId, profile_photo: profile_photo})
  })
  .catch(function(err) {
    next(err)
  })
})

var image_handler = function (req, path) {
  var imghurl = process.env.IMAGE_HANDLER_URL
  if (!imghurl) return path
  return imghurl+'/imagehandler/scaler/'+req.headers.host+path+'?mode=clip&width=600&height=600&quality=80'
}

module.exports = router;
