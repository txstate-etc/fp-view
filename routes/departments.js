var express = require('express');
var router = express.Router();
require('./fp-api.js')()

router.get('/', function(req, res, next) {
  getDepartments()
  .then(function(results) {
    res.render('departments', { organization :  results});
  })
  .catch(function(err) {
    next(err)
  })
})

module.exports = router
