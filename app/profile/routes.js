const h = require('vdux/element').default

const Profiles = require('./components/profiles')
const { getIndexProps } = require('./getters')

module.exports = routes

function routes (route) {
  return route('/profiles', (params, state) => {
    const props = getIndexProps(state)
    return h(Profiles, props)
  })
}
