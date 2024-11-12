import axios from "@/plugins/requests";
export default class AnalysisOfLaboratoryService{
    constructor(){}

    async getAnalysis(params){
        try {            
            const response = await axios.get(`/api/v1/analysis`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async findAnalysis(params){
        try {            
            const response = await axios.get(`/api/v1/analysis/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveAnalysis(params){
        try {            
            const response = await axios.post(`/api/v1/analysis`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveAnalysisLab(params){
        try{            
            const response = await axios.post(`/api/v1/analysis-laboratory`, params);
            return response
        }catch (error) {
            return {error}
        }
    }
    async saveAnalysisLab(params){
        try{            
            const response = await axios.post(`/api/v1/analysis-laboratory`, params);
            return response
        }catch (error) {
            return {error}
        }
    }
    async updateAnalysis(params){
        try {            
            const response = await axios.put(`/api/v1/analysis/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async deleteAnalysis(params){
        try {            
            const response = await axios.delete(`/api/v1/analysis/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }

}