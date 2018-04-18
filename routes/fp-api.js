var fetch = require('node-fetch');
var shared = require('../shared/javascripts/shared-functions.js')

var protocol = (process.env.API_SSL == "true")? "https" : "http";
var api_host = `${protocol}://${process.env.API_HOST}`

module.exports = function() {
  this.apifetch = function(path, options = {}) {
    options.agent = global.apiagent
    return fetch(getApiPath(path), options)
  },
  this.getDepartments = async function() {
    try {
      var res = await apifetch('/department')
      return res.json()
    }
    catch(e) {
      console.log("Error: " + e)
      return Promise.reject(e)
    }
  },
  this.getProfileById = async function(id) {
    try {
      var res = await apifetch(`/profile/${id}`)
      return res.json();
    }
    catch(e) {
      console.log("Error: " + e)
      return Promise.reject(e)
    }
  },
  this.getActivitiesByTypeAndId = async function(facultyId, type) {
    try {
      var res = await apifetch(`/profile/${facultyId}/activity/${type}`)
      return res.json();
    }
    catch(e) {
      console.log("Error: " + e)
      return Promise.reject(e)
    }
  }
  this.getApiPath = function (path) {
    return api_host+path;
  },
  this.searchAll = async function(query) {
    var qs = shared.createUrlQuery(query);
    try {
      var res = await apifetch(`/search/all${qs}`)
      return res.json();
    }
    catch(e) {
      console.log("Error: " + e);
      return Promise.reject(e)
    }
  },
  this.searchPeople = async function(query) {
    var qs = shared.createUrlQuery(query);
    try {
      var res = await apifetch(`/search/list/${qs}`)
      return res.json()
    }
    catch(e) {
      console.log("Error: " + e);
      return Promise.reject(e)
    }
  }
}
