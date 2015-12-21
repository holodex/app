const React = require('react')
const ReactDOM = require('react-dom')


const state = require('state')

const debug = require('debug')('client')


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
