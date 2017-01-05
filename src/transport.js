const http = require('axios')

const extractData = response => response.data

module.exports = ({accessToken}) => {
  return http.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    transformResponse: [JSON.parse, extractData]
  })
}
