var React = require('react')
// path React to enable <image> and xlink:href
require('react-svg-patch')

var Ui = require('ui')
var config = require('config')
var router = require('router')
var fetcher = require('fetcher')
var debug = require('debug')('holodex:client')
var Actions = require('actions')

global.types = require('types')

if (process.env.DEBUG) {
  global.localStorage.setItem('debug', process.env.DEBUG)
} else {
  global.localStorage.removeItem('debug')
}

debug('UI starting with config:', config)

router.route(function (route) {
  debug('routing', route)

  var model = fetcher(route)
  debug('model', model)

  React.render(
    React.createElement(Ui, {
      config: config,
      route: route,
      model: model
    }),
    document.querySelector('body > main')
  )
})
