const http = require('axios')

module.exports = ({accessToken}) => {
  return http.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    transformResponse: [JSON.parse, extractData]
  })
}

const extractData = response => response.data