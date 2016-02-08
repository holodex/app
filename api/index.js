const http = require('http')
const cors = require('cors')
const feathers = require('feathers')
const hooks = require('feathers-hooks')
const primus = require('feathers-primus')
const join = require('path').join

const todosService = require('app/todos/service')

module.exports = {
  createServer
}

function createServer (config) {
  const app = feathers()
    .use(cors())
    .configure(hooks())
    .configure(primus({
      transformer: 'websockets'
    }, (primus) => {
      primus.save(join(__dirname, 'primus.js'))
      primus.authorize((req, done) => {
        done()
      })
    }))
    .use('/todos', todosService)

  const server = http.createServer(app)

  app.setup(server)

  return server
}
