const extend = require('xtend')
const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')

const { SET, set } = require('./actions')
const { GET, UPDATE, get, update } = require('./effects')

module.exports = Accounts

function Accounts ({ api }) {
  return Domain({
    name: 'accounts',
    init: () => ({ model: {} }),
    update: {
      [SET]: (model, account) => {
        return {
          model: extend(model, {
            [account.key]: account
          })
        }
      }
    },
    run: {
      [GET]: (key) => {
        return pullAsync(cb => {
          return api.accounts.get(key, (err, account) => {
            if (err) return console.error(err)
            return cb(null, set(account))
          })
        })
      },
      [UPDATE]: (nextAccount) => {
        return pullAsync(cb => {
          return api.accounts.update(nextAccount, (err, account) => {
            if (err) return console.error(err)
            return cb(null, set(account))
          })
        })
      }
    }
  })
}
