module.exports = storage => ({
  namespace: 'auth',

  state: {
    accessToken: '',
    expiresIn: 0,
    refreshToken: ''
  },

  reducers: {
    set (state, tokens) {
      return tokens
    },

    unset (state, tokens) {
      return {
        accessToken: '',
        expiresIn: 0,
        refreshToken: ''
      }
    }
  },

  effects: {
    store (state, tokens, send, done) {
      storage.setItem('tokens', JSON.stringify(tokens))
      send('auth:set', tokens, done)
    },

    unstore (state, data, send, done) {
      storage.removeItem('tokens')
      send('auth:unset', null, done)
    }
  },

  subscriptions: {
    checkAuth (send, done) {
      const tokensJson = storage.getItem('tokens')
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson)
        send('auth:set', tokens, done)
        send('user:fetch', tokens, done)
      }
    }
  }
})
