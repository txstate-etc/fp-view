var fetch = require('node-fetch');
var shared = require('../shared/javascripts/shared-functions.js')

var protocol = (process.env.API_SSL == "true")? "https" : "http";
var api_host = `${protocol}://${process.env.API_HOST}`

module.exports = function() {
  this.apifetch = function(path, options = {}) {
    options.agent = global.apiagent
    return fetch(getApiPath(path), options)
  },
  this.externalfetch = function(path, options = {}) {
    options.agent = global.apiagent
    return fetch(path, options)
  },
  this.grab = async function(path) {
    var res = await apifetch(path)
    if (!res.ok) {
      if (res.status >= 500) throw new Error(`API call failed (${res.status}): ${res.statusText}`)
      else return undefined
     }
     return res.json()
  },
  this.getDepartments = function() {
    return grab('/department')
  },
  this.getPhotos = function(query) {
    var qs = shared.createUrlQuery(query);
    return grab(`/search/photo${qs}`)
  },
  this.getProfileById = async function(id) {
    return grab(`/profile/${id}`)
  },
  this.getActivitiesByTypeAndId = async function(facultyId, type) {
    return grab(`/profile/${facultyId}/activity/${type}`)
  }
  this.getApiPath = function (path) {
    return api_host+path;
  },
  this.searchAll = async function(query) {
    var qs = shared.createUrlQuery(query);
    return grab(`/search/all${qs}`)
  },
  this.searchPeople = async function(query) {
    var qs = shared.createUrlQuery(query);
    return grab(`/search/list${qs}`)
  }
}
