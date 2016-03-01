const h = require('vdux/element').default

const { map } = require('lodash')

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('div', { style: {'border':'1px solid black'}},
           h('p', {}, props.profile.name),
           h('p', {}, props.profile.note),
           h('p', {}, props.profile.image)
    )
}

function onCreate () {
  return actions.find()
}
