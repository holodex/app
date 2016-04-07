
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('profiles', function(table) {
      table.increments('id')
      table.string('name')
      table.string('note')
      table.string('image')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('profiles')
};
