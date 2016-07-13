const { html } = require('inu')
const { reduceUpdates, runMany } = require('inu-action')
const multi = require('inu-multi')

const Account = require('app/accounts/app')

module.exports = App

function App ({ api }) {
  const account = Account({ api })

  return multi({
    init: () => ({
      model: {
        account: account.init()
      },
    }),
    update: reduceUpdates([
      (model, action) => {
        if (action.type === 'do')
          return { model, effect: action.effect }
        return { model }
      },
      account.update
    ]),
    view: (model, dispatch) => {
      return html`
        <main>
          <nav></nav>
          <article></article>
          <div class='account'>
            ${account.view(model, dispatch)}
          </div>
        </main>
      `
    },
    run: runMany([
      account.run
    ])
  })
}
