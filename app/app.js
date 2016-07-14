const extend = require('xtend')
const { html } = require('inu')
const { combineApps } = require('inux')

const { SEND } = require('app/send')
const Account = require('app/accounts/app')

module.exports = App

function App ({ api }) {
  const account = Account({ api })

  const app = combineApps({
    account: account
  })

  return extend(app, {
    update: (model, action) => {
      if (action.type === SEND) {
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
