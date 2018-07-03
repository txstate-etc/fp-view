var express = require('express');
var router = express.Router();
require('./fp-api.js')()
var shared = require('../shared/javascripts/shared-functions.js')

router.get('/', function(req, res, next) {
  var params = {
    q: req.query.q || '',
    dept: req.query.dept || '',
    college: req.query.college || '',
    page: parseInt(req.query.page, 10) || 1,
    perpage: parseInt(req.query.perpage, 10) || 10
  }
  var departmentSearch = !params.q;
  if (!departmentSearch) params.page = 1
  Promise.all([
    getDepartments(),
    search(params)
  ])
  .then(function(results) {
    var departments, searchResults;
    [departments, searchResults] = results;
    res.render('results', {params: params,
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
    if (!filters.q) {
      return await searchPeople(filters)
    }
    else {
      return await searchAll(filters)
    }
}
