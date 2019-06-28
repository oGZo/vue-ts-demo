import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'

interface CounterState {
  count: number
}

Vue.use(Vuex)

const state = {
  count: 0
}

const mutations = {
  increment (state: CounterState) {
    state.count++
  },
  incrementOdd (state: CounterState) {
    state.count += 2;
  }
}
const getters = {
  doubleCount(state: CounterState):number{
    return state.count * 2;
  }
};

const actions = {
  incrementIfOdd ({commit,state}: ActionContext<any,any>) {
    // state.count++
    commit('incrementOdd');
    return state.count;
  }
}

export default new Vuex.Store({
  state,
  getters,
  
  actions,
  mutations,
})
