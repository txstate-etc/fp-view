var express = require('express');
var router = express.Router();
require('./departments.js')()

/* GET home page. */
router.get('/', function(req, res, next) {
  getDepartments()
  .then(function(results) {
    res.render('index', { organization :  results});
  })
  .catch(function(err) {
    next(err)
  })
});

module.exports = router;
