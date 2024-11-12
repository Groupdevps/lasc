import itemService from '@/services/CenterService.js';

const Service = new itemService();
// const initialState = ;
export const infoCenter = {
  namespaced: true,
  state: { 
    center : null,     
    isLoaded: false,   
  },
  getters : {
    getCenter : (state)=>{     
      return state.center;
    },  
    getCenterId : (state)=>{     
      return state.center?.id || null;
    },        
    isLoaded: (state)=>{
      return state.isLoaded;
    },
  },
  actions : {
    getInfo({commit}, params){
      return Service.getInfo(params).then( res=>{        
        if (res && res.data && res.data.length > 0) {
          commit("addInfo",res.data[0])
          commit('setIsLoaded', true);
        }
        return Promise.resolve(res);
      }).catch(error=>{
        commit("addInfo",null)
        commit('setIsLoaded', true);
        return Promise.reject(error);
      })
    }
  },
  mutations : {
    addInfo(state, info){
      state.center = info
    },
    setIsLoaded(state, val){
      state.isLoaded = val;
    },

  }
};