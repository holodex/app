const knex = require('feathers-knex')
const validate = require('feathers-tcomb')

const db = require('./db')

module.exports = service

function service (collection, options) {
  const name = collection.meta.name.toLowerCase()

  return knex(
    Object.assign({}, options, {
      Model: db,
      name
    })
  ).extend({
    setup: function (app) {
      validate(this, collection.meta.type)
    }
  })
}
