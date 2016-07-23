const { html } = require('inu')
const { App } = require('inux')

const Account = require('dex/accounts/app')
const Profiles = require('dex/profiles/app')
const Dashboard = require('dex/dashboard/app')
const Landing = require('dex/landing/app')

module.exports = Dex

function Dex ({ api }) {
  return App([
    Account({ api }),
    Profiles({ api }),
    Dashboard({ api }),
    Landing({ api }),
    {
      routes: [
        ['404', (params, model, dispatch) => {
          return html`<div>page not found</div>`
        }]
      ]
    }
  ])
}
