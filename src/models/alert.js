
module.exports = () => ({
  namespace: 'alert',

  state: {
    message: ''
  },

  reducers: {
    set (state, message) {
      return {message}
    }
  },

  effects: {
    growl (state, message, send, done) {
      console.log('We growled with ' + message)
      send('alert:set', message, done)
      setTimeout(() => {
        send('alert:set', '', done)
      }, 3000)
    }
  }
})