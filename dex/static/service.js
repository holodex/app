const wzrd = require('wzrd')

const service = {
  name: 'static',
  handlers: (server, config) => {
    return [
      wzrd.static({
        entries: [{
          from: config.entry,
          to: 'bundle.js'
        }],
        browserifyArgs: ['--debug'],
        pushstate: true,
        path: config.staticPath
      })
    ]
  }
}

module.exports = service
