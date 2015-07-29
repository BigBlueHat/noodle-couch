function(existing_doc, req) {
  var body, id;
  // TODO: require JSON docs only

  // we're only working with JSON docs sent in via the `body`
  if (!existing_doc && undefined !== req.body) {
    try {
      body = JSON.parse(req.body);
      // make sure it's got a URL
      if (undefined !== body.url) {
        // seems a bit "costly" to re-stringify, but gets us a consistent hash
        var id = encodeURIComponent(JSON.stringify(body));
        log(id);
        return [
          {'_id': id, 'scrape': body},
          'Your scrape request has successfully been stored: ' + id
        ];
      }
    } catch (e) {
      return [null, {code: 500, body: 'Error: ' + e}];
    }
  }
  // we're not updating things; only creating
}
