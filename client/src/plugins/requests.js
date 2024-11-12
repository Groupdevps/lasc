import axios        from 'axios'
import authHeader   from "@/services/auth-header" 
import api          from "@/plugins/api"
// import store        from '@/store'

axios.defaults.withCredentials  =   false;
let auth = authHeader();
if (auth && auth.Authorization) {
  axios.defaults.headers.common["Authorization"] = auth.Authorization;
}
// console.log("axios ",axios.defaults.headers.common)
axios.defaults.baseURL                   = api.url;

class Axios{
	requestAxios(params){
		return new Promise ((resolve ,reject)=>{ 
			axios(params).then(res=> resolve(res)).catch( error => reject(error));
		})
	}
	get(uri, params,config){
		return new Promise ((resolve ,reject)=>{
			if(config){				
				axios.get(uri,params, config).then(res=> resolve(res)).catch( error => reject(error))	
			}else if (params) {								
				axios.get(uri,{params}).then(res=> resolve(res)).catch( error => reject(error))					
			}else{
				axios.get(uri).then(res=> resolve(res)).catch( error => reject(error))	
			}
		}) 
	}

	post(uri, data, config=null){
		return new Promise ((resolve ,reject)=>{
			if(config){				
				axios.post(uri,data,config).then(res=> resolve(res)).catch( error => reject(error))	
			}else{
				axios.post(uri,data).then(res=> resolve(res)).catch( error => reject(error))	
			}

		}) 
	}

	put(uri, data, config){
		return new Promise ((resolve ,reject)=>{
			if(config){				
				axios.post(uri,data,config).then(res=> resolve(res)).catch( error => reject(error))	
			}else{
				axios.put(uri,data).then(res=> resolve(res)).catch( error => reject(error))	
			}
		}) 
	}
	patch(uri, data, config){
		return new Promise ((resolve ,reject)=>{
			if(config){				
				axios.patch(uri,data,config).then(res=> resolve(res)).catch( error => reject(error))	
			}else{
				axios.patch(uri,data).then(res=> resolve(res)).catch( error => reject(error))	
			}
		}) 
	}

	delete(uri, data, config){
		return new Promise ((resolve ,reject)=>{
			axios.delete(uri,data).then(res=> resolve(res)).catch( error => reject(error))	
		}) 
	}

	// havePermission(type){
	// 	return store.getters['auth/permission'](type);
	// }

} 

export default new Axios;