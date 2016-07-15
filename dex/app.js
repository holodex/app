const extend = require('xtend')
const { html } = require('inu')
const { combineApps } = require('inux')

const { RUN } = require('dex/run')
const Account = require('dex/accounts/app')

module.exports = App

function App ({ api }) {
  const account = Account({ api })

  const app = combineApps({
    account: account
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
      return html`
        <main>
          <nav></nav>
          <article></article>
          <div class='account'>
            ${account.views.account(model.account, dispatch)}
          </div>
        </main>
      `
    }
  })
}
