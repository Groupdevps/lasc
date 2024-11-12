import service from "@/services/TypesOrderService.js"
const Service = new service();
export const listTypesOrder = {
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
    	isLoaded: (state)=>{
    		return state.isLoaded;
    	},
    	getTypeOrderByName:(state)=>(itemName)=>{
    		return state.list && state.list.length>0 ? state.list.find(x=> x.name == itemName) : null;
    	}
	},
	actions:{
		getList({commit}, params){	
			return Service.getInfo(params).then(res =>{
				if (res.data && res.data.length > 0 ) {
					commit('setList', res.data);
					commit('setIsLoaded', true);
				}
          		return Promise.resolve(res.data);
			}).catch(error => {
				console.warn("Error get listlist ", error)
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
		setIsLoaded(state, val){
			state.isLoaded = val;
		}
	}

}