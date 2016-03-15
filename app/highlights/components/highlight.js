const h = require('vdux/element').default

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('p', {}, props.highlight.note)
}

function onCreate () {
  return actions.find()
}
