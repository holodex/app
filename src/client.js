var debug = require('debug')("craftodex")

var React = require('react')
//path React to enable <image> and xlink:href
require('react-svg-patch')
var Url = require('url')

var Ui = require('ui')
var config = require('uiconfig')
var router = require('router')
var fetcher = require('fetcher')



if (config.debug) {
  localStorage.setItem("debug", "*")
} else {
  localStorage.removeItem("debug")
}

debug("UI starting with config:", config)

router.route(function (route) {
  debug("routing", route)

  var model = fetcher(route)

  debug('model', model)

  React.render(
    React.createElement(Ui, {
      config: config,
      route: route,
      model: model,
    }),
    document.querySelector('body > main')
  )
})
