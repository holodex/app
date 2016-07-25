const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const extend = require('xtend')

const { FIND, GET, PUT } = require('./effects')
const { SET, set } = require('./actions')

module.exports = RelationshipTypes

function RelationshipTypes ({ api }) {
  return Domain({
    name: 'relationshipTypes',

    init: () => ({
      model: {}
    }),

    update: {
      [SET]: (model, relationshipType) => {
        return {
          model: extend(model, {
            [relationshipType.key]: relationshipType
          })
        }
      }
    },

    run: {
      [FIND]: ({ index, value }, sources) => {
        return pull(
          api.relationshipTypes.find(index, value),
          pull.map(relationshipType => {
            return set(relationshipType)
          })
        )
      },
      [GET]: (key, sources) => {
        return pullAsync(cb => {
          api.relationshipTypes.get(key, (err, relationshipType) => {
            if (err) return console.error(err)
            console.log('got', relationshipType)
            cb(null, set(relationshipType))
          })
        })
      },
      [PUT]: (nextRelationshipType, sources) => {
        return pullAsync(cb => {
          api.relationshipTypes.put(nextRelationshipType, (err, relationshipType) => {
            if (err) return console.error(err)
            cb(null, set(relationshipType))
          })
        })
      }
    }
  })
}
