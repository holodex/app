const createRouter = require('wayfarer')

const landingRoutes = require('app/landing/routes')
const todosRoutes = require('app/todos/routes')
const fourOhFourRoutes = require('app/four-oh-four/routes')
const profileRoutes = require('app/profile/routes')
const highlightRoutes = require('app/highlights/routes')

const router = createRouter('/')

router.on('/', landingRoutes)
router.on('/todos', todosRoutes)
router.on('/profiles', profileRoutes)
router.on('/highlights', highlightRoutes)
router.on('*', fourOhFourRoutes)

module.exports = router
