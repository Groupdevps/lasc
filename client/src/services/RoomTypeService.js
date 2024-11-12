import axios from "@/plugins/requests";

export default class RoomTypeService{
    constructor(){

    }
    async getInfo(params){
        try {            
            const response = await axios.get(`/api/v1/roomtypes/`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveInfo(params){
        try {            
            const response = await axios.post(`/api/v1/roomtypes`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateInfo(params){
        try {            
            const response = await axios.put(`/api/v1/roomtypes/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async deactivateInfo(params){
        try {            
            const response = await axios.put(`/api/v1/roomtypes/${params.id}/deactivate`,params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async deleteInfo(params){
        try {            
            const response = await axios.delete(`/api/v1/roomtypes/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
}