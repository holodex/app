const { html } = require('inu')
const { run } = require('inux')

const { getRelationshipTypesByAgent } = require('dex/relationshipTypes/getters')
const { getRelationshipsBySourceAndType } = require('../getters')
const relationshipType = require('dex/relationshipTypes/view')
const relationship = require('./relationship')
const { find: findRelationshipTypes, put: putRelationshipType } = require('dex/relationshipTypes/effects')
const { find: findRelationships, put: putRelationship } = require('../effects')

module.exports = viewRelationship

function viewRelationship (agentId, model, dispatch) {
  const relationshipsBySourceAndType = getRelationshipsBySourceAndType(model)
  const relationshipsByType = relationshipsBySourceAndType[agentId] || {}
  const relationshipTypesByAgent = getRelationshipTypesByAgent(model)
  const relationshipTypes = relationshipTypesByAgent[agentId] || []

  return html`
    <div>
      <ul onload=${handleLoad}>
        ${relationshipTypes.map(relType => {
          const typeId = relType.key
          const relationships = relationshipsByType[typeId] || []

          return html`
            <li>
              ${relationshipType(typeId, model, dispatch)}

              <ul>
                ${relationships.map(rel => {
                  const relId = rel.key
                  return relationship(relId, model, dispatch)
                })}
              </ul>

              <button onclick=${handleAddSourceRel(typeId)}>add relationship</button>
            </li>
          `
        })}
      </ul>

      <button onclick=${handleAddRelType}>add relationship type</button>
    </div>
  `

  function handleLoad () {
    if (!agentId || relationshipTypes.length > 0) return
    dispatch(run(findRelationshipTypes({ index: 'agentId', value: agentId })))
    dispatch(run(findRelationships({ index: 'sourceId', value: agentId })))
  }

  function handleAddRelType () {
    const relType = { agentId, name: '' }
    dispatch(run(putRelationshipType(relType)))
  }

  function handleAddSourceRel (typeId) {
    return () => {
      const sourceRel = { sourceId: agentId, typeId }
      console.log('sourceRel', sourceRel)
      dispatch(run(putRelationship(sourceRel)))
    }
  }
}
