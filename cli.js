#!/usr/bin/env node

const http = require('http')
const vas = require('vas')
const level = require('level-party')
const sub = require('subleveldown')
const Tickets = require('ticket-auth')
const Stack = require('stack')

const service = require('dex/service')
const config = require('./config')
const https = require('dex/util/https')

config.db = level(config.dbPath)
const ticketsDb = sub(config.db, 'tickets', { valueEncoding: 'json' })
const tickets = config.tickets = Tickets(ticketsDb)

vas.command(service, config, {
  port: config.port,
  url: config.url,
  createHttpServer: config.letsencrypt ? createHttpServer : undefined
}, process.argv)

function createHttpServer (handlers, config) {
  return https(Stack(...handlers), config.letsencrypt)
}
