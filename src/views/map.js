const html = require('choo/html')
const map = require('../components/map')

module.exports = (state, prev, send) => {
  const mapInstance = map()



  function toPhiladelphia () {
    send('map:setCoords', [39.9526, -75.1652])
  }
  function toSeattle () {
    send('map:setCoords', [47.6062, -122.3321])
  }

  return html`
  <article>
    <h1>${state.map.title}</h1>

    <button onclick=${toPhiladelphia}>Philadelphia</button>
    <button onclick=${toSeattle}>Seattle</button>
    ${mapInstance(state.map.coords)}
  </article>
  `
}