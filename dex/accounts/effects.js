const { Effect } = require('inux')

const RESTORE = Symbol('restore')
const PERSIST = Symbol('persist')

const LOGIN = Symbol('login')
const LOGOUT = Symbol('logout')
const SIGNUP = Symbol('signup')

const restore = Effect(RESTORE)
const persist = Effect(PERSIST)

const login = Effect(LOGIN)
const logout = Effect(LOGOUT)
const signup = Effect(SIGNUP)

module.exports = {
  RESTORE,
  PERSIST,
  LOGIN,
  LOGOUT,
  SIGNUP,
  restore,
  persist,
  login,
  logout,
  signup
}
