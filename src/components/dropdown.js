const html = require('choo/html')
const component = require('choo-component')

const closeIfClickedOutside = (elm, close) => e => {
  console.log(elm)
  if (!elm.contains(e.target)) {
    close()
  }
}

const model = ({
  body = document.body
} = {}) => {
  return {
    namespace: 'dropdown',
    state: {
      visible: false,
      items: [],
      listener: () => {}
    },
    reducers: {
      close (instance) {
        return { visible: false }
      },
      toggle (instance) {
        return { visible: !instance.visible }
      },
      storeListener (instance, { listener }) {
        return { listener }
      }
    },
    effects: {
      listen (state, { elm, instanceId }, send, done) {
        console.log(state)
        const sendClose = () => send('dropdown:close', { instanceId }, done)
        const listener = closeIfClickedOutside(elm, sendClose)
        send('dropdown:storeListener', { listener }, done)
        body.addEventListener('click', listener)
      },
      unListen (state, { elm, instanceId }, send, done) {
        const currentInstance = state.instances[instanceId]
        body.removeEventListener('click', currentInstance.listener)
      }
    }
  }
}

const view = ({
  visible,
  items,
  toggle,
  teardown,
  unListen,
  listen
} = {}) => {
  const onload = elm => {
    listen({ elm })
  }
  const onunload = (elm) => {
    unListen({ elm })
    // teardown()
  }

  return html`
    <div class="dropdown" onload=${onload} onunload=${onunload}>
      <button id="demo-menu-lower-left"
              class="mdl-button mdl-js-button mdl-button--icon"
              onclick=${toggle}
              >
        <i class="material-icons">more_vert</i>
      </button>

      <div class="mdl-menu__container ${visible ? 'is-visible' : ''}" style="">
        <ul class="dropdown-menu mdl-card mdl-shadow--2dp" for="demo-menu-lower-left">
          ${items.map(item => html`${item}`)}
        </ul>
      </div>
    </div>
  `
}

module.exports = component({
  model: model(),
  view: view
})