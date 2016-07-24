const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { find, put } = require('./effects')

module.exports = viewRelationshipType

function viewRelationshipType (relationshipType, model, dispatch) {
  if (!relationshipType) return null
  const { key, agent, name } = relationshipType

  return html`
    <form onsubmit=${handleSubmit}>
      <input name='agent' type='hidden' value=${agent} />
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

