var Path = require('path');
var Url = require('url');
var fs = require('fs');
var extend = require('xtend');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var config = require('config');
var serveStatic = require('serve-static');
var browserify = require('browserify-middleware');
var less = require('less-middleware');

require('node-jsx').install();

var isDev = process.env.NODE_ENV != 'production';

var app = express();

//
// serve less styles
//
app.use(less("/", {
  debug: isDev,
  pathRoot: __dirname,
  dest: '/assets',
  once: !isDev,
  parser: {
    relativeUrls: true,
    paths: fs.readdirSync(__dirname + "/node_modules")
      .concat([
        __dirname + "/../node_modules/bootstrap/less",
      ]),
  },
}));

//
// serve browserify scripts
//
browserify.settings.production('minify', false);
app.use('/bundle.js',
  browserify(__dirname + '/client.js')
);

// set cookie on index.html
app.use(function (req, res, next) {
  var url = Url.parse(req.url);
  if (
    url.pathname === "/index.html" ||
    url.pathname === "/"
  ) {
    res.cookie('config', JSON.stringify(config.ui));
  }
  next();
});

// serve static files
app.use(serveStatic(__dirname + '/assets'));

//
// setup api middleware
//
app.use(compress());
app.use(cookieParser());
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

//
// setup API
//
app.use(config.api.prefix, require('api'));

//
// set our UI config cookie
//
config.ui.api = Url.format(
  extend(
    config.api,
    {
      pathname: config.api.prefix,
    }
  )
);

// start server
app.listen(config.api.port);

console.log("Craftodex is running at: http://localhost:" + config.api.port + ".");
