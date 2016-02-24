const { createSelector, createStructuredSelector } = require('reselect')

const getProfiles = (state) => state.profile.records

const getIndexProps = createStructuredSelector({
  profiles: getProfiles
})

module.exports = {
  getIndexProps
}
