const { Effect } = require('inux')

const GET = Symbol('get')

const get = Effect(GET)

module.exports = {
  GET,
  get
}
