'use strict';

var glob = require('glob');
var gulp = require('gulp');
var push = require('couchdb-push');

var argv = require('yargs').argv;
var config = require('./config.json');
var couch_url;
if (argv.url) {
  couch_url = argv.url;
} else if (config.env && config.env['default'] && config.env['default'].db) {
  couch_url = config.env['default'].db;
} else {
  // TODO: make this hault
  console.log('You must supply the URL to your CouchDB instance (via --url or config.json');
}

gulp.task('default', function() {
  glob('_design/*', function(err, matches) {
    if (err) throw err;
    matches.forEach(function(ddoc) {
      push(couch_url, ddoc,
        function(err, resp) {
          if (err) throw JSON.stringify(err);
          console.log(resp);
        });
    });
  });
});
