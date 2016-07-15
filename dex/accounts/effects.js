const { create } = require('inux')

const RESTORE = Symbol('restore')
const PERSIST = Symbol('persist')

const LOGIN = Symbol('login')
const LOGOUT = Symbol('logout')
const SIGNUP = Symbol('signup')

const restore = create(RESTORE)
const persist = create(PERSIST)

const login = create(LOGIN)
const logout = create(LOGOUT)
const signup = create(SIGNUP)

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
