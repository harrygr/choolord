const http = require('axios')
const qs = require('qs')
const validate = require('validate.js')

const constraints = () => ({
  email: {presence: true, email: true},
  password: {presence: true, length: {min: 6}}
})

const initErrors = () => ({email: [], password: []})
const initForm = () => ({email: '', password: ''})

module.exports = () => ({
  namespace: 'login',

  state: {
    form: initForm(),
    errors: initErrors(),
    valid: true
  },

  reducers: {
    setField: (state, {key, value}) => {
      return {form: {...state.form, [key]: value}}
    },
    setErrors: (_, errors) => ({errors: {...initErrors(), ...errors}}),

    reset: () => ({form: initForm()}),

    validate: (state) => {
      const validator = validate(state.form, constraints())
      if (validator) {
        return {errors: {...initErrors(), ...validator}, valid: false}
      }
      return {errors: initErrors(), valid: true}
    }
  },

  effects: {
    getToken (state, _, send, done) {
      const cb = () => {
        if (!state.login.valid) {
          return
        }

        const payload = qs.stringify({
          grant_type: 'password',
          username: state.login.form.email,
          password: state.login.form.password
        })

        http.post('http://localhost:8000/api/oauth/token', payload).then(response => {
          send('auth:store', {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in
          }, done)

          send('login:reset', null, done)
          send('alert:growl', 'Welcome back!', done)
          send('location:set', '/', done)
        }).catch(err => {
          send('alert:growl', 'Login Failed!', done)
          done(err)
        })
      }

      send('login:validate', null, cb)
    }
  }
})