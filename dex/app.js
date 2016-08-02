const { html } = require('inu')
const { App } = require('inux')
const log = require('inu-log')

const Accounts = require('dex/accounts/app')
const User = require('dex/user/app')
const Landing = require('dex/landing/app')
const Dashboard = require('dex/dashboard/app')
const Profiles = require('dex/profiles/app')
const RelationshipTypes = require('dex/relationshipTypes/app')
const Relationships = require('dex/relationships/app')

module.exports = Dex

function Dex ({ api }) {
  return log(App([
    Accounts({ api }),
    User({ api }),
    Landing({ api }),
    Dashboard({ api }),
    Profiles({ api }),
    RelationshipTypes({ api }),
    Relationships({ api }),
    {
      routes: [
        ['404', (params, model, dispatch) => {
          return html`<div>page not found</div>`
        }]
      ]
    }
  ]))
}
