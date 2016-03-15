const h = require('vdux/element').default

const { map } = require('lodash')

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props, children }) {
  return h('div', {id: 'newHighlightList'}, map(children, (child, childKey) => {
    return h(child, {}, [])
  }),
  h('button', { onClick: addHighlight }, 'Add new highlight'))
}
function addHighlight () {
  console.log('Add Highlight')
}

function onCreate () {
  return actions.find()
}
