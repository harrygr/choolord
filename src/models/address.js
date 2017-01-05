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
    lookup (state, {tokens, postcode}, send, done) {
      transport(tokens).get(`/postcodes?postcode=${postcode}`).then(({data}) => {
        console.log(data)
        send('address:setResults', data, done)
      }).catch(err => {
        send('alert:growl', 'Address Lookup Failed', done)
        done(err)
      })
    }
  }
})