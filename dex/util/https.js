const https = require('https')

module.exports = createHttpsServer

function createHttpsServer (handler, options = {}) {
  const Lex = require('letsencrypt-express')

  if (process.env.NODE_ENV !== 'production') {
    Lex = Lex.testing()
  }

  const host = options.host
  const email = options.email
  const agreeTos = options.agreeTos

  if (!host || !email || !agreeTos) {
    throw new Error('insufficient configuration for letsencrypt')
  }

  const lex = Lex.create({
    configDir: options.path,
    approveRegistration: function (_host, cb) {
      console.log('register cert for ', _host)

      if (_host !== host) {
        return cb(new Error('unexpected hostname: ' + _host))
      }

      cb(null, { domains: [host], email, agreeTos })
    }
  })

  const server = https.createServer(
    lex.httpsOptions,
    Lex.createAcmeResponder(lex, handler)
  )

  return server
}
