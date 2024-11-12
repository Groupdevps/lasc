
import axios from "@/plugins/requests";

export default class AnalysisResultService{ // sub results
    constructor(){

    }
    async getInfo(params){
        try {            
            const response = await axios.get(`/api/v1/analysis-result/`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async searchInfo(params){
        try {            
            const response = await axios.get(`/api/v1/find-analysis-result/`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
   
    async saveInfo(params){
        try {            
            const response = await axios.post(`/api/v1/analysis-result`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateInfo(params){
        try {            
            const response = await axios.put(`/api/v1/analysis-result/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
   
    async deleteInfo(params){
        try {            
            const response = await axios.delete(`/api/v1/analysis-result/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
}