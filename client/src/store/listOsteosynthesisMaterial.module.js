import service from "@/services/OsteosynthesisMaterialsService.js"
import Helper from "@/helpers/helpers.js"
const Service = new service();
export const listOsteosynthesisMaterial = {
	namespaced : true,
	state : {
		list: [],
		isLoaded : false,
		pages: [],
		page : 1,
		isAllPages : false,
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
    	} 

	},
	actions:{
		getList({state, commit}, params={}){				
			if (!state.pages.includes(state.page)) {				
				commit('setPages',state.page)
				params.page = !state.isLoaded ? 1 :state.page;
				return Service.getInfo(params).then(res =>{
					if (res && res.data) {
						if(res.data.page){																				
							if (res.data.nextPage) {													
								commit('setPage',res.data.nextPage)
							}else{
								commit('setIsAllPages',true);
							}
						}
						if (res.data.rows.length > 0 ) {
							const tempList=res.data.rows.map(x=>{
		                        x.filterDescription = x.description ?  Helper.normalizeText(x.description) : x.description
		                        return x
		                    })
							commit('setList', tempList);
							commit('setIsLoaded', true);
						}
					}
	          		return Promise.resolve(res.data);
				}).catch(error => {
					console.warn("Error get Osteosynthesis Materials ", error)
	          		return Promise.reject(error);
				})	
			}
		},
		findList({commit},params){
			return Service.getInfo(params).then(res =>{
				return Promise.resolve(res)
			}).catch(error => {
				console.warn("Error get find Osteosynthesis Materials ", error)
          		return Promise.reject(error);
			})	
		},
		saveList({commit},params){
			return Service.saveInfo(params).then(res =>{
				return Promise.resolve(res)
			}).catch(error => {
				console.warn("Error save Osteosynthesis Materials ", error)
          		return Promise.reject(error);
			})	
		},
	},
	mutations:{
		addCup(state, val){
			state.list.push(val);
		},
		setList(state, list){
			state.list=state.list.concat(list);;
		},
		setIsLoaded(state, val){
			state.isLoaded = val;
		},
		setPage(state, val){			
			state.page = val;
		},
		setPages(state, val){
			state.pages.push(val);
		},
		setIsAllPages(state, val){
			state.isAllPages=val;
		}
	}

}