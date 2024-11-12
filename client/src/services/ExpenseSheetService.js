import axios from "@/plugins/requests.js"
// import Helper from "@/helpers/helpers.js" 

export default class EpicrisisService{
    constructor(){

    }
    async getInfo(params){
        try {
            const response = await axios.post(`/api/v1/hospital-expense/${params.AttentionId}/`, params);
            return response;
        } catch (error) {
            return {error}
        }
    }
    async findInfo(params){
        try {
            const response = await axios.get(`/api/v1/item/hospital-expense/`,params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveInfo(params){
        try {
            const response = await axios.post(`/api/v1/hospital-expense`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateInfo(params){
        try {
            const response = await axios.put(`/api/v1/hospital-expense/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteInfo(params){
        try {
            const response = await axios.delete(`/api/v1/hospital-expense/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async downloadPdf(params){
        try {            
            const response = await axios.get(`/api/v1/hospital-expense/${params.AttentionId}/pdf`);//, { responseType: 'blob'}        
            return response
        } catch (error) {            
            return {error}
        }
    }
    linkPdf(params){
        return `/api/v1/hospital-expense/${params.id}/pdf`
    }

}