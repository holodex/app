const extend = require('xtend')
const { html } = require('inu')
const { combineApps } = require('inux')
const { parse: parseUrl } = require('url')

const { RUN } = require('dex/run')
const href = require('dex/href')
const createRouter = require('dex/router')
const Account = require('dex/accounts/app')

module.exports = App

function App ({ api }) {
  const account = Account({ api })

  const app = combineApps({
    href,
    account: account
  })

  const router = createRouter('404', {
    'account': (model, dispatch) => {
      return html`
        <main>
          <nav></nav>
          <article></article>
          <div class='account'>
            ${account.views.account(model.account, dispatch)}
          </div>
        </main>
      `
    },
    '404': (model, dispatch) => {
      return html`<div>page not found</div>`
    }
  })

  return extend(app, {
    update: (model, action) => {
      if (action.type === RUN) {
        console.log('effect', action.payload)
        return { model, effect: action.payload }
      }
      return app.update(model, action)
    },
    view: (model, dispatch) => {
      // TODO reselect this
      const pathname = parseUrl(model.href).pathname

      return router(pathname, model)
    }
  })
}
