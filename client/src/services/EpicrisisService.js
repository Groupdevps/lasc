import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 

export default class EpicrisisService{
    constructor(){

    }
    async getEpicrisis(params){
        try {
            const response = await axios.post(`/api/v1/epicrisis/${params.AttentionId}`, params);
            return response;
        } catch (error) {
            return {error}
        }
    }
    async downloadEpicrisis(params){
        try {            
            const response = await axios.get(`/api/v1/epicrisis/${params.AttentionId}/pdf`, { responseType: 'blob'});            
            return response
        } catch (error) {            
            return {error}
        }
    }

}