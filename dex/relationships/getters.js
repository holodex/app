const { createSelector } = require('reselect')

const getRelationships = (model) => model.relationships

// has-many relation:
//   agent has-many relationships
// group by type
const getRelationshipsBySourceAndType = createSelector(
  getRelationships,
  (relationships) => {
    if (!relationships) return {}
    return Object.keys(relationships)
      .reduce((sofar, key) => {
        console.log('sofar', sofar)
        const relationship = relationships[key]
        sofar[relationship.sourceId] = sofar[relationship.sourceId] || []
        const agentRelationships = sofar[relationship.sourceId]
        agentRelationships[relationship.typeId] = agentRelationships[relationship.typeId] || []
        agentRelationships[relationship.typeId].push(relationship)
        return sofar
      }, {})
  }
)

module.exports = {
  getRelationshipsBySourceAndType
}

