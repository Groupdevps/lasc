import service from "@/services/StatusService.js"
const Service = new service();
export const listStatus = {
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
    	},
    	getStatusByName:(state)=>(item)=>{
    		return state.list && state.list.length ? state.list.find(x=> x.name == item) : null;
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
				console.warn("Error get listStatus ", error)
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