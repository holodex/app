const h = require('vdux/element').default

const actions = require('../actions')

module.exports = {
  render,
  onCreate
}

function render ({ props }) {
  return h('div', {
    textContent: "All Profiles"
  }, [])
}

function onCreate () {
  return actions.find()
}
