const { html } = require('inu')
const { run } = require('inux')
const plural = require('plur')

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
          const relsByKind = relationshipsByTypeKind[relType.key] || {}

          console.log('relsByKind', relsByKind)

          return html`
            <li>
              ${relationshipType(relType, model, dispatch)}

              ${relsByKind.source && html`
                  <section>
                    <h3>${plural(relType.name, relsByKind.source.length)}</h3>
                    <ul>
                      ${relsByKind.source.map(rel => {
                        return relationship(rel, model, dispatch)
                      })}
                    </ul>
                  </section>
                `
              }

              <button onclick=${handleAddSourceRel(relType.key)}>add relationship</button>

              ${relsByKind.target && html`
                  <section>
                    <h3>${plural(relType.name, relsByKind.target.length)} of</h3>
                    <ul>
                      ${relsByKind.target.map(rel => {
                        return relationship(rel, model, dispatch)
                      })}
                    </ul>
                  </section>
                `
              }
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
