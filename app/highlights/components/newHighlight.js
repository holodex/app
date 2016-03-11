const h = require('vdux/element').default

const { map } = require('lodash')

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('label', {for: 'highlightNote'}, 'Highlight:'),
         h('input', {type: 'text', class: 'highlightNote', name: 'highlightNote'},[])
}

function onCreate () {
  return actions.find()
}
