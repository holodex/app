const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { getRelationshipTypesByAgent } = require('dex/relationshipTypes/getters')
const { put } = require('../effects')

module.exports = createRelationship

function createRelationship (agent, model, dispatch) {
  const relationshipTypesByAgent = getRelationshipTypesByAgent(model)
  const relationshipTypes = relationshipTypesByAgent[agent] || []

  return html`
    <form onsubmit=${handleAddRel}>
      <input type='hidden' name='source' value=${agent} />
      <fieldset>
        <label>type</label>
        <select name='type'>
          ${relationshipTypes.map(relType => {
            return html`
              <option value=${relType.key}>
                ${relType.name}
              </option>
            `
          })}
        </select>
      </fieldset>
      <fieldset>
        <label>target</label>
        <input type='text' name='target' />
      </fieldset>
      <input type='submit' value='add relationship' />
    </form>
  `

  function handleAddRel (ev) {
    ev.preventDefault()
    const rel = getFormData(ev.target)
    console.log('rel', rel)
    dispatch(run(put(rel)))
  }
}

