const { Effect } = require('inux')

const WHOAMI = Symbol('whoami')
const LOGIN = Symbol('login')
const LOGOUT = Symbol('logout')
const SIGNUP = Symbol('signup')

const whoami = Effect(WHOAMI)
const login = Effect(LOGIN)
const logout = Effect(LOGOUT)
const signup = Effect(SIGNUP)

module.exports = {
  WHOAMI,
  LOGIN,
  LOGOUT,
  SIGNUP,
  whoami,
  login,
  logout,
  signup
}
