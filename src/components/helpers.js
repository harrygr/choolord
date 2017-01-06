const updateInstanceWithId = (instances, id, value) => {
  return {instances: {...instances, [id]: value }}
}

const removeInstanceWithId = (instances, id) => {
  return {instances: Object.keys(instances).filter(key => key !== id).reduce((curr, prev) => {
    return {...prev, ...instances[curr]}
  }, {})}
}

const getDefaultListeners = (namespace, send, { id, initialState }) => ({
  setup: () => send(`${namespace}:init`, { id, initialState }),
  teardown: () => send(`${namespace}:clear`, id),
})

const getDefaultReducers = (defaultState) => ({
  init (state, { id, initialState = {} }) {
    return updateInstanceWithId(state.instances, id, {
      ...defaultState(),
      ...initialState
    })
  },

  clear: removeInstanceWithId,
})

module.exports = {updateInstanceWithId, removeInstanceWithId, getDefaultListeners, getDefaultReducers}