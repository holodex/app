const { html } = require('inu')
const { run } = require('inux')

const { get } = require('../effects')

module.exports = viewAccount

function viewAccount (user, model, dispatch) {
  const account = model.accounts[user] || {}

  return html`
    <div onload=${handleLoad}>
      <h1>hello ${account.email}</h1>
    </div>
  `

  function handleLoad () {
    if (!user) return
    dispatch(run(get(user)))
  }
}
