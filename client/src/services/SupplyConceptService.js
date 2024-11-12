import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 

export default class SupplyConceptService {
    constructor(){

    }
    async getSubSuply(params){
        try {
            const response = await axios.get(`/api/v1/concept/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveSubSuply(params){
        try {
            const response = await axios.post(`/api/v1/concept`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateSubSuply(params){
        try {
            const response = await axios.put(`/api/v1/concept/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteSubSuply(params){
        try {
            const response = await axios.delete(`/api/v1/concept/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    

}