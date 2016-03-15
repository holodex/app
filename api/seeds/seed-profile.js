
exports.seed = function (knex) {
  return knex('highlights').del()
          .then(knex('profiles').del())
          .then(() => {
            return knex.insert({name: 'Jane', note: 'Loves... things', image: '../profile.jpg'})
                       .insert({name: 'John', note: 'Hates stuff', image: '../john.jpg'})
                       .into('profiles')
          })
          .then(() => {
            return knex.insert({profileId: 1, note: 'Jane won a prize'})
                       .into('highlights')
          })
}
