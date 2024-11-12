import axios from "@/plugins/requests.js"
// import Helper from "@/helpers/helpers.js" 

export default class SubDiagnoseService {
    constructor(){

    }
    async getInfo(params){
        try {
            const response = await axios.get(`/api/v1/items/subdiagnose-list`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async findInfo(params){
        try {
            // { AttentionId  }
            const response = await axios.post(`/api/v1/find/all/subdiagnose-list/`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
            

    async saveInfo(params){
        try {
            const response = await axios.post(`/api/v1/subdiagnose-list`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateInfo(params){
        try {
            const response = await axios.put(`/api/v1/subdiagnose-list/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteInfo(params){
        try {
            const response = await axios.delete(`/api/v1/subdiagnose-list/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    

}