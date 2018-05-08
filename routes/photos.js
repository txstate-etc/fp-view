var express = require('express');
var router = express.Router();
require('./fp-api.js')()

router.get('/', function(req, res, next) {
  getPhotos({page: req.query.page, perpage: req.query.perpage})
  .then(function(results) {
    results = results.map(function (person) { if (person.portrait) person.profile_photo = '/api/crop'+person.portrait.path; return person; })
    res.render('photos', { people : results, nextpage: req.query.page+1, hasnextpage: results.length == req.query.perpage });
  })
  .catch(function(err) {
    next(err)
  })
})

module.exports = router
