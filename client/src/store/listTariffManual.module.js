import service from "@/services/TariffManualService.js"
const Service = new service();
export const listTariffManual = {
	namespaced : true,
	state : {
		list: [],
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
    	}
	},
	actions:{
		getList({state ,commit}, params={}){			
			if (!state.pages.includes(state.page)) {				
				commit('setPages',state.page)
				params.page = state.page;
				return Service.getInfo(params).then(res =>{
					if (res.data && res.data) {
						if(res.data.page){																				
							if (res.data.nextPage) {								
								commit('setPage',res.data.nextPage)
							}else{
								commit('setIsAllPages',true);
							}
						}
						if (res.data.rows.length > 0) {
							commit('setList', res.data.rows);
						}
					}
	          		return Promise.resolve(res.data);
				}).catch(error => {
					console.warn("Error get listTariffManual ", error)
	          		return Promise.reject(error);
				})	
			}
		},
		findList({commit},params){
			return Service.getInfo(params).then(res =>{
				return Promise.resolve(res)
			}).catch(error => {
				console.warn("Error get find Tariff Manual ", error)
          		return Promise.reject(error);
			})	
		},
	},
	mutations:{
		addList(state, cup){
			state.list.push(cup);
		},
		setList(state, list){
			state.list = state.list.concat(list);
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