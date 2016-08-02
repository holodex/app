const { createSelector } = require('reselect')
const groupBy = require('lodash/groupBy')

const getRelationshipTypes = (model) => model.relationshipTypes

// has-many relation:
//   agent has-many relationshipTypes
const getRelationshipTypesByAgent = createSelector(
  getRelationshipTypes,
  (relationshipTypes) => {
    return groupBy(relationshipTypes, 'agent')
  }
)

module.exports = {
  getRelationshipTypesByAgent
}
