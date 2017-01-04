const http = require('axios')
const qs = require('qs')

module.exports = {
  namespace: 'login',
  state: {
    email: 'harry@goodlord.co',
    password: 'password'
  },
  reducers: {
    setField: (_, {key, value}) => ({[key]: value})
  },
  effects: {
    getToken (state, data, send, done) {
      const payload = qs.stringify({
        grant_type: 'password',
        username: state.email,
        password: state.password
      })

      http.post('http://localhost:8000/api/oauth/token', payload).then(response => {
        send('auth:store', {
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
          expiresIn: response.data.expires_in
        }, done)

        send('location:set', '/', done)
      }).catch(done)
    }
  }
}