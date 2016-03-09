const t = require('tcomb')

const NonEmptyString = t.refinement(t.String, (s) => s.length > 0, 'NonEmptyString')

const Profile = t.struct({
  name: NonEmptyString,
  note: NonEmptyString,
  image: t.String
  /*
  hasMany Highlights
hasMany Links
hasMany Tags
hasMany Contacts
*/
}, 'Profile')

const Profiles = t.list(Profile, 'Profiles')

module.exports = {
  Profile, Profiles
}
