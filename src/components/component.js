const getDefaultListeners = (namespace, send, { id, initialState }) => ({
  setup: () => send(`${namespace}:init`, { id, initialState }),
  teardown: () => send(`${namespace}:clear`, id),
})

const getDefaultReducers = (defaultState) => ({
  init (state, { id, initialState = {} }) {
    return update(state.instances, id, {
      ...defaultState(),
      ...initialState
    })
  },

  setProp(state, { id, key, value }) {
    return update(state.instances, id, {
      ...state.instances[id],
      [key]: value
    })
  },

  clear (state, id) {
    return {instances: Object.keys(state).filter(key => key !== id).reduce((curr, prev) => {
      return {...prev, ...state[curr]}
    }, {})}
  }
})

const update = (instances, id, value) => {
  return {instances: {...instances, [id]: value }}
}

const build = (definition) => {
  const component = definition()
  const model = component.model()

  return {
    model: () => ({
      namespace: model.namespace,
      state: {
        ...model.state,
        instances: {}
      },
      reducers: {
        ...model.reducers,
        ...getDefaultReducers(component.defaultState)
      }
    }),
    component: (globalState, prev, send) => (id, { initialState = {}, props = {} } = {}) => {
      const currentInstanceState = globalState[model.namespace].instances[id] ? globalState[model.namespace].instances[id] : component.defaultState()

      return component.view({
        ...getDefaultListeners(model.namespace, send, { id, initialState }),
        ...currentInstanceState,
        ...props,
        ...component.behaviour(send, id)
      })
    }
  }
}

module.exports = { build, update }
