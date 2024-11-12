import axios from "@/plugins/requests";
import fields from "@/models/fields/SoatFields.js"
import Helper from "@/helpers/helpers.js"

export default class SoatService{
    constructor(){

    }
    
    async getSoat(params){
        try {
            // "/api/v1/technical-anex-2"
            const response = await axios.get(`/api/v1/soat/${params.id | params.AttentionId}`);
            return response
        } catch (error) {
            return {error}
        }
    }

    async saveSoat(params){
        try {            
            const response = await axios.post(`/api/v1/soat`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateSoat(params){
        try {            
            const response = await axios.put(`/api/v1/soat/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async downloadSoat(params){
        try {            
            const response = await axios.get(`/api/v1/soat/download/${params.id}`, { responseType: 'blob'});
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
        // console.log("ANEXO  soat", item, itemCenter, itemUser)
        if (item) {
            return {

            }
        }
    }
}