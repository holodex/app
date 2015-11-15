var React = require('react')
var ReactDOM = require('react-dom')


// var Ui = require('ui')
// var config = require('config')
// var router = require('router')
// var fetcher = require('fetcher')

var state = require('state')

var debug = require('debug')('client')


global.types = require('types')

if (process.env.DEBUG) {
  global.localStorage.setItem('debug', process.env.DEBUG)
} else {
  global.localStorage.removeItem('debug')
}

debug('UI starting with config:', config)

  ReactDOM.render(
    React.createElement(Ui, {
      config: config,
      route: route,
      model: model
    }),
    document.querySelector('body > main')
  )
})
