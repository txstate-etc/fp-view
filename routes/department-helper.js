var http = require('http');

module.exports = function() {
  this.getDepartments = function() {
    return new Promise(function(resolve, reject) {
      var options = {
        host: process.env.API_HOST,
        port: process.env.API_PORT || 80,
        path: '/department',
        method: 'GET'
      }
      var httpRequest = http.request(options, function(httpResponse) {
        httpResponse.setEncoding('utf8');
        var data = '';
        httpResponse.on('data', function(chunk) {
          data += chunk;
        })
        httpResponse.on('end', function() {
          try {
            var jsonObject = JSON.parse(data);
            resolve(jsonObject)
          }
          catch(e) {
            console.log("Error: " + e)
            reject(e)
          }
        })
      }).end();
    })
  }
}
