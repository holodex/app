const extend = require('xtend')
const { html } = require('inu')
const { combineApps } = require('inux')
const { parse: parseUrl } = require('url')

const { RUN } = require('dex/run')
const href = require('dex/href')
const createRouter = require('dex/util/createRouter')
const combineRoutes = require('dex/util/combineRoutes')
const Account = require('dex/accounts/app')

module.exports = App

function App ({ api }) {
  const account = Account({ api })

  const apps = {
    account
  }

  const app = combineApps(
    extend(apps, { href })
  )

  const router = createRouter('404',
    combineRoutes(apps).concat([
      ['404', (params, model, dispatch) => {
        return html`<div>page not found</div>`
      }]
    ])    
  )

  return extend(app, {
    update: (model, action) => {
      if (action.type === RUN) {
        return { model, effect: action.payload }
      }
      return app.update(model, action)
    },
    view: (model, dispatch) => {
      return router(model.href, model, dispatch)
    }
  })
}
