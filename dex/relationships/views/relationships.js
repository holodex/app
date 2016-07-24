const { html } = require('inu')
const { run } = require('inux')

const { getRelationshipTypesByAgent } = require('dex/relationshipTypes/getters')
const { getRelationshipsByAgentTypeKind } = require('../getters')
const relationshipType = require('dex/relationshipTypes/view')
const relationship = require('./relationship')
const { find: findRelationshipTypes, put: putRelationshipType } = require('dex/relationshipTypes/effects')
const { find: findRelationships, put: putRelationship } = require('../effects')

module.exports = viewRelationship

function viewRelationship (agent, model, dispatch) {
  const relationshipsByAgentTypeKind = getRelationshipsByAgentTypeKind(model)
  const relationshipsByTypeKind = relationshipsByAgentTypeKind[agent] || {}
  const relationshipTypesByAgent = getRelationshipTypesByAgent(model)
  const relationshipTypes = relationshipTypesByAgent[agent] || []

  return html`
    <div>
      <ul onload=${handleLoad}>
        ${relationshipTypes.map(relType => {
          const relationshipsByKind = relationshipsByTypeKind[relType.key]
            || { source: [], target: [], context: [] }

          return html`
            <li>
              ${relationshipType(relType, model, dispatch)}

              <ul>
                ${relationshipsByKind.source.map(rel => {
                  return relationship(rel, model, dispatch)
                })}
              </ul>

              <button onclick=${handleAddSourceRel(relType.key)}>add relationship</button>
            </li>
          `
        })}
      </ul>

      <button onclick=${handleAddRelType}>add relationship type</button>
    </div>
  `

  function handleLoad () {
    if (!agent || relationshipTypes.length > 0) return
    dispatch(run(findRelationshipTypes({ index: 'agent', value: agent })))
    dispatch(run(findRelationships({ index: 'source', value: agent })))
  }

  function handleAddRelType () {
    const relType = { agent, name: '' }
    dispatch(run(putRelationshipType(relType)))
  }

  function handleAddSourceRel (type) {
    return () => {
      const sourceRel = { source: agent, type }
      dispatch(run(putRelationship(sourceRel)))
    }
  }
}
