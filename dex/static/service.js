const fs = require('fs')
const { join } = require('path')
const Route = require('http-routes')
const Static = require('ecstatic')
const bankai = require('bankai')
const browserify = require('browserify')

const service = {
  name: 'static',
  handlers: (server, config) => {
    const html = bankai.html({
      entry: '/bundle.js',
      css: '/bundle.css'
    })
    const css = bankai.css({})
    const js = bankai.js(browserify, config.entry, {})

    const files = Static({
      root: config.staticPath,
      showDir: false,
      handleError: false
    })

    return [
      Route([
        ['bundle.js', pipe(js)],
        ['bundle.css', pipe(css)]
      ]),
      files,
      indexHtml
    ]

    function indexHtml (req, res) {
      fs.exists(join(config.staticPath, 'index.html'), function (exists) {
        if (exists) {
          req.url = '/index.html'
          files(req, res)
        } else {
          html(req, res).pipe(res)
        }
      })
    }
  }
}

function pipe (handler) {
  return (req, res) => {
    handler(req, res).pipe(res)
  }
}

module.exports = service
