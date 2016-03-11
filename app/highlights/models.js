const t = require('tcomb')

const NonEmptyString = t.refinement(t.String, (s) => s.length > 0, 'NonEmptyString')

const Highlight = t.struct({
  profileId: t.Number,
  note: NonEmptyString
}, 'Highlight')

const Highlights = t.list(Highlight, 'Highlights')

module.exports = {
  Highlight, Highlights
}
