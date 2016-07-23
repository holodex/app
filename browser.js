const pull = require('pull-stream')
const connect = require('vas/connect')
const inu = require('inu')

const app = require('dex/app')
const service = require('dex/service')
const config = require('./config')

const client = connect(service, config, {
  url: config.url
})
const sources = inu.start(app({ api: client }))

const main = document.querySelector('main')

pull(
  sources.views(),
  pull.drain(view => {
    inu.html.update(main, view)
  })
)
