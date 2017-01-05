const html = require('choo/html')

module.exports = content => {
  return html`
    <div class="mdl-card mdl-shadow--2dp page-section">
      <div class="mdl-card__supporting-text" style="overflow: visible;">${content}</div>
    </div>
  `
}