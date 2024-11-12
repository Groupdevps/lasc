import service from "@/services/UvtService.js"
const Service = new service();
export const listUVT = {
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
    		return state.isLoaded;
    	},
    	isLoaded: (state)=>{
    		return state.isLoaded;
    	} 

	},
	actions:{
		getList({state ,commit}, params={}){				
			return Service.getInfo(params).then(res =>{
				if (res.data && res.data) {					
					commit('setList', [res.data]);
					commit('setIsLoaded', true);
				}
          		return Promise.resolve(res);
			}).catch(error => {
				console.warn("Error get list uvt ", error)
          		return Promise.reject(error);
			})	
			
		},
		findList({commit},params){
			return Service.getInfo(params).then(res =>{
				return Promise.resolve(res)
			}).catch(error => {
				console.warn("Error get find uvt ", error)
          		return Promise.reject(error);
			})	
		},
		saveList({commit, params}){			
			return Service.saveInfo(params).then(res =>{
				return Promise.resolve(res)
			}).catch(error => {
				console.warn("Error get save uvt ", error)
          		return Promise.reject(error);
			})	
		}
	},
	mutations:{
		addList(state, item){
			state.list.push(item);
		},
		setList(state, list){
			state.list = list;;
		},
		setIsLoaded(state, val){
			state.isLoaded = val;
		},
		
	}

}