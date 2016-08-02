const { createSelector } = require('reselect')
const keyBy = require('lodash/keyBy')

const getProfiles = (model) => model.profiles

// has-one relation:
//   agent has-one profile
const getProfilesByAgent = createSelector(
  getProfiles,
  (profiles) => keyBy(profiles, 'agent')
)

module.exports = {
  getProfilesByAgent
}
