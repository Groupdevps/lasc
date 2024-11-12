import axios from "@/plugins/requests";

export default class AreaHospitalizationService{
    constructor(){

    }
    async getInfo(params){
        try {            
            const response = await axios.get(`/api/v1/areas`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async findInfo(params){
        try {            
            const response = await axios.get(`/api/v1/areas/${params.id}/`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveInfo(params){
        try {            
            const response = await axios.post(`/api/v1/areas`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateInfo(params){
        try {            
            const response = await axios.put(`/api/v1/areas/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async deactivateInfo(params){
        try {            
            const response = await axios.put(`/api/v1/areas/${params.id}/deactivate`,params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async deleteInfo(params){
        try {            
            const response = await axios.delete(`/api/v1/areas/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
}