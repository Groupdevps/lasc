// import AuthService from '@/services/centers.service';
import itemService from "@/services/AttentionService.js"
const Service = new itemService();
// const initialState = ;
export const infoPatient = {
  namespaced: true,
  state: { 
    patient : null, 
    SubDiagnoseLists : [], 
    isLoaded: false, 
    Order : null,
    lastNote: "" 
  },
  getters : {
    patient : (state)=>{     
      return state.patient;
    },    
    SubDiagnoseLists : (state) =>{
      return state.SubDiagnoseLists;      
    },
    isLoaded: (state)=>{
      return state.isLoaded;
    },
    getLastNote: (state)=>{
      return state.lastNote;
    },
    getOrder:(state)=>{
      return state.Order;
    }
  },
  actions : {
    getInfo({commit}, params){
      return Service.getAttentionById(params).then( res=>{        
        if (res && res.data) {
          commit("addInfo",res.data)
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
      state.patient = info
    },
    setSubDiagnoseLists(state, diagnoses){
      state.SubDiagnoseLists= diagnoses;
    },
    setIsLoaded(state, val){
      state.isLoaded = val;
    },
    setLastNote(state, val){
      state.lastNote = val;
    },
    setOrder(state, val){
      state.Order = val;      
    }

  }
};