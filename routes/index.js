var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
  //for testing
  var profile = require('../data/profile.json');
  res.render('profile', { profile: profile})
})

module.exports = router;
