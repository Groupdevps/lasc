import service from "@/services/RegimeService.js"
const Service = new service();
export const listRegime = {
	namespaced : true,
	state : {
		isLoaded : false,
		list: [
			{ id : 1, name : "Contributivo",},
            { id : 2, name : "Subsidiado",},
            { id : 3, name : "Vinculado",},
            { id : 4, name : "Particular",},
            { id : 5, name : "Secretaria de Salud",},
            { id : 6, name : "Empresa",},
            { id : 7, name : "Desplazado afiliado al regimen contributivo",},
            { id : 8, name : "Desplazado afiliado al regimen subsidiado",},
            { id : 9, name : "Desplazado no afiliado (Vinculado)",},
            { id : 10, name : "Extranjero",},
            { id : 11, name : "Otro"},    
		]
	},
	getters :{
		list: (state)=>{
      		return state.list;
    	},
    	isList: (state)=>{
    		return state.list.length > 0;
    	},
    	isLoaded:(state)=>{
    		return state.isLoaded;
    	},
    	getById: (state)=> (id)=>{
    		const idx = state.list.findIndex(x => (x && x.id  == id));
			if (idx >= 0) {
				return state.list[idx];
			}
    	},
	},
	actions:{
		getList({commit}, params){	
			return Service.getInfo(params).then(res =>{
				if (res.data && res.data.length > 0 ) {
					commit('setList', res.data);
					commit('setIsLoaded', true)
				}
          		return Promise.resolve(res.data);
			}).catch(error => {
				console.warn("Error get listRegime ", error)
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