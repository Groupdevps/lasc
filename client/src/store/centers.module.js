import AuthService from '../services/centers.service';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: false };
export const auth = {
  namespaced: true,
  state: initialState,
  getters : {
    user : (state)=>{
      // console.log("state ", state)
      return state.user;
    }
  },
  actions : {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          console.log("state ", user)
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          console.warn("state error " ,error)
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {

          commit('registerSuccess');
          return Promise.resolve(response);
        }/*,
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }*/
      );
    }
  },
  mutations : {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = false;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = false;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};