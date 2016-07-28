const { html } = require('inu')
const { run } = require('inux')

const { logout } = require('../effects')

module.exports = viewLogout

function viewLogout (model, dispatch) {
  return html`
    <button onclick=${handleLogout}>logout</button>
  `

  function handleLogout () {
    dispatch(run(logout()))
  }
}
