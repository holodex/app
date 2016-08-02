const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const extend = require('xtend')
const through = require('pull-through')

const { get: getRelationshipType } = require('dex/relationshipTypes/effects')
const { SET, set, UNSET, unset } = require('./actions')
const { FIND, PUT, DEL } = require('./effects')

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
      },
      [UNSET]: (model, key) => {
        const nextModel = extend(model)
        delete nextModel[key]
        return { model: nextModel }
      }
    },

    run: {
      [FIND]: ({ index, value }, sources) => {
        console.log('find', index, value)
        return pull(
          api.relationships.find(index, value),
          through(function (relationship) {
            this.queue(run(getRelationshipType(relationship.type)))
            this.queue(set(relationship))
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
      },
      [DEL]: (key, sources) => {
        return pullAsync(cb => {
          api.relationships.del(key, (err) => {
            if (err) return console.error(err)
            cb(null, unset(key))
          })
        })
      }
    }
  })
}
