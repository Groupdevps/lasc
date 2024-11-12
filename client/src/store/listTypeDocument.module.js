import DocumentType from "@/services/TypeDocumentService.js"
const Service = new DocumentType();
export const listTypeDocument = {
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
    	getTypeById: (state)=> (id)=>{
    		return state.list.find(x => x.id == id )
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
				console.warn("Error get list TypeDocument ", error)
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