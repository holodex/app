const vdux = require('vdux').default
const client = require('vdux-preset-client').default

const createStore = require('app/store')
const app = require('app')

const store = createStore(client)

vdux(store, app, document.body)
