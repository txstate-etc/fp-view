var express = require('express');
var router = express.Router();
require('./fp-api.js')()

router.get('/', function(req, res, next) {
  getDepartments()
  .then(function(results) {
    if (!results) {
      throw new Error('Failed to retrieve departments from API')
    }
    var orgWithDepts = results.filter(function(org, index, arr) {
      return org.departments.length > 1;
    });
    var orgNoDepts = results.filter(function(org, index, arr) {
      return (org.departments.length == 1 && org.college == org.departments[0])
    });
    res.render('departments', { organization :  orgWithDepts, orgNoDepts: orgNoDepts});
  })
  .catch(function(err) {
    console.log(err)
    next(err)
  })
})

module.exports = router
