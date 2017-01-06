const html = require('choo/html')

module.exports = ({
  disabled = false,
  divider = false,
  content = ''
} = {}) => {
  return html`
  <li
    disabled=${disabled}
    class="mdl-menu__item mdl-js-ripple-effect ${divider ? 'mdl-menu__item--full-bleed-divider' : null}"
    tabindex="-1"
    >
    ${content}
  </li>
  `
}