const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { find, put } = require('../effects')
const { getRelationshipTypesByAgent } = require('../getters')

module.exports = viewRelationship

function viewRelationship (relationship, model, dispatch) {
  if (!relationship) return null
  const { key, type, source, target, context } = relationship

  return html`
    <form onsubmit=${handleSubmit}>
      <input name='type' type='hidden' value=${type} />
      <fieldset>
        <label>source</label>
        <input name='source' type='text' value=${source || ''}/>
      </fieldset>
      <fieldset>
        <label>target</label>
        <input name='target' type='text' value=${target || ''} />
      </fieldset>
      <fieldset>
        <label>context</label>
        <input name='context' type='text' value=${context || ''} />
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
