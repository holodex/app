const h = require('vdux/element').default

const component = require('./component')

module.exports = routes

function routes (route) {
  return route('/404', (params, state) => {
    return h(component, state)
  })
}
