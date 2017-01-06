const html = require('choo/html')
const textfield = require('./textfield')
const button = require('./button')

module.exports = (state, prev, send, {
  onselected = () => {}
} = {}) => {
  const getAddress = () => {
    send('address:setResults', [])
    send('address:lookup')
  }

  const selectResult = (address) => {
    onselected(address)
    send('address:setResults', [])
  }

  return html`
  <div>
    ${textfield({
      label: 'Postcode',
      oninput: (value) => { send('address:setPostcode', value)},
      value: state.address.postcode
    })}

    ${button({
      onclick: getAddress,
      label: 'Get Address'
    })}

    <ul class="mdl-list">
      ${state.address.results.map(result => html`
      <li class="mdl-list__item">
        <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-icon">location_on</i>
        <a href="" onclick=${e => {
          selectResult(result)
          e.preventDefault()
        }}>${result.line1} ${result.city}</a>
        </span>
      </li>
      `)}
    </ul>
  </div>
  `
}
