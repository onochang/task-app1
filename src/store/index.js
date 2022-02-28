import { createStore } from 'vuex'

export default createStore({
  state: {
    sideNav: false,
    tasks: []
  },
  getters: {
  },
  mutations: {
    // state内のsideNavの状態を変更
    toggleSideNav(state) {
      state.sideNav = !state.sideNav
    },
    // state内のtasksにtaskオブジェクトを格納
    addTask(state, task) {
      state.tasks.push(task)
    }
  },
  actions: {
    // toggleSideNavが呼び出された時にmutationsを実行
    toggleSideNav({ commit }) {
      commit('toggleSideNav')
    },
    // FormViewのOKボタンが押された時にtaskを受け取りmutationsを実行
    addTask({ commit }, task) {
      commit('addTask', task)
    }
  },
  modules: {
  }
})
