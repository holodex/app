const { Effect } = require('inux')

const GET = Symbol('get')
const UPDATE = Symbol('update')

const get = Effect(GET)
const update = Effect(UPDATE)

module.exports = {
  GET,
  get,
  UPDATE,
  update
}
