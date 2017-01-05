const html = require('choo/html')


module.exports = ({
  type = 'text',
  label = '',
  id = '',
  errors = [],
  value = '',
  oninput = () => {}
}) => {
  const renderErrors = errors => {
    return html`<span class="mdl-textfield__error">${errors.map(error => html`<span>${error}<br></span>`)}</span>`
  }

  return html`
  <div
    class="mdl-textfield
           mdl-textfield--floating-label
           ${errors.length ? 'is-invalid' : ''}
           ${value ? 'is-dirty' : ''}"
    style="width:100%;"
  >
    <input
      class="mdl-textfield__input"
      value=${value}
      type=${type}
      id=${id}
      oninput=${e => oninput(e.target.value)}
      autocomplete="false"
    />
    <label
      class="mdl-textfield__label"
      for=${id}
    >
      ${label}
    </label>
    ${errors.length ? renderErrors(errors) : ''}
  </div>
  `
}
