const { createSelector } = require('reselect')
const groupBy = require('lodash/groupBy')
const mapValues = require('lodash/mapValues')
const mergeWith = require('lodash/mergeWith')

const getRelationships = (model) => model.relationships

// has-many relation:
//   agent has-many relationships
// group by agent
// group by type
// group by kind
const getRelationshipsByAgentTypeKind = createSelector(
  getRelationships,
  (relationships) => {
    const bySource = groupBy(relationships, 'source')
    const byTarget = groupBy(relationships, 'target')
    const byContext = groupBy(relationships, 'context')

    const byAgent = mergeWith({},
      bySource, byTarget, byContext,
      concatMerge
    )

    return mapValues(
      byAgent,
      (agentRelationships, agent) => {
        return mapValues(
          groupBy(agentRelationships, 'type'),
          (agentTypeRelationships) => {
            return groupBy(agentTypeRelationships, (rel) => {
              switch (agent) {
                case rel.source: return 'source'
                case rel.target: return 'target'
                case rel.context: return 'context'
              }
            })
          }
        )
      }
    )
  }
)

module.exports = {
  getRelationshipsByAgentTypeKind
}

function concatMerge (target, source) {
  if (Array.isArray(target)) {
    return target.concat(source)
  }
}
