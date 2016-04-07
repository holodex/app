
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('highlights', function(table) {
    table.increments('id')
    table.integer('profileId').references('profiles.id')
    table.string('note')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('highlights')
};
