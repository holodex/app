
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('profiles', function(table) {
      table.increments('id')
      table.string('name')
      table.string('note')
      table.string('image')
  })
  .then(function() {
    return knex.insert({name:'Jane', note: 'Loves... things', image: '../profile.jpg'})
               .insert({name:'John', note: 'Hates stuff', image: '../john.jpg'})
               .into('profiles')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('todos')
};
