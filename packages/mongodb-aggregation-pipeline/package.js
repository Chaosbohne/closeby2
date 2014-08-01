Package.describe({
  summary : "Adds aggregation-pipeline support to meteor."
});

Npm.depends({
  "fibers" : "1.0.1"
});

Package.on_use(function(api, where) {
  api.use([ "mongo-livedata" ], [ "server" ]);

  api.add_files('lib/server.js', "server");
});