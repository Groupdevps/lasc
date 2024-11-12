import service from "@/services/ZoneService.js"
const Service = new service();
export const listZone = {
	namespaced : true,
	state : {
		list: [
			{ id : 1, name : "Rural"},
			{ id : 2, name : "Urbana"},  
		]
	},
	getters :{
		list: (state)=>{
      		return state.list;
    	},
    	isList: (state)=>{
    		return state.list.length > 0;
    	}
	},
	actions:{
		getList({commit}, params){	
			return Service.getInfo(params).then(res =>{
				if (res.data && res.data.length > 0 ) {
					commit('setList', res.data);
				}
          		return Promise.resolve(res.data);
			}).catch(error => {
				console.warn("Error get listZones ", error)
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
		}
	}

}