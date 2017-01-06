const html = require('choo/html')
const {updateInstanceWithId, removeInstanceWithId, getDefaultListeners, getDefaultReducers} = require('./helpers')

const closeIfClickedOutside = (elm, close) => e => {
  if (!elm.contains(e.target)) close()
}

const element = ({
  visible = false,
  items = [],
  setup = () => {},
  teardown = () => {},
  toggle = () => {},
  close = () => {}
} = {}) => {
  const onload = elm => {
    elm.getRootNode().addEventListener('click', closeIfClickedOutside(elm, close))
    setup()
  }

  const onunload = elm => {
    elm.getRootNode().removeEventListener('click', closeIfClickedOutside(elm, close))
    teardown()
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

const emptyDropdown = () => ({
  visible: false
})

const component = (state, prev, send) => (id, {
  props = {items: []},
  initialState = {}
} = {}) => {
  const currentDropdown = state.dropdown.instances[id] ? state.dropdown.instances[id] : emptyDropdown()

  const properties = {
    ...getDefaultListeners('dropdown', send, { id, initialState }),
    visible: currentDropdown.visible,
    items: props.items,
    toggle: () => send('dropdown:toggleVisible', id),
    close: () => send('dropdown:close', id),
  }
  return element(properties)
}

const model = () => ({
  namespace: 'dropdown',
  state: {
    instances: {}
  },
  reducers: {
    ...getDefaultReducers(emptyDropdown),
    close (state, id) {
      return updateInstanceWithId(state.instances, id, {...state.instances[id], visible: false})
    },
    toggleVisible (state, id) {
      return updateInstanceWithId(state.instances, id, {...state.instances[id], visible: !state.instances[id].visible})
    }
  }
})

module.exports = {model, component}