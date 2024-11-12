import service from "@/services/user.service.js"
import Helper from "@/helpers/helpers.js"
const Service = service;
export const listUser = {
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
			return Service.getUsers(params).then(res =>{
				if (res.data && res.data.length > 0 ) {
					const tempList=res.data.map(x=>{
                        x.filterName = Helper.normalizeText(x.name)
                        return x
                    })
					commit('setList', tempList);
				}
          		return Promise.resolve(res.data);
			}).catch(error => {
				console.warn("Error get listUser ", error)
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