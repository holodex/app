const t = require('tcomb')

const Profile = t.struct({
  name: t.String,
  note: t.String,
  image: t.String,
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
