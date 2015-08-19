var Url = require('url')
var express = require('express')
var config = require('config')

var app = express()

console.log("config port", config.get('url.port'))

// api
app.use(config.api.url.pathname, require('api-service')(config))

// js
app.use(config.bundle.url.pathname, require('bundle-service')(config))

// less
app.use(config.less.url.pathname, require('less-service')(config))

// assets
app.use(config.assets.url.pathname, require('assets-service')(config))

// html
app.use(config.ui.url.pathname, require('ui-service')(config))

// start server
app.listen(config.url.port, function () {
  console.log('Holodex is running at: ' + Url.format(config.url) + '.')
})
