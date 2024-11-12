import service from "@/services/TypeCenterService.js"
const Service = new service();
export const listTypeCenter = {
	namespaced : true,
	state : {
		list: [],
		isLoaded : false,
	},
	getters :{
		list: (state)=>{
      		return state.list;
    	},
    	isList: (state)=>{
    		return state.list.length > 0;
    	},
    	getTypeCenterById:(state)=>(item)=>{
    		return  state.list  && state.list.length > 0 ?   state.list.find(x=>item == x.id) : null;
    	}
	},
	actions:{
		getList({commit}, params){	
			return Service.getInfo(params).then(res =>{
				if (res.data && res.data.length > 0 ) {
					commit('setIsLoaded', true);					
					commit('setList', res.data);
				}
          		return Promise.resolve(res.data);
			}).catch(error => {
				console.warn("Error get list type center ", error)
          		return Promise.reject(error);
			})	
		}
	},
	mutations:{
		addList(state, cup){
			state.list.push(cup);
		},
		setList(state, list){
			state.list = list;
		},
		setIsLoaded(state,val){
			state.isLoaded = val;
		}					

	}

}