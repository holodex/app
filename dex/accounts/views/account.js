const { html } = require('inu')
const { run } = require('inux')

const { get } = require('../effects')
const logout = require('dex/user/views/logout')

module.exports = viewAccount

function viewAccount (user, model, dispatch) {
  const account = model.accounts[user] || {}

  return html`
    <div onload=${handleLoad}>
      ${logout(user, model, dispatch)}
      <h1>hello ${account.email}</h1>
    </div>
  `

  function handleLoad () {
    dispatch(run(get(user)))
  }
}
