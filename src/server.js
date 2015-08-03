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

app.use(config.api.url.pathname, require('api-service')(config))
app.use(config.ui.url.pathname, require('ui-service')(config))

// start server
app.listen(config.api.url.port, function () {
  console.log('Holodex is running at: ' + Url.format(config.url) + '.')
})
