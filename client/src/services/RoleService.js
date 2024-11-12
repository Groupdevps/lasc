import axios from "@/plugins/requests";

export default class RoleService{
    constructor(){

    }
    async getInfo(params){
        try {
            const response = await axios.get(`/api/v1/role`) // items/
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async getInfoRoles(params){
        try {
            const response = await axios.get(`/api/v1/role/name`) // items/
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async findInfo(params){
        try {
            const response = await axios.get(`/api/v1/role/`,params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveInfo(params){
        try {
            const response = await axios.post(`/api/v1/role`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateInfo(params){
        try {
            const response = await axios.put(`/api/v1/role/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteInfo(params){
        try {
            const response = await axios.delete(`/api/v1/role/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
}