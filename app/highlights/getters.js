const { createSelector, createStructuredSelector } = require('reselect')

const { filter, isEmpty } = require('lodash')

const getAllHighlights = (state) => state.highlights.records

const getIndexProps = createStructuredSelector({
  highlights: getAllHighlights
})

const getHighlights =  (highlights, profile) => {
      if(profile && !isEmpty(profile)) {
        return filter(highlights, (highlight) => {
          return highlight.profileId === profile.id
        }) 
      } else {
        return undefined
      }
    }

module.exports = {
  getIndexProps, getHighlights, getAllHighlights
}
