const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const defer = require('pull-defer')
const extend = require('xtend')

const { FIND_ONE, PUT } = require('./effects')
const { SET, set } = require('./actions')

module.exports = Profiles
module.exports.views = require('./views')

function Profiles ({ api }) {
  return Domain({
    name: 'profiles',

    init: () => ({
      model: {}
    }),

    update: {
      [SET]: (model, profile) => {
        return {
          model: extend(model, {
            [profile.key]: profile
          })
        }
      }
    },

    run: {
      [FIND_ONE]: ({ index, value }, sources) => {
        const deferred = defer.source()
        api.profiles.findOne(index, value, (err, profile) => {
          if (err) return console.error(err)
          deferred.resolve(pull.values([set(profile)]))
        })
        return deferred
      },
      [PUT]: (nextProfile, sources) => {
        const deferred = defer.source()
        api.profiles.put(nextProfile, (err, profile) => {
          if (err) return console.error(err)
          deferred.resolve(pull.values([set(profile)]))
        })
        return deferred
      }
    }
  })
}
