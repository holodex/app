const h = require('vdux/element').default

const { map } = require('lodash')

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  console.log(props)
  return h('p', {
    textContent: props.name
  }, [])
}

function onCreate () {
  return actions.find()
}
