var express = require('express');
var router = express.Router();

//TODO: rename this endpoint.
//The obvious choice is 'search' but I already used that for rendering the search page.
//Maybe that one can be renamed instead
router.get('/', function(req, res, next) {
  var term = req.query.term
  var department = req.query.department;
  var type = req.query.type
  var departmentSearch = false;
  var results = [];
  if (!term) {
    departmentSearch = true
  }
  if (departmentSearch) {
    results = require('../data/search-results-faculty-name.json');
  }
  else if (type.length == 0 || "faculty-name" === type) {
    results = require('../data/search-results-faculty-name.json');
  }
  //if type is blank or 'faculty-name', search everything
  //if type is scholarly-creative, grants, or awards search activities for those things
  //if type is interests, search the people collection
  //if it's a department search, search the people collection for people in that department
  res.set('X-total-count', 33);
  res.json(results)
})

module.exports = router;
