module.exports = (payload) => {
  return Promise.resolve({data: [
    {
      city: 'London',
      country: 'GB',
      line1: '10 Downing Street',
      postcode: 'SW1A 1AA'
    }, {
      city: 'Washington DC',
      country: 'US',
      line1: 'The White House',
      postcode: '99577'
    }
  ]})
}
