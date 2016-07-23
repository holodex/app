const { createSelector } = require('reselect')

const getProfiles = (model) => model.profiles

const getProfilesByAgent = createSelector(
  getProfiles,
  (profiles) => {
    if (!profiles) return {}
    return Object.keys(profiles)
      .reduce((sofar, key) => {
        const profile = profiles[key]
        sofar[profile.agentId] = profile
        return sofar
      }, {})
  }
)

module.exports = {
  getProfilesByAgent
}
