const { html } = require('inu')
const { App } = require('inux')

const Account = require('dex/accounts/app')

module.exports = Dex

function Dex ({ api }) {
  return App([
    Account({ api }),
    {
      routes: [
        ['404', (params, model, dispatch) => {
          return html`<div>page not found</div>`
        }]
      ]
    }
  ])
}
