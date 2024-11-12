import AuthService from '../services/auth.service';
import roleService from '@/services/RoleService.js';
const RoleService = new roleService();

const user = JSON.parse(localStorage.getItem('user'));
const role = JSON.parse(localStorage.getItem('role')) || null;
const initialState = user
  ? { status: { loggedIn: true }, user, role, isRoleLoaded : false }
  : { status: { loggedIn: false }, user: false , role : null, isRoleLoaded : false};
export const auth = {
  namespaced: true,
  state: initialState,
  getters : {
    user : (state)=>{
      // console.log("state ", state)
      if (state.user && state.user.user) {
        return state.user.user;
      }
      return false
    },

    userIdAndCenter : (state)=>{
      if (state && state.user && state.user.user) {
        return { userId : state.user.user.id , CenterId : state.user.user.CenterId };
      }
      return null
    },
    isUserLoggedIn: (state)=>{
      return state.status.loggedIn;
    },
    getCenterId :(state)=>{
      if (state && state.user && state.user.user) {        
        return state.user.user.CenterId;
      }
    },
    userId:(state)=>{
      if (state && state.user && state.user.user) {
        return state.user.user.id;
      }
    },
    userAndRoleString:(state)=>{
      if (state && state.user && state.user.user) {
        let role = "";
        if (state.user.user.UserRoles && state.user.user.UserRoles.length > 0 && state.user.user.UserRoles[0] && state.user.user.UserRoles[0].Role) {
          role = state.user.user.UserRoles[0].Role.name.toUpperCase();
        }else if(state.user.user.Role){
          role = state.user.user.Role.name.toUpperCase();
        }
        return `${state.user.user.name.toUpperCase()}, ${role}`;
      }
    },
    getProfessionalCardNumber: (state)=>{
      if (state && state.user && state.user.user && state.user.user.Profile && state.user.user.Profile.professionalCardNumber) {
        return state.user.user.Profile.professionalCardNumber;
      }
      return ""
    },
    userRoles:(state)=>{
      if (state && state.user && state.user.user) {        
        if (state.user.user.UserRoles && state.user.user.UserRoles.length > 0){
          return state.user.user.UserRoles.map(x => x.Role.name || "");
        }else if (state.user.user.Role) {
          return [state.user.user.Role.name]
        }

      }
    },
    getIsRoleLoaded:(state)=>{
      return state.isRoleLoaded;
    },
    getPermission:(state) => (keyPermission) =>{
      if (state.role && state.role.permissions && state.role.permissions.length > 0) {
        const find = state.role.permissions.filter(x=> x && x.Resource && x.Resource.keyForm == keyPermission);
        if (find && find.length > 0) {
          return find[0];
        }
      }
      return {canAdd : false, canDelete : false, canEdit: false, candView : false };
    }
  },
  actions : {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          // console.log("state ", user)
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          // console.warn("state error " ,error)
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    getInfoRole({ commit }, params){
      return RoleService.findInfo(params).then(
        res => {          
          if (res && res.data && res.data.length > 0) {
            commit('setRole', res.data[0]);
            commit('setIsRoleLoaded',true)
            commit('updateLocalRole', res.data[0])
          }else{
            //commit('setRole', null);
          }
          return Promise.resolve(res.data);
        },
        error => {
          //commit('setRole', null);
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
      commit('setRole', null);

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
    setRole(state, val){
      state.role = val;    
    },
    setIsRoleLoaded(state,val){
      state.isRoleLoaded = val;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    updateUsername(state, user){
      state.user.user.username = user.username;
      commit('updateLocal', state);

    },
    updateLocal(state){
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    updateLocalRole(state){
      localStorage.setItem('role', JSON.stringify(state.role))
    }
  }
};