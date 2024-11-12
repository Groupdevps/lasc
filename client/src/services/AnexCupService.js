import axios from "@/plugins/requests";

export default class Anexo3Service{
    constructor(){

    }
    async getAnexCup(params){
        try {            
            const response = await axios.get(`/api/v1/technical-anex-3/${params.Anex3Id}/anex-cup`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveAnexCup(params){
        try {            
            const response = await axios.post(`/api/v1/technical-anex-3/${params.Anex3Id}/anex-cup`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateAnexCup(params){
        try {            
            const response = await axios.put(`/api/v1/technical-anex-3/${params.Anex3Id}/anex-cup/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async deactivateAnexCup(params){
        try {            
            const response = await axios.put(`/api/v1/technical-anex-3/${params.Anex3Id}/anex-cup/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async deleteAnexCup(params){
        try {            
            const response = await axios.delete(`/api/v1/technical-anex-3/${params.Anex3Id}/anex-cup/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
}