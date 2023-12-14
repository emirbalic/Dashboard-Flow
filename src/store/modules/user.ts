import { GlobalState } from '@/store/types';
import { Commit } from 'vuex';

export default {
  namespaced: true,
  state: {
    users: [],
    isLoggedIn: false
  },
  mutations: {
    LOGIN_USER(state: GlobalState, isLoggedIn: boolean) {
        state.isLoggedIn = isLoggedIn;
      },
  },
  actions: {

    loginUser({ commit }: { commit: Commit }, payload: boolean) {
        commit('LOGIN_USER', payload)
    }
  },
  getters: {
    isUserLoggedIn(state: GlobalState) {
        return state.isLoggedIn;
    }
  },
};