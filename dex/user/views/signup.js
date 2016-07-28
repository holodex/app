const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { signup } = require('../effects')

module.exports = viewSignup

function viewSignup (model, dispatch) {
  return html`
    <form onsubmit=${handleSignup}>
      <fieldset>
        <label>email</label>
        <input name='email' type='email' autofocus />
      </fieldset>
      <input type='submit' value='signup' />
    </form>
  `

  function handleSignup (ev) {
    ev.preventDefault()
    const data = getFormData(ev.target)
    dispatch(run(signup(data.email)))
  }
}
