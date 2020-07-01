import Vuex from 'vuex'

export default () => new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    updateCount (state, num) {
      state.count = num
    }
  }
})
