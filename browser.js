const pull = require('pull-stream')
const vas = require('vas')
const inu = require('inu')

const app = require('dex/app')
const service = require('dex/service')
const config = require('./config')

const client = vas.connect(service, config, {
  url: config.url
})
const sources = inu.start(app({ api: client }))

const main = document.querySelector('main')

pull(
  sources.actions(),
  pull.drain(console.log.bind(console, 'action'))
)

pull(
  sources.states(),
  pull.drain(console.log.bind(console, 'state'))
)

pull(
  sources.views(),
  pull.drain(view => {
    inu.html.update(main, view)
  })
)
