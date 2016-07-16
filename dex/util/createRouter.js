const Router = require('sheet-router')

module.exports = createRouter

function createRouter (dft, routes) {
  return Router(dft, function createRoutes (route) {
    return routes.map(([path, handler, children]) => {
      const childRoutes = children ? createRoutes(children) : null
      return route(path, handler, childRoutes)
    })
  })
}

