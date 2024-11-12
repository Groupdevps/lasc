import service from "@/services/ModeratorFeeService.js"
const Service = new service();
export const listModeratorFee = {
	namespaced : true,
	state : {
		list: [
			{
			id 		: 1,
			name 	: 1,			
			},
			{
				id 		: 2,
				name 	: 2,			
			},
			{
				id 		: 3,
				name 	: 3,			
			},
			{
				id 		: 4,
				name 	: 4,			
			},
			{
				id 		: 5,
				name 	: 5,			
			},
			{
				id 		: 6,
				name 	: 6,			
			},
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
				console.warn("Error get listModeratorFee ", error)
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