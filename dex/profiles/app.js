const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const extend = require('xtend')

const { FIND_ONE, PUT } = require('./effects')
const { SET, set } = require('./actions')

module.exports = Profiles

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
        return pullAsync(cb => {
          api.profiles.findOne(index, value, (err, profile) => {
            if (err) return console.error(err)
            cb(null, set(profile))
          })
        })
      },
      [PUT]: (nextProfile, sources) => {
        return pullAsync(cb => {
          api.profiles.put(nextProfile, (err, profile) => {
            if (err) return console.error(err)
            cb(null, set(profile))
          })
        })
      }
    }
  })
}
