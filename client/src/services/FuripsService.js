import axios from "@/plugins/requests";
import fields from "@/models/fields/FuripsFields.js"
import Helper from "@/helpers/helpers.js"

export default class FuripsService{
    constructor(){

    }
    
    async getFurips(params){
        try {
            // "/api/v1/technical-anex-2"
            const response = await axios.get(`/api/v1/furips/generate/${params.AttentionId}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }

    async saveFurips(params){
        try {            
            const response = await axios.post(`/api/v1/furips`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateFurips(params){
        try {            
            const response = await axios.put(`/api/v1/furips/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async downloadFurips(params){
        try {            
            const response = await axios.get(`/api/v1/furips/download/${params.id}`, params, { responseType: 'blob'});
            console.log("response ", response)
            return response
        } catch (error) {
            return {error}
        }
    }
    getFields(){
        return fields;
    }
    formatInfo(item, itemCenter, itemUser){
        // console.log("ANEXO furips", item, itemCenter, itemUser)
        if (item) {
            return {

            }
        }
    }
}