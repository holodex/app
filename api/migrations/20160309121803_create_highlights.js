
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('highlights', function(table) {
    table.increments('id')
    table.integer('profileId').references('profiles.id')
    table.string('note')
  })
  .then(function() {
    return knex.insert({profileId: 1, note: 'Jane won a prize'})
               .into('highlights')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('highlights')
};
