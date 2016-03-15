const h = require('vdux/element').default

const { map } = require('lodash')

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('label', {}, 'Highlight:', 
           h('input', {type: 'text', class: 'highlightNote'},[]))
}

function onCreate () {
  return actions.find()
}
