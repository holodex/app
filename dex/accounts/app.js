const { html, pull } = require('inu')
const { Domain, run } = require('inux')

const { SET, set } = require('./actions')

module.exports = Accounts

function Accounts ({ api }) {
  return Domain({
    name: 'accounts',
    init: () => ({ model: {} }),
    update: {
      [SET]: (model, account) => {
        return extend(model, {
          [account.key]: account
        })
      }
    },
    run: {}
  })
}
