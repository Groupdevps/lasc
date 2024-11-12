import axios from "@/plugins/requests";

export default class LaboratoryResultService{ // results
    constructor(){

    }
    async getLaboratories(params){
        try {            
            const response = await axios.get(`/api/v1/laboratory-result/`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async searchLaboratory(params){
        try {            
            const response = await axios.get(`/api/v1/laboratory-result`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async searchOrders(params){
        try {            
            const response = await axios.get(`/api/v1/order/`, params); // order / items/order-lab
            return response
        } catch (error) {
            return {error}
        }
    }
    async searchOrdersByAttention(params){
        try {            
            const response = await axios.get(`/api/v1/items/order-lab/attention/${params.AttentionId}`); // order
            return response
        } catch (error) {
            return {error}
        }
    }
    async getLaboratory(params){
        try {            
            const response = await axios.get(`/api/v1/laboratory-result/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveLaboratory(params){
        try {            
            const response = await axios.post(`/api/v1/laboratory-result`, params);
            console.log("save lab ", params)
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateLaboratory(params){
        try {            
            const response = await axios.put(`/api/v1/laboratory-result/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
   
    async deleteLaboratory(params){
        try {            
            const response = await axios.delete(`/api/v1/laboratory-result/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
    linkPdf(params){
        return `/api/v1/laboratory-result/${params.id}/pdf`
    } 
}