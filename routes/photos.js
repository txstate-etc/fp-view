var express = require('express');
var router = express.Router();
require('./fp-api.js')()

router.get('/', function(req, res, next) {
  var perpage = parseInt(req.query.perpage, 10) || 100
  var page = parseInt(req.query.page, 10) || 1
  getPhotos({page: page, perpage: perpage})
  .then(function(results) {
    results = results.map(function (person) { if (person.portrait) person.profile_photo = '/api/crop'+person.portrait.path; return person; })
    res.render('photos', { people : results, nextpage: page+1, hasnextpage: results.length == perpage });
  })
  .catch(function(err) {
    next(err)
  })
})

module.exports = router
