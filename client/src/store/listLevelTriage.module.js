import service from "@/services/LevelTriageService.js"
const Service = new service();
export const listLevelTriage = {
	namespaced : true,
	state : {
		isLoaded : false,
		list: [
			{
				id  : 1,
				key : "resucitation",
				description : "REANIMACION", //Resuscitation
				name : "Trigae I",
				color : "error",
				timeWaiting  : "inmediately",
			},
			{
				id  : 2,
				key : "emergency",
				description : "EMERGENCIA", // Emergency
				name : "Trigae II",
				color : "warning",
				timeWaiting  : "10-15 Mins",
			},
			{
				id  : 3,
				key : "urgency",
				description : "URGENCIA", // Urgency  
				name : "Trigae III",
				color : "warning",
				timeWaiting  : "60 Mins",
			},
			{
				id  : 4,
				key : "minor_emergency",
				description : "URGENCIA MENOR", // MINOR emergency
				name : "Trigae IV",
				color : "success",
				timeWaiting  : "2 Hours",
			},
			{
				id  : 5,
				key : "without_urgency",
				description : "SIN URGENCIA", // WITHOUT urgency
				name : "Trigae V",
				color 			: "blue",
				timeWaiting  	: "4 Hours",
			},	
		],
	},
	getters :{
		list: (state)=>{
      		return state.list;
    	},
    	isList: (state)=>{
    		return state.list.length > 0;
    	},
    	isLoaded: (state)=>{
    		return state.isLoaded
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
				console.warn("Error get listLevelTriage ", error)
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
			state.isLoaded = val
		}
	}

}