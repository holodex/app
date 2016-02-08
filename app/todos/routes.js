const h = require('vdux/element').default

const component = require('./components/todos')

module.exports = routes

function routes (route) {
  return route('/todos', (params, state) => {
    return h(component, state)
  })
}
