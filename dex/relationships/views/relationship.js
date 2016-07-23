const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { find, put } = require('../effects')
const { getRelationshipTypesByAgent } = require('../getters')

module.exports = viewRelationshipType

function viewRelationshipType (relationshipId, model, dispatch) {
  const relationship = model.relationships[relationshipId] || {}
  if (!relationship) return null
  const { key, typeId, sourceId, targetId, contextId } = relationship

  return html`
    <form onsubmit=${handleSubmit}>
      <input name='typeId' type='hidden' value=${typeId} />
      <fieldset>
        <label>source</label>
        <input name='sourceId' type='text' value=${sourceId || ''} />
      </fieldset>
      <fieldset>
        <label>target</label>
        <input name='targetId' type='text' value=${targetId || ''} />
      </fieldset>
      <fieldset>
        <label>contextId</label>
        <input name='contextId' type='text' value=${contextId || ''} />
      </fieldset>
      <input type='submit' value='save' />
    </form>
  `

  function handleSubmit (ev) {
    ev.preventDefault()
    var nextRelationship = getFormData(ev.target)
    if (key) nextRelationship.key = key
    dispatch(run(put(nextRelationship)))
  }
}
