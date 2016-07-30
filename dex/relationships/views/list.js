const { html } = require('inu')
const { run } = require('inux')
const plural = require('plur')
const getFormData = require('get-form-data')
const keys = require('lodash/keys')

const { getRelationshipsByAgentTypeKind } = require('../getters')
const viewRelationship = require('./one')
const createRelationship = require('./create')
const { find: findRelationships, put: putRelationship } = require('../effects')

module.exports = viewRelationships

function viewRelationships (agent, model, dispatch) {
  const relationshipsByAgentTypeKind = getRelationshipsByAgentTypeKind(model)
  const relationshipsByTypeKind = relationshipsByAgentTypeKind[agent] || {}
  const relationshipTypes = keys(relationshipsByTypeKind)

  return html`
    <section>
      <ul onload=${handleLoad}>
        ${relationshipTypes.map(relTypeKey => {
          const relType = model.relationshipTypes[relTypeKey]
          if (!relType) return

          const relsByKind = relationshipsByTypeKind[relTypeKey] || {}

          return html`
            <li>
              ${relsByKind.source && html`
                  <section>
                    <h3>${plural(relType.name, relsByKind.source.length)}</h3>
                    <ul>
                      ${relsByKind.source.map(rel => {
                        return html`
                          <li>
                            ${viewRelationship({ rel, kind: 'target' }, model, dispatch)}
                          </li>
                        `
                      })}
                    </ul>
                  </section>
                `
              }

              ${relsByKind.target && html`
                  <section>
                    <h3>${plural(relType.name, relsByKind.target.length)} of</h3>
                    <ul>
                      ${relsByKind.target.map(rel => {
                        return html`
                          <li>
                            ${viewRelationship({ rel, kind: 'source' }, model, dispatch)}
                          </li>
                        `
                      })}
                    </ul>
                  </section>
                `
              }
            </li>
          `
        })}
      </ul>

      ${createRelationship(agent, model, dispatch)}
    </section>
  `

  function handleLoad () {
    dispatch(run(findRelationships({ index: 'source', value: agent })))
    dispatch(run(findRelationships({ index: 'target', value: agent })))
  }
}
