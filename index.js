var noodle = require('noodlejs');
var PouchDB = require('pouchdb');

var db = PouchDB('http://admin:passwd@localhost:5984/noodle-couch');

noodle.query({
  url:      'https://github.com/showcases/javascript-game-engines',
  selector: 'h3.repo-list-name a',
  extract:  'href'
})
.then(function (results) {
  db.post(results)
    .then(function(resp) {
      console.log(resp);
      console.log('http://localhost:5984/noodle-couch/' + resp.id);
    });
});
