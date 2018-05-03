var express = require('express');
var router = express.Router();
require('./fp-api.js')()

router.get('/', function(req, res, next) {
  getPhotos()
  .then(function(results) {
    results = results.map(function (person) { if (person.portrait) person.profile_photo = '/api/crop'+person.portrait.path; return person; })
    res.render('photos', { people : results});
  })
  .catch(function(err) {
    next(err)
  })
})

module.exports = router
