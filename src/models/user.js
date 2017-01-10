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
    fetch (state, data, send, done) {
      try {
        const userId = getUserIdFromToken(data.accessToken)
        console.log('Fetching user with ID ' + userId)

        http.get(`/user/${userId}`).then(({data}) => {
          send('user:set', data, done)
        }).catch(done)
      } catch (e) {
        console.log('token didn\'t work')
      }
    },
  }
})

function getUserIdFromToken(token) {
  return jwtDecode(token).sub
}
