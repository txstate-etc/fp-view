var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var shared = require('../shared/javascripts/shared-functions.js')
require('./fp-api.js')();

router.get('/files/*', function(req, res, next) {
  var urltofetch = getApiPath('/files/'+req.params[0]);
  serve_remote_file(req, res, next, urltofetch)
})

router.get('/crop/files/photo/:userid/:filename', function(req, res, next) {
  var apipath = '/files/photo/'+req.params.userid+'/'+req.params.filename;
  var urltofetch = image_handler(req, '/api'+apipath) || getApiPath(apipath);
  console.log(urltofetch);
  serve_remote_file(req, res, next, urltofetch)
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

var image_handler = function (req, path) {
  var imghurl = process.env.IMAGE_HANDLER_URL
  if (!imghurl) return '';
  if (imghurl.startsWith('//')) imghurl = 'http:'+imghurl;
  return imghurl+'/imagehandler/scaler/'+req.hostname+path+'?mode=fit&width=600&height=600&quality=80&2'
}

var serve_remote_file = function (req, res, next, urltofetch) {
  externalfetch(urltofetch, {headers: {'If-Modified-Since': req.headers['if-modified-since']}})
  .then(function (result) {
    res.status(result.status)
    res.setHeader('Content-Disposition', result.headers.get('Content-Disposition'))
    res.setHeader('Content-Type', result.headers.get('Content-Type'))
    res.setHeader('Content-Length', result.headers.get('Content-Length'))
    if (result.headers.get('Last-Modified')) res.setHeader('Last-Modified', result.headers.get('Last-Modified'));
    result.body.pipe(res)
  })
  .catch(function (err) {
    console.log(err)
    next(err)
  });
}


module.exports = router;
