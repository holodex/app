const { html } = require('inu')
const { run } = require('inux')
const getFormData = require('get-form-data')

const { get, update } = require('../effects')

module.exports = viewAccount

function viewAccount (agent, model, dispatch) {
  const account = model.accounts[agent] || {}
  const { key, email } = account

  return html`
    <section>
      <form onsubmit=${handleSubmit} onload=${handleLoad}>
        <input name='agent' type='hidden' value=${agent} />
        <fieldset>
          <label>email</label>
          <input name='email' type='email' value=${email || ''} />
        </fieldset>
        <fieldset>
          <label>password</label>
          <input name='password' type='password' />
        </fieldset>
        <input type='submit' value='save account' />
      </form>
    </section>
  `

  function handleLoad () {
    dispatch(run(get(agent)))
  }

  function handleSubmit (ev) {
    ev.preventDefault()
    var nextAccount = getFormData(ev.target)
    if (key) nextAccount.key = key
    dispatch(run(update(nextAccount)))
  }
}
