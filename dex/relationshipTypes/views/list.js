const { html } = require('inu')
const { run } = require('inux')

const viewRelType = require('./one')
const { getRelationshipTypesByAgent } = require('../getters')
const { find, put } = require('../effects')

module.exports = viewRelationshipTypes

function viewRelationshipTypes (agent, model, dispatch) {
  const relationshipTypesByAgent = getRelationshipTypesByAgent(model)
  const relationshipTypes = relationshipTypesByAgent[agent] || []

  return html`
    <div onload=${handleLoad}>
      <ul>
        ${relationshipTypes.map(relType => {
          return html`
            <li>
              ${viewRelType(relType, model, dispatch)}
            </li>
          `
        })}
      </ul>

      <button onclick=${handleAddRelType}>add relationship type</button>
    </div>
  `

  function handleLoad () {
    if (!agent) return
    dispatch(run(find({ index: 'agent', value: agent })))
  }

  function handleAddRelType (ev) {
    const relType = { agent, name: '' }
    dispatch(run(put(relType)))
  }
}
