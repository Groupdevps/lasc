import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 

export default class ApplySuppliesDetailsService {
    constructor(){

    }
    async getDetails(params){
        try {
            const response = await axios.get(`/api/v1/applies`,params) // ${params.AttentionId}/apply 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async findDetail(params){
        try {
            const response = await axios.get(`/api/v1/apply/${params.id}`) // ${params.AttentionId}/apply 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveDetail(params){
        try {
            const response = await axios.post(`/api/v1/apply`, params) // ${params.AttentionId} 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateDetail(params){
        try {
            const response = await axios.put(`/api/v1/apply/${params.id}`, params) //${params.AttentionId}/
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteDetail(params){
        try {
            const response = await axios.delete(`/api/v1/apply/${params.id}`) // ${params.AttentionId} 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    

}