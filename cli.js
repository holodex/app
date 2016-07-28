#!/usr/bin/env node

const http = require('http')
const vas = require('vas')
const level = require('level-party')
const sub = require('subleveldown')
const Tickets = require('ticket-auth')

const service = require('dex/service')
const createServer = require('dex/server')
const config = require('./config')

config.db = level(config.dbPath)
const ticketsDb = sub(config.db, 'tickets', { valueEncoding: 'json' })
const tickets = config.tickets = Tickets(ticketsDb)

const server = http.createServer(createServer(config))

vas.command(service, config, {
  port: config.port,
  url: config.url,
  server,
  getId: function (ws, cb) {
    tickets.check(ws.headers.cookie, function (err, id) {
      if (err) console.error(err)
      cb(null, id)
    })
  }
}, process.argv)
