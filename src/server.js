var Path = require('path');
var Url = require('url');
var fs = require('fs');
var extend = require('xtend');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var compress = require('compression');
var config = require('config');
var serveStatic = require('serve-static');
var lessitizer = require('lessitizer');

var app = express();

//
// setup middleware
//
app.use(compress());
app.use(serveStatic(__dirname + '/assets'));
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

app.use(function (req, res, next) {
  res.cookie('config', JSON.stringify(config.ui));
  next();
});


//
// configure Moonboots to serve our UI
//
new Moonboots({
  moonboots: {
    jsFileName: 'bundle',
    cssFileName: 'bundle',
    main: __dirname + '/client.js',
    developmentMode: config.isDev,
    stylesheets: [
      __dirname + '/styles.css',
    ],
    browserify: {
      debug: false,
    },
    beforeBuildJS: function () {
    },
    beforeBuildCSS: function (done) {
      lessitizer({
        files: [
          __dirname + "/styles.less",
        ],
        outputDir: __dirname,
        development: config.isDev,
        less: {
          paths:
            fs.readdirSync(__dirname + "/node_modules")
            .concat([
              __dirname + "/../node_modules/bootstrap/less",
            ])
        },
      }, done);
    },
  },
  server: app,
});

app.listen(config.api.port);

console.log("Craftodex is running at: http://localhost:" + config.api.port + ".");
