module.exports = storage => {

  const fetchTokens = () => {
    const tokens = storage.getItem('tokens')
    const defaults = {
      accessToken: '',
      expiresIn: 0,
      refreshToken: ''
    }

    return tokens ? {...defaults, ...JSON.parse(tokens)} : defaults
  }

  return {
    namespace: 'auth',

    state: fetchTokens(),

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
    }
  }
}
