var express = require('express');
var router = express.Router();
var fs = require('fs')
var Handlebars = require('handlebars');
require('./fp-api.js')()
var shared = require('../shared/javascripts/shared-functions.js')

var activityResultTemplateString = fs.readFileSync(__dirname + "/../views/partials/activitySearchResult.hbs", "utf-8");
var compiledActivityResult = Handlebars.precompile(activityResultTemplateString);
var personResultTemplateString = fs.readFileSync(__dirname + "/../views/partials/personSearchResult.hbs", "utf-8");
var compiledPersonResult = Handlebars.precompile(personResultTemplateString);

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
    console.log(JSON.stringify(searchResults))
    res.render('results', {term: query,
                           department: department,
                           college: college,
                           departmentSearch: departmentSearch,
                           organization: departments,
                           results: searchResults,
                           templates: {
                             activityResultTemplate: compiledActivityResult,
                             personResultTemplate: compiledPersonResult
                           }})
  })
  .catch(function(err) {
    next(err);
  })

})

module.exports = router;

var search = async function(filters) {
    return await searchAll(filters)
}
