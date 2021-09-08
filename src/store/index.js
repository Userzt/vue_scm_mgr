import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    
  },
  mutations: {
    //sessionStorage存储token
    set_token(state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    //sessionStorage删除token
    del_token(state) {
      state.token = ''
      sessionStorage.removeItem('token')
    }

    //
  },
  actions: {},
  modules: {}
})
