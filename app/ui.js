const inu = require('inu')
const defer = require('pull-defer')
const pull = inu.pull

const ui = function ({ api }) {
  return {
    init: () => ({
      model: {
        user: null,
        agents: {}
      },
      effect: 'init'
    }),
    update: (model, action) => {
      switch (action.type) {
        case 'putAgent':
          const agents = Object.assign({}, model.agents, {
            [action.agent.id]: action.agent
          })
          model = Object.assign({}, model, { agents })
          break
        case 'setUser':
          model = Object.assign({}, model, {
            user: action.agent
          })
          break
      }
      return { model }
    },
    view: (model, dispatch) => {
      return inu.html`
        <main>
          ${
            model.user == null
              ? 'who am i?'
              : model.agents[model.user.id].name
          }
        </main>
      `
    },
    run: (effect, sources) => {
      if (effect !== 'init') return

      const deferred = defer.source()

      api.agents.whoami(function (err, agent) {
        if (err) {
          return deferred.resolve(
            pull.error(err)
          )
        }
        deferred.resolve(pull.values([
          { type: 'putAgent', agent },
          { type: 'setUser', agent }
        ]))
      })

      return deferred
    }
  }
}

module.exports = ui
