const { createSelector, createStructuredSelector } = require('reselect')

const { map, groupBy } = require('lodash')

const { getAllHighlights } = require('../highlights/getters')
const getProfiles = (state) => state.profile.records

const getProfilesWithData = createSelector(
  getAllHighlights,
  getProfiles,
  (highlights, profiles) => {
    const orderedHighlights = groupBy(highlights, (highlight) => {
        return highlight.profileId
      })
    return map(profiles, (profile, profileKey)=> {
      return Object.assign({ highlights: orderedHighlights[profile.id] || [] }, profile)
    })
})

const getIndexProps = createStructuredSelector({
  profiles: getProfiles,
  profilesWithData: getProfilesWithData
})

module.exports = {
  getIndexProps
}
