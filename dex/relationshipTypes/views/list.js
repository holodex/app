const { html } = require('inu')
const { run } = require('inux')

const viewRelType = require('./one')
const { getRelationshipTypesByAgent } = require('../getters')
const { find, put } = require('../effects')

module.exports = viewRelationshipTypes

function viewRelationshipTypes (agent, model, dispatch) {
  console.log('view agent relationship type', agent)
  const relationshipTypesByAgent = getRelationshipTypesByAgent(model)
  const relationshipTypes = relationshipTypesByAgent[agent] || []

  return html`
    <section>
      <ul onload=${handleLoad}>
        ${relationshipTypes.map(relType => {
          return html`
            <li>
              ${viewRelType(relType, model, dispatch)}
            </li>
          `
        })}
      </ul>

      <button onclick=${handleAddRelType}>add relationship type</button>
    </section>
  `

  function handleLoad () {
    console.log('load agent relationship type', agent)
    dispatch(run(find({ index: 'agent', value: agent })))
  }

  function handleAddRelType (ev) {
    const relType = { agent, name: '' }
    dispatch(run(put(relType)))
  }
}
