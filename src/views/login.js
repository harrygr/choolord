const html = require('choo/html')

module.exports = (state, _prev, send) => {
    const onSubmit = e => {
      send('login:getToken')
      e.preventDefault()
    }


    return html`
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
      <h1 class="mdc-typography--display1">Login</h1>
        <form onsubmit=${onSubmit} novalidate>
          <div>
          <br>
          <div class="mdc-textfield mdc-textfield--fullwidth mdc-textfield--upgraded">
            <input class="mdc-textfield__input" value=${state.login.email} type="email" id="link-title" oninput=${e => send('login:setField', {key: 'email', value: e.target.value})} />
            <label class="mdc-textfield__label mdc-textfield__label--float-above" for="link-title">Email</label>
          </div>

          </div>
          <div>
          <br>
          <div class="mdc-textfield mdc-textfield--fullwidth mdc-textfield--upgraded">
            <input class="mdc-textfield__input" type="text" value=${state.login.password} id="link-url" oninput=${e => send('login:setField', {key: 'password', value: e.target.value})} />
            <label class="mdc-textfield__label mdc-textfield__label--float-above" for="link-url">Password</label>
          </div>

          </div>
          <button class="mdc-button mdc-js-button mdc-button--raised mdc-js-ripple-effect mdc-button--accent" type="submit">Login</button>
        </form>
      </div>
    </div>
    `
}