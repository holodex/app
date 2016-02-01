const t = require('tcomb')

const Todo = t.struct({
  id: t.Number,
  text: t.String,
  complete: t.Boolean
}, 'Todo')

const Todos = t.list(Todo, 'Todos')

module.exports = {
  Todo, Todos
}
