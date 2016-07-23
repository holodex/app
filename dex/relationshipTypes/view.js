const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { find, put } = require('./effects')

module.exports = viewRelationshipType

function viewRelationshipType (typeId, model, dispatch) {
  const relationshipType = model.relationshipTypes[typeId]
  if (!relationshipType) return null
  const { key, agentId, name } = relationshipType

  return html`
    <form onsubmit=${handleSubmit}>
      <input name='agentId' type='hidden' value=${agentId} />
      <fieldset>
        <label>name</label>
        <input name='name' type='text' value=${name || ''} />
      </fieldset>
      <input type='submit' value='save' />
    </form>
  `

  function handleSubmit (ev) {
    ev.preventDefault()
    var nextRelationshipType = getFormData(ev.target)
    if (key) nextRelationshipType.key = key
    dispatch(run(put(nextRelationshipType)))
  }
}

