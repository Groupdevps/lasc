import axios from "@/plugins/requests.js"
// import Helper from "@/helpers/helpers.js" 

export default class InventoryService {
    constructor(){

    }
    async getInfo(params){
        try {
            const response = await axios.get(`/api/v1/dispatch`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async findInfo(params){
        try {
            const response = await axios.get(`/api/v1/dispatch`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveInfo(params){
        try {
            const response = await axios.post(`/api/v1/dispatch`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateInfo(params){
        try {
            const response = await axios.put(`/api/v1/dispatch/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteInfo(params){
        try {
            const response = await axios.delete(`/api/v1/dispatch/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    linkPdf(params){
        return `/api/v1/dispatch/${params.id}/pdf`
    }
    
}