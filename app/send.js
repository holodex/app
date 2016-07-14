const { create } = require('inux')

const SEND = Symbol('send')

const send = create(SEND)

module.exports = {
  SEND,
  send
}
