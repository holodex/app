const pull = require('pull-stream')
const vas = require('vas')
const inu = require('inu')

const app = require('app/app')
const service = require('app/service')
const config = require('./config')

const client = vas.connect(service, config, {
  url: config.url
})
const sources = inu.start(app({ api: client }))

const main = document.querySelector('main')

pull(
  sources.models(),
  pull.log()
)

pull(
  sources.views(),
  pull.drain(view => {
    inu.html.update(main, view)
  })
)
