import axios from "@/plugins/requests";

export default class AnalysisLaboratoryService{
    constructor(){

    }
    async getAnalysisLaboratories(params){
        try {            
            const response = await axios.get(`/api/v1/analysis-laboratories/`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async searchAnalysisLaboratories(params){
        try {            
            const response = await axios.get(`/api/v1/find-analysis-laboratories/`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async getAnalysisLaboratory(params){
        try {            
            const response = await axios.get(`/api/v1/analysis-laboratory/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveAnalysisLaboratory(params){
        try {            
            const response = await axios.post(`/api/v1/analysis-laboratory`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async findAnalysisLaboratory(params){
        try {            
            const response = await axios.get(`/api/v1/analysis-laboratory`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateAnalysisLaboratory(params){
        try {            
            const response = await axios.put(`/api/v1/analysis-laboratory/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
   
    async deleteAnalysisLaboratory(params){
        try {            
            const response = await axios.delete(`/api/v1/analysis-laboratory/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
}