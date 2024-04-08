var express = require('express');
var router = express.Router();
// var fetch = require('node-fetch');
var shared = require('../shared/javascripts/shared-functions.js')
require('./fp-api.js')();
var image_handler = require('./image-handler')
const { Readable } = require('stream')

router.get('/files/*', function(req, res, next) {
  var urltofetch = getApiPath('/files/'+req.params[0]);
  serve_remote_file(req, res, next, urltofetch)
})

router.get('/crop/files/photo/:userid/:filename', function(req, res, next) {
  var apipath = '/files/photo/'+req.params.userid+'/'+req.params.filename;
  var urltofetch = image_handler(req, '/api'+apipath, 600, 600) || getApiPath(apipath);
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

var serve_remote_file = async function (req, outResponse, next, urltofetch) {
  const inResponse = await externalfetch(urltofetch, {headers: {'If-Modified-Since': req.headers['if-modified-since']}})
  try {
    outResponse.status(inResponse.status)
    outResponse.setHeader('Content-Disposition', inResponse.headers.get('Content-Disposition'))
    outResponse.setHeader('Content-Type', inResponse.headers.get('Content-Type'))
    outResponse.setHeader('Content-Length', inResponse.headers.get('Content-Length'))
    if (inResponse.headers.get('Last-Modified')) outResponse.setHeader('Last-Modified', inResponse.headers.get('Last-Modified'))
    if (inResponse.status !== 304) Readable.fromWeb(await inResponse.body).pipe(outResponse)
  } catch(err) {
    console.log(err)
    next(err)
  }
}

module.exports = router;
