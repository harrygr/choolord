const { assert, expect } = require('chai')

const respond = require('../src/client/respond')

describe('The responder', function () {
  const endpoints = {
    'normal/handler': () => 'Normal handler',
    'regex\/[0-9]+': () => 'Regex handler'
  }

  it('matches a normal url', function () {
    expect(respond(endpoints, 'normal/handler')).to.equal('Normal handler')
  })

  it('matches a regex url', function () {
    expect(respond(endpoints, 'regex/4')).to.equal('Regex handler')
  })

  it('handles a not found endpoint', function (done) {
    const response = respond(endpoints, 'non-matching')

    response.catch(err => {
      expect(err).to.equal('Not Found')
      done()
    }).catch(done)
  })
})
