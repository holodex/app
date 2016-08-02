const { html } = require('inu')
const { navigate } = require('inux')

const login = require('dex/user/views/login')
const landing = require('./view')

module.exports = Landing

function Landing ({ api }) {
  return {
    routes: [
      ['', (params, model, dispatch) => {
        if (model.user) {
          process.nextTick(() => {
            dispatch(navigate('dashboard'))
          })
        }

        return landing(model, dispatch)
      }],
      ['login', (params, model, dispatch) => {
        if (model.user) {
          process.nextTick(() => {
            dispatch(navigate('dashboard'))
          })
        }

        return html`
          <main>
            ${login(model, dispatch)}
          </main>
        `
      }]
    ]
  }
}
