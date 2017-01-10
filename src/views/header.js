const html = require('choo/html')
const authBar = require('../components/auth')

module.exports = (state, prev, send) => {

return html`
 <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">

      <div class="mdl-layout-spacer"></div>

      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/">Home</a>
        <a class="mdl-navigation__link" href="/widgets">Widgets</a>
        <a class="mdl-navigation__link" href="/map">Map</a>
        <a class="mdl-navigation__link" href="/profile">Profile</a>
        ${authBar(state, prev, send)}
      </nav>
    </div>

    <div class="mdl-layout--large-screen-only mdl-layout__header-row" style="height:auto;">
      <h3>Choolord</h3>
    </div>
  </header>
`

// `<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-shadow--4dp mdl-color--accent" id="add" data-upgraded=",MaterialButton,MaterialRipple">
//   <i class="material-icons" role="presentation">add</i>
//   <span class="visuallyhidden">Add</span>
//   <span class="mdl-button__ripple-container"><span class="mdl-ripple is-animating" style="width: 160.392px; height: 160.392px; transform: translate(-50%, -50%) translate(28px, 34px);"></span></span>
// </button>`
}
