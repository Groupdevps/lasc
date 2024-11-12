import axios from "@/plugins/requests";

export default class DiagnosticAidService{ // results
    constructor(){

    }
    async getDiagnosticAids(params){
        try {            
            const response = await axios.get(`/api/v1/diagnostic-aid/`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async findInfo(params){
        try {            
            const response = await axios.get(`/api/v1/diagnostic-aid`, params); // Query : id / /${params.order}
            return response
        } catch (error) {
            return {error}
        }
    }
    
    async getInfo(params){
        try {            
            const response = await axios.get(`/api/v1/diagnostic-aid/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
    async saveInfo(params){
        try {            
            const response = await axios.post(`/api/v1/diagnostic-aid`, params);
            console.log("save lab ", params)
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateInfo(params){
        try {            
            const response = await axios.put(`/api/v1/diagnostic-aid/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
   
    async deleteInfo(params){
        try {            
            const response = await axios.delete(`/api/v1/diagnostic-aid/${params.id}`);
            return response
        } catch (error) {
            return {error}
        }
    }
    linkPdf(params){
        return `/api/v1/diagnostic-aid/${params.id}/pdf`
    } 
}