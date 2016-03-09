const { createSelector, createStructuredSelector } = require('reselect')

const { getAllHighlights } = require('../highlights/getters')

const getProfiles = (state) => state.profile.records

const getIndexProps = createStructuredSelector({
  profiles: getProfiles,
  highlights: getAllHighlights
})

module.exports = {
  getIndexProps
}
