var Path = require('path')
var Url = require('url')
var fs = require('fs')
var extend = require('xtend')
var express = require('express')
var config = require('config')
var serveStatic = require('serve-static')
var debug = require('debug')('holodex:server')

var isProd = require('util/isProd')
var isDev = require('util/isDev')

var app = express()

// api
app.use(config.api.url.pathname, require('api-service')(config))

// js
app.use(require('bundle-service')({
  entries: [Path.join(__dirname, 'client.js')],
  debug: isDev,
  cacheLength: isProd ? 'days' : undefined,
  cacheFile: Path.join(__dirname, 'assets', '.bundle.json')
}))

// TODO css
// TODO assets

// html
app.use(config.ui.url.pathname, require('ui-service')(config))

// start server
app.listen(config.api.url.port, function () {
  console.log('Holodex is running at: ' + Url.format(config.url) + '.')
})
