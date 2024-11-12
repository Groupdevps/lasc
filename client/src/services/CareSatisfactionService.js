import axios from "@/plugins/requests";
import fields from "@/models/fields/CareSatisfactionFields.js"
import Helper from "@/helpers/helpers.js"

export default class Anexo9Service{
    constructor(){

    }
    
    async getCareSatisfaction(params){
        try {
            // "/api/v1/technical-anex-2"
            const response = await axios.get(`/api/v1/care-satisfaction/attention/${params.id | params.AttentionId}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }

    async saveCareSatisfaction(params){
        try {            
            const response = await axios.post(`/api/v1/care-satisfaction`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateCareSatisfaction(params){
        try {            
            const response = await axios.put(`/api/v1/care-satisfaction/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async downloadCareSatisfaction(params){
        try {            
            const response = await axios.get(`/api/v1/care-satisfaction/download/${params.id}`, { responseType: 'blob'});
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
        // console.log("ANEXO care ", item, itemCenter, itemUser)
        if (item) {
            return {
                AttentionId : item?.id,
                patientFullName : item?.HistoryPerson?.fullName,
                // admissionNumber : 
                // epr : 
                admissionDate :  item?.assignedDate,
                departureDate :  item?.egressDate,
            }
        }
    }

}