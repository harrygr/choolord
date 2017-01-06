const transport = require('../transport')
const jwtDecode = require('jwt-decode')

const { blankUser } = require('../factories/user')

module.exports = () => ({
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
    fetchIfRequired (state, _, send, done) {
      if (state.auth.accessToken && !state.user.user.id) {
        send('user:fetch', null, done)
      }
    },

    fetch (state, _, send, done) {
      const userId = getUserIdFromToken(state.auth.accessToken)

      transport(state.auth).get(`/passport/${userId}`).then(({data}) => {
        send('user:set', data, done)
      }).catch(done)
    }
  }
})

function getUserIdFromToken(token) {
  return jwtDecode(token).sub
}