const createRouter = require('wayfarer')

const landingRoutes = require('app/landing/routes')
const todosRoutes = require('app/todos/routes')
const fourOhFourRoutes = require('app/four-oh-four/routes')

const router = createRouter('/')

router.on('/', landingRoutes)
router.on('/todos', todosRoutes)
router.on('*', fourOhFourRoutes)

module.exports = router
