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

  res.render('results', {term: term,
                         department: department,
                         departmentSearch: departmentSearch })
})

module.exports = router;
