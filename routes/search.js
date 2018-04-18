var express = require('express');
var router = express.Router();
require('./fp-api.js')()
var shared = require('../shared/javascripts/shared-functions.js')

router.get('/', function(req, res, next) {
  var departmentSearch = false;
  var query = req.query.q
  var department = req.query.dept;
  var college = req.query.college;
  var type = req.query.type
  if (!query) {
    departmentSearch = true
  }

  Promise.all([
    getDepartments(),
    search(req.query)
  ])
  .then(function(results) {
    var departments, searchResults;
    [departments, searchResults] = results;
    res.render('results', {term: query,
                           department: department,
                           college: college,
                           departmentSearch: departmentSearch,
                           organization: departments,
                           results: searchResults
                         })
  })
  .catch(function(err) {
    next(err);
  })

})

module.exports = router;

var search = async function(filters) {
    return await searchAll(filters)
}
