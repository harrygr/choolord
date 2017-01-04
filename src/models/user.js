const transport = require('../transport')
const jwtDecode = require('jwt-decode')

const { blankUser } = require('../factories/user')

module.exports = {
  namespace: 'user',

  state: {
    user: blankUser()
  },

  reducers: {
    set (state, user) {
      return {user}
    }
  },

  effects: {
    fetch (state, tokens, send, done) {
      const userId = getUserIdFromToken(tokens.accessToken)

      transport(tokens).get(`/passport/${userId}`).then(({data}) => {
        send('user:set', data, done)
      }).catch(done)
    }
  }
}

function getUserIdFromToken(token) {
  return jwtDecode(token).sub
}