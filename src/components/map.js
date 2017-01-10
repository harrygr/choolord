const leaflet = require('leaflet')
const html = require('choo/html')
const widget = require('cache-element/widget')

module.exports = () => {
  let map

  return widget({
    render: (coords) => {
      console.log('render')
      return html`
        <div>
          <div onload=${(el) => initMap(el, coords)} onunload=${removeMap}
            style="height: 500px"></div>
        </div>
      `
    },
    onupdate: (el, coords) => {
      console.log('update')
      if (map) map.setView(coords)
    }
  })

  function initMap (el, coords) {
    console.log('initMap', el)
    const defaultZoom = 12
    map = leaflet.map(el).setView(coords, defaultZoom)

    leaflet.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(map)
  }

  function removeMap (el) {
    console.log('remove')
    if (map) {
      map.remove()
      map = null
    }
  }
}
