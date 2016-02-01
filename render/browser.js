const vdux = require('vdux/dom').default
const h = require('vdux/element').default

const { replace } = vdux({
  reducer: require('app/reducer'),
  middleware: require('app/middleware'),
  initialState: window.__state,
  app: (state) => h(require('app'), state),
  node: document.querySelector('main')
})

if (module.hot) {
  module.hot.accept(
    ['app', 'app/reducer'],
    () => replace(
      (state) => h(require('app'), state),
      require('app/reducer')
    )
  )
}
