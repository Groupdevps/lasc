import axios from "@/plugins/requests";
import fields from "@/models/fields/FurtranFields.js"
import Helper from "@/helpers/helpers.js"

export default class FurtranService{
    constructor(){

    }
    
    async getFurtran(params){
        try {
            // "/api/v1/technical-anex-2"
            const response = await axios.get(`/api/v1/furtran/generate/${params.AttentionId}`);
            return response
        } catch (error) {
            return {error}
        }
    }

    async saveFurtran(params){
        try {            
            const response = await axios.post(`/api/v1/furtran`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateFurtran(params){
        try {            
            const response = await axios.put(`/api/v1/furtran/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async downloadFurtran(params){
        try {            
            const response = await axios.get(`/api/v1/furtran/download/${params.id}`, { responseType: 'blob'});
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
        // console.log("ANEXO furtran ", item, itemCenter, itemUser)
        if (item) {
            return {

            }
        }
    }

}