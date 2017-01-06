const html = require('choo/html')
const button = require('./button')
const {updateInstanceWithId, removeInstanceWithId, getDefaultReducers} = require('./helpers')

const element = ({
  count = 0,
  hovered = false,
  setup = () => {},
  teardown = () => {},
  onincr = () => {},
  onmouseenter = () => { console.log('the mouse entered!') },
  onmouseout = () => { console.log('the mouse left!') },
}) => {
  return html`
  <div onunload=${teardown} onload=${setup}>
    ${button({
      onclick: onincr,
      label: 'Increment'
    })}
    <span onmouseenter=${onmouseenter} onmouseout=${onmouseout}>${count}</span>

    ${hovered ? html`<span>This is toggled</span>` : ''}
  </div>
  `
}

const component = (state, prev, send) => (id, {initialState = {}} = {}) => {
  const currentCounter = state.counter.instances[id] ? state.counter.instances[id] : emptyCounter()

  return element({
    ...currentCounter,
    setup () {
      send('counter:init', { id, initialState })
    },
    teardown () {
      send('counter:clear', id)
    },
    onincr () {
      send('counter:increment', id)
    },
    onmouseenter () {
      send('counter:setProp', {id, key: 'hovered', value: true})
    },
    onmouseout () {
      send('counter:setProp', {id, key: 'hovered', value: false})
    }
  })
}

const emptyCounter = () => ({
  count: 0,
  hovered: false
})

const model = () => ({
  namespace: 'counter',
  state: {
    instances: {}
  },
  reducers: {
    ...getDefaultReducers(emptyCounter),
    set (state, { id, count }) {
      return updateInstanceWithId(state.instances, id, {
        ...state.instances[id],
        count
      })
    },
    increment (state, id) {
      const prev = state.instances[id].count

      return updateInstanceWithId(state.instances, id, {
        ...state.instances[id],
        count: prev + 1
      })
    },
    setProp(state, { id, key, value }) {
      return updateInstanceWithId(state.instances, id, {
        ...state.instances[id],
        [key]: value
      })
    }
  }
})

module.exports  = { element, component, model }