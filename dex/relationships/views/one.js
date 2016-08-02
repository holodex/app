const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { del } = require('../effects')
const { getRelationshipTypesByAgent } = require('../getters')

module.exports = viewRelationship

function viewRelationship ({ rel, kind }, model, dispatch) {
  if (!rel) return null
  const { key, type } = rel

  return html`
    <div>
      ${rel[kind]}
      <button onclick=${handleClick}>remove</button>
    </div>
  `

  function handleClick (ev) {
    dispatch(run(del(key)))
  }
}
