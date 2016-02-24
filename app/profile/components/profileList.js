const h = require('vdux/element').default

const Profile = require('./profile')

const { map } = require('lodash')

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('div', {},  map(props, (profile, profileKey) => {
    return h(Profile, profile, [])
  }))
}

function onCreate () {
  return actions.find()
}
