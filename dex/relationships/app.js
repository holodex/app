const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const extend = require('xtend')

const { FIND, PUT } = require('./effects')
const { SET, set } = require('./actions')

module.exports = RelationshipTypes

function RelationshipTypes ({ api }) {
  return Domain({
    name: 'relationships',

    init: () => ({
      model: {}
    }),

    update: {
      [SET]: (model, relationship) => {
        return {
          model: extend(model, {
            [relationship.key]: relationship
          })
        }
      }
    },

    run: {
      [FIND]: ({ index, value }, sources) => {
        return pull(
          api.relationships.find(index, value),
          pull.map(relationship => {
            return set(relationship)
          })
        )
      },
      [PUT]: (nextRelationshipType, sources) => {
        return pullAsync(cb => {
          api.relationships.put(nextRelationshipType, (err, relationship) => {
            if (err) return console.error(err)
            cb(null, set(relationship))
          })
        })
      }
    }
  })
}
