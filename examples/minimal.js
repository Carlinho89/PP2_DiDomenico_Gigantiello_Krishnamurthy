var xhr = require("xhr");
var app = require("biojs-vis-genbank");
var parser = app.io.genbank;

xhr("../sequence.gb", function(err, status, body) {
  var opts = {};
  opts.el = yourDiv;
  opts.createHTML = true;
  opts.model = parser(body);
  var instance = app(opts);
});
