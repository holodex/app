const h = require('vdux/element').default

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props, children }) {
  return h('div', {}, children)
}

function onCreate () {
  return actions.find()
}
