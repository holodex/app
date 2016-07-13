const pull = require('pull-stream')
const vas = require('vas')
const inu = require('inu')

const ui = require('app/ui')
const service = require('app/service')
const config = require('./config')

const api = vas.connect(service, config, {
  url: config.url
})
console.log('api', api)
const sources = inu.start(ui({ api }))

const main = document.querySelector('main')

pull(
  sources.views(),
  pull.drain(view => {
    console.log('view', view)
    inu.html.update(main, view)
  })
)
