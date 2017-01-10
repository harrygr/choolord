// const transport = require('../transport')
const jwtDecode = require('jwt-decode')
const http = require('../client')

const { blankUser } = require('../factories/user')

module.exports = () => ({
  namespace: 'user',

  state: {
    user: blankUser(),
    token: null
  },

  reducers: {
    set (state, user) {
      return {user}
    },
    setToken (state, token) {
      return {token}
    },
    doSomething(state, data) {
      return state
    }
  },

  effects: {
    fetchIfRequired (state, _, send, done) {
      const cb = (_data, globalState) => {
        const userId = getUserIdFromToken(globalState.auth.accessToken)

        console.log('Fetching user with ID ' + userId)

        http.get(`/user/${userId}`).then(({data}) => {
          send('user:set', data, done)
        }).catch(done)
      }

      if (!state.user.id) {
        send('user:doSomething', 'foo', cb)
      }
    },
  }
})

function getUserIdFromToken(token) {
  return jwtDecode(token).sub
}
