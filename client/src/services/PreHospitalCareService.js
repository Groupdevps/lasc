import axios from "@/plugins/requests";
import fields from "@/models/fields/PreHospitalCareFields.js"
import Helper from "@/helpers/helpers.js"

export default class PreHospitalCareService{
    constructor(){

    }
    
    async getPreHospitalCare(params){
        try {
            // "/api/v1/technical-anex-2"
            const response = await axios.get(`/api/v1/prehospital-care/attention/${params.AttentionId}`);
            return response
        } catch (error) {
            return {error}
        }
    }

    async savePreHospitalCare(params){
        try {            
            const response = await axios.post(`/api/v1/prehospital-care`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updatePreHospitalCare(params){
        try {            
            const response = await axios.put(`/api/v1/prehospital-care/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async downloadPreHospitalCare(params){
        try {            
            const response = await axios.get(`/api/v1/prehospital-care/download/${params.id}`, { responseType: 'blob'});
            // console.log("response ", response)
            return response
        } catch (error) {
            return {error}
        }
    }
    getFields(){
        return fields;
    }
    formatInfo(item, itemCenter, itemUser){
        // console.log("ANEXO prehospital ", item, itemCenter, itemUser)
        if (item) {
            return {

            }
        }
    }

}