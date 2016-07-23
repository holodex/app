const { createSelector } = require('reselect')

const getRelationshipTypes = (model) => model.relationshipTypes

// has-many relation:
//   agent has-many relationshipTypes
const getRelationshipTypesByAgent = createSelector(
  getRelationshipTypes,
  (relationshipTypes) => {
    if (!relationshipTypes) return {}
    return Object.keys(relationshipTypes)
      .reduce((sofar, key) => {
        const relationshipType = relationshipTypes[key]
        sofar[relationshipType.agentId] = sofar[relationshipType.agentId] || []
        sofar[relationshipType.agentId].push(relationshipType)
        return sofar
      }, {})
  }
)

module.exports = {
  getRelationshipTypesByAgent
}
