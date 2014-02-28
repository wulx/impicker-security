Package.describe({
  summary: "Ink file picker with security properties for meteor"
});

Package.on_use(function (api, where) {
  api.add_files('hmac-sha256.js', ['client', 'server']);
  api.add_files('enc-base64-min.js', ['client', 'server']);
  api.add_files('impicker.security.js', ['client', 'server']);
  api.add_files('impicker.load.js', 'client');

  api.export && api.export('impicker');
});
