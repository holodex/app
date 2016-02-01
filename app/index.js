const h = require('vdux/element').default

const Layout = require('app/layout/component')
const urlActions = require('app/url/actions')

const router = require('./router')

module.exports = {
  onCreate,
  render
}

function render ({ props }) {
  const route = router(
    props.url, props
  )

  return h(Layout, {}, [route])
}

function onCreate () {
  if (process.browser) {
    return urlActions.bindUrl()
  }
}
