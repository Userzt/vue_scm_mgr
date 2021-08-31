import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
  },
  mutations: {
    //localStorage存储token
    set_token(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    //localStorage删除token
    del_token(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  actions: {},
  modules: {},
});
