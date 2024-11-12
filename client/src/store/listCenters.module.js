import service from "@/services/CenterService.js"
const Service = new service();
export const listCenters = {
	namespaced : true,
	state : {
		list: []
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
				console.warn("Error get listCenters ", error)
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