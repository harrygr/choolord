const transport = require('../transport')

module.exports = () => ({
  namespace: 'address',

  state: {
    postcode: '',
    address: {},
    results: []
  },

  reducers: {
    setPostcode (state, postcode) {
      return {postcode}
    },

    setResults (state, results) {
      return {results}
    },

    set (state, address) {
      return {address}
    }
  },

  effects: {
    lookup (state, _, send, done) {
      transport(state.auth).get(`/postcodes?postcode=${state.address.postcode}`).then(({data}) => {
        send('address:setResults', data, done)
      }).catch(err => {
        send('alert:growl', 'Address Lookup Failed', done)
        done(err)
      })
    }
  }
})