var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var shared = require('../shared/javascripts/shared-functions.js')
require('./fp-api.js')();

router.get('/files/*', function(req, res, next) {
  var restofpath = '/files/'+req.params[0];
  apifetch(restofpath, {headers: {'If-Modified-Since': req.headers['if-modified-since']}})
  .then(function (result) {
    res.status(result.status)
    res.setHeader('Content-Disposition', result.headers.get('Content-Disposition'))
    if (result.headers.get('Last-Modified')) res.setHeader('Last-Modified', result.headers.get('Last-Modified'));
    result.body.pipe(res)
  })
  .catch(function (err) {
    console.log(err)
    next(err)
  });
})

router.get('/*', function(req, res, next) {
  var restofpath = '/'+req.params[0]+shared.createUrlQuery(req.query);
  var status = 500;
  apifetch(restofpath)
  .then(function (result) {
    status = result.status
    return result.json()
  })
  .then(function (json) {
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(status)
    res.json(json)
  })
  .catch(function (err) {
    console.log(err)
    next(err)
  });
})

module.exports = router;
