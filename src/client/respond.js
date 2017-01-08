const respond = (endpoints, url, payload = null) => {
  const handler = matchUrl(endpoints, url)

  return handler ? handler(payload) : Promise.reject('Not Found')
}

const matchUrl = (endpoints, url) => {
  if (endpoints[url]) {
    return endpoints[url]
  }

  console.log(`matching ${url} in`, endpoints)
  const matches = Object.keys(endpoints).filter(endpoint => {
    return new RegExp(endpoint).test(url)
  })

  console.log('Match result: ', matches)

  return matches.length ? endpoints[matches[0]] : false
}

module.exports = respond
