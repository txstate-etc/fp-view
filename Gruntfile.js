module.exports = function(grunt) {

  grunt.initConfig({
    handlebars: {
      options: {
        namespace: "fptemplates",
        processName: function(filePath) {
          return filePath.replace(/^views\/partials\//,'').replace(/\.hbs$/, '');
        }
      },
      all : {
        files : {
          "public/javascripts/templates/templates.js" : ["views/partials/activitySearchResult.hbs", "views/partials/personSearchResult.hbs"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-handlebars");
}
