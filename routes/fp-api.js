var fetch = require('node-fetch');

var protocol = (process.env.API_SSL == "true")? "https" : "http";
var api_host = `${protocol}://${process.env.API_HOST}`

module.exports = function() {
  this.getDepartments = async function() {
    try {
      var res = await fetch(`${api_host}/department`)
      return res.json()
    }
    catch(e) {
      console.log("Error: " + e)
      return Promise.reject(e)
    }
  },
  this.getProfileById = async function(id) {
    try {
      var res = await fetch(`${api_host}/profile/${id}`)
      return res.json();
    }
    catch(e) {
      console.log("Error: " + e)
      return Promise.reject(e)
    }
  },
  this.getActivitiesByTypeAndId = async function(facultyId, type) {
    try {
      var res = await fetch(`${api_host}/profile/${facultyId}/activity/${type}`)
      return res.json();
    }
    catch(e) {
      console.log("Error: " + e)
      return Promise.reject(e)
    }
  }
  this.getApiPath = function (path) {
    return protocol+'://'+(process.env.API_PUBLIC_HOST || process.env.API_HOST)+path;
  }
}
