const { createSelector, createStructuredSelector } = require('reselect')

const getProfiles = (state) => state.profiles

const getIndexProps = createStructuredSelector({
  profiles: getProfiles
})

module.exports = {
  getIndexProps
}
