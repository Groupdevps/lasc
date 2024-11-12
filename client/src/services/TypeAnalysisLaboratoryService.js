import axios from "@/plugins/requests";
export default class TypeAnalysisLaboratoryService{
    constructor(){}

    async getTypeAnalysis(params){
        try {            
            const response = await axios.get(`/api/v1/analysis-type`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async findTypeAnalysis(params){
        try {            
            const response = await axios.get(`/api/v1/analysis-type/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async getAnalysisLaboratory(params){
        try {            
            const response = await axios.get(`/api/v1/analysis-laboratory/labs`);// 
            return response
        } catch (error) {
            return {error}
        }
    }
    async findAnalysisLaboratory(params){
        try {            
            const response = await axios.get(`/api/v1/analysis-laboratory/labs`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveTypeAnalysis(params){
        try {            
            const response = await axios.post(`/api/v1/analysis-type`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateTypeAnalysis(params){
        try {            
            const response = await axios.put(`/api/v1/analysis-type/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async deleteTypeAnalysis(params){
        try {            
            const response = await axios.delete(`/api/v1/analysis-type/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }

}