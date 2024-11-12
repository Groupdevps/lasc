import itemService from "@/services/CurrentAdministratorService.js"
const Service = new itemService();
// const initialState = ;
export const listCurrentAdministrator = {
  namespaced: true,
  state: { list : [],  isLoaded: false },
  getters : {
    list : (state)=>{     
      return state.list;
    },    
    isLoaded: (state)=>{
      return state.isLoaded;
    },
    isList: (state)=>{
      return state.list.length > 0;
    },
    getCurrentAdministrator:(state)=>(name)=>{
      return state.list && state.list.length ? state.list.find(x=> x.name==name) : null;
    },
  },
  actions : {
    getList({commit}, params){
      return Service.getInfo(params).then( res=>{
        if (res && res.data) {
          commit("addInfo",res.data)
          commit('setIsLoaded', true);
        }
        return Promise.resolve(res);

      }).catch(error=>{
        commit("addInfo",null)
        return Promise.reject(error);
      })
    }
  },
  mutations : {
    addInfo(state, info){
      state.list = info
    },
    setIsLoaded(state, val){
      state.isLoaded = val;
    }

  }
};