var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
require('./fp-api.js')();

router.get('/files/*', function(req, res, next) {
  var restofpath = '/files/'+req.params[0];
  fetch(getApiPath(restofpath))
  .then(function (result) {
    res.status(result.status)
    res.setHeader('Content-Disposition', result.headers.get('Content-Disposition'))
    result.body.pipe(res)
  })
  .catch(function (err) {
    console.log(err)
    next(err)
  });
})

router.get('/*', function(req, res, next) {
  var restofpath = '/'+req.params[0];
  var status = 500;
  fetch(getApiPath(restofpath))
  .then(function (result) {
    status = result.status
    return result.json()
  })
  .then(function (json) {
    res.setHeader('Cache-Control', 'no-cache')
    res.status(status)
    res.json(json)
  })
  .catch(function (err) {
    console.log(err)
    next(err)
  });
})

module.exports = router;
