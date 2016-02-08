const h = require('vdux/element').default

const component = require('./components/landing')

module.exports = routes

function routes (route) {
  return route('/', (params, state) => {
    return h(component, state)
  })
}
