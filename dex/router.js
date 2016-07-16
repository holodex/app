const Router = require('sheet-router')

module.exports = createRouter

function createRouter (dft, routes) {
  return Router(dft, function createRoute (route) {
    return Object.keys(routes).map(path => {
      return route(path, routes[path])
    })
  })
}

