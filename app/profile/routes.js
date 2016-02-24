const h = require('vdux/element').default

const ProfileList = require('./components/profileList')
const { getIndexProps } = require('./getters')

module.exports = routes

function routes (route) {
  return route('/profiles', (params, state) => {
    const props = getIndexProps(state)
    return h(ProfileList, props.profiles)
  })
}
