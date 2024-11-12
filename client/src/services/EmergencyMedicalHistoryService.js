import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 

export default class EmergencyMedicalHistoryService {
    constructor(){

    }
    async getInfo(params){
        try {
            const response = await axios.get(`/api/v1/clinic-history/`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async getListInfo(params){
        try {
            const response = await axios.get(`/api/v1/emh/h/${params.patient}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }

    async findInfo(params){
        try {
            const response = await axios.post(`/api/v1/find/emergency-medical-history/`, params) //clinic-history
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveInfo(params){
        try {
            const response = await axios.post(`/api/v1/emergency-medical-history`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateInfo(params){
        try {
            const response = await axios.put(`/api/v1/emergency-medical-history/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteInfo(params){
        try {
            const response = await axios.delete(`/api/v1/emergency-medical-history/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }    
    async deletePhisicalExam(params){
        try {
            const response = await axios.delete(`/api/v1/physical-exam/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    } 
    async deletePersonalBackground(params){
        try {
            const response = await axios.delete(`/api/v1/personal-background/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async downloadPDF(params){
        try {            
            const {id} = params; //AttentionId
            const response = await axios.requestAxios({
                url: `/api/v1/emergency-medical-history/${id}/pdf`,
                method: 'GET',
                responseType: 'blob', // Obtener el contenido como Blob
                headers: {
                    'Accept': 'application/pdf' // Asegurarse de aceptar el tipo PDF
                }
            });           
            if(response && response.data){                
                Helper.downloadFilePdf(response.data, `${id}-emergency-medical-history.pdf`);
                return { data : "OK" };
            }
        } catch (error) {
            console.log("Error Download pdf ", this.type, error)
            return error = {...error, error: true}
        }
    }

    linkPdf(params){
        return `/api/v1/emergency-medical-history/${params.id}/pdf`
    }
    

}