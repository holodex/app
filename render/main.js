const http = require('http')
const Url = require('url')
const vdux = require('vdux/string').default
const h = require('vdux/element').default
const sendHtml = require('send-data/html')
const sendError = require('send-data/error')

const reducer = require('app/reducer')
const middleware = require('app/middleware')
const App = require('app')

module.exports = {
  createServer
}

function createServer (config) {
  const staticUrl = Url.format(config.static.url)

  const inject = config.render.livereload ?
    require('inject-lr-script') : (res) => res

  return http.createServer((req, res) => {
    return handler(req, inject(res))
  })

  function handler (req, res) {
    vdux({
      reducer,
      middleware,
      initialState: {
        url: req.url
      },
      app: (state) => h(App, state)
    })
    .then(({ html, vtree, state }) => {
      const page = renderPage(html, state)
      sendHtml(req, res, page)
    })
    .catch((err) => {
      console.error(err.stack)
      sendError(req, res, { body: err })
    })
  }

  function renderPage (innerHtml, state) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Mad Science Stack</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <main>${ innerHtml }</main>
          <script>
            window.__state = ${ JSON.stringify(state) }
          </script>
          <script src="${Url.resolve(staticUrl, 'bundle.js')}"></script>
        </body>
      </html>
    `
  }
}
