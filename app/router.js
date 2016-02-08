const createRouter = require('sheet-router')

const landingRoutes = require('app/landing/routes')
const todosRoutes = require('app/todos/routes')
const fourOhFourRoutes = require('app/four-oh-four/routes')

const router = createRouter('/404', function (route) {
  return [
    landingRoutes(route),
    todosRoutes(route),
    fourOhFourRoutes(route)
  ]
})

module.exports = router
