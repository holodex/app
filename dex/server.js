const Stack = require('stack')
const Route = require('tiny-route')
const wzrd = require('wzrd')

module.exports = createServer

function createServer (config) {
  return Stack(
    // redeem a user ticket at /redeem/<ticket>
    Route.get(/^\/redeem\/([0-9a-f]+)/, function (req, res, next) {
      config.tickets.redeem(req.params[0], function (err, cookie) {
        if(err) return next(err)
        // ticket is redeemed! set it as a cookie, 
        res.setHeader('Set-Cookie', cookie)
        res.setHeader('Location', '/') // redirect to the login page.
        res.statusCode = 303
        res.end()
      })
    }),
    Route.get(/^\/logout/, function (req, res, next) {
      res.setHeader('Set-Cookie', 'cookie=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;')
      res.setHeader('Location', '/') // redirect to the login page.
      res.statusCode = 303
      res.end()
    }),
    // check cookies, and authorize this connection (or not)
    function (req, res, next) {
      config.tickets.check(req.headers.cookie, function (err, id) {
        req.id = id; next()
      })
    },
    // return list of the current access rights. (for debugging)
    Route.get(/^\/whoami/, function (req, res, next) {
      res.end(JSON.stringify(req.id)+'\n')
    }),
    wzrd.static({
      entries: [{
        from: config.entry,
        to: 'bundle.js'
      }],
      browserifyArgs: ['--debug'],
      pushstate: true,
      path: config.staticPath
    })
  )
}
