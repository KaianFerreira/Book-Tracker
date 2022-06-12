import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalDialog: {
      open: false,
      title: 'Warning',
      message: 'You are about to delete this book.',
      overline: 'Are you sure?',
      type: 'warning',
      submit: function () {},
      cancel: function () {}
    }
  },
  getters: {
  },
  mutations: {
    globalDialog (state, payload) { state.globalDialog = payload },
    closeDialog (state) { state.globalDialog.open = false }
  },
  actions: {
    closeDialog ({ commit }) {
      commit('closeDialog')
    },
    openDialog ({ commit }, payload) {
      commit('globalDialog', payload)
    }
  },
  modules: {
  }
})
