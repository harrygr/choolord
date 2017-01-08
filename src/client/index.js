const respond = require('./respond')

const post = (url, payload) => {
  const endpoints = {
    '/oauth/token': require('./token')
  }

  return respond(endpoints, url, payload)
}

const get = (url, payload) => {
  const endpoints = {
    '\/user\/([A-z]+)?:?([0-9]+)?': require('./user'),
    '\/postcodes\?postcode=[A-z0-9\s]+': require('./addresses')
  }

  return respond(endpoints, url, payload)
}

module.exports = {get, post}
