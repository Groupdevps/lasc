import service from "@/services/SocioeconomicLevelService.js"
const Service = new service();
export const listSocioeconomicLevel = {
	namespaced : true,
	state : {
		list: [
			{
                id      : 1,
                name    : "1 NIVEL",            
            },
            {
                id      : 2,
                name    : "2 NIVEL",            
            },
            {
                id      : 3,
                name    : "3 NIVEL",            
            },
            {
                id      : 4,
                name    : "4 NIVEL",            
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
				console.warn("Error get listSocioeconomicLevel ", error)
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