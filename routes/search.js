var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var departmentSearch = false;
  var term = req.query.term
  var department = req.query.department;
  var type = req.query.type
  if (!term) {
    departmentSearch = true
  }

  //if type is blank or 'faculty-name', search everything
  //if type is scholarly-creative, grants, or awards search activities for those things
  //if type is interests, search the people collection
  //if it's a department search, search the people collection for people in that department

  res.format({
    'text/html': function() {
      res.render('results', {term: term,
                             department: department,
                             departmentSearch: departmentSearch })
    },
    'application/json': function() {
      res.send({data: "here is some data"})
    }
  })
})

module.exports = router;
