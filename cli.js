#!/usr/bin/env node

const vas = require('vas')

const service = require('dex/service')
const config = require('./config')

vas.command(service, config, {
  port: config.port,
  url: config.url,
}, process.argv)
