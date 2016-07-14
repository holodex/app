const extend = require('xtend')
const { html } = require('inu')
const { combineApps } = require('inu-action')

const Account = require('app/accounts/app')

module.exports = App

function App ({ api }) {
  const account = Account({ api })

  const app = combineApps({
    account: account
  })

  return extend(app, {
    update: (model, action) => {
      if (action.type === 'do') {
        return { model, effect: action.effect }
      }
      return app.update(model, action)
    },
    view: (model, dispatch) => {
      return html`
        <main>
          <nav></nav>
          <article></article>
          <div class='account'>
            ${account.view(model.account, dispatch)}
          </div>
        </main>
      `
    },
  })
}
