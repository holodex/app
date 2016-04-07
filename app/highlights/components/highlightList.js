const h = require('vdux/element').default

const { map } = require('lodash')

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props, children }) {
  return h('ul', {}, map(children, (child, childKey) => {
    return h('li', {}, child)
  })
  )
}

function onCreate () {
  return actions.find()
}
