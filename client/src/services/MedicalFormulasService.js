import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 

export default class MedicalFormulasService {
    constructor(){

    }
    async getInfo(params){
        try {
            const response = await axios.get(`/api/v1/medical-formula`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async findInfo(params){
        try {
            const response = await axios.post(`/api/v1/find/medical-formula/`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveInfo(params){
        try {
            const response = await axios.post(`/api/v1/medical-formula`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveSubInfo(params){
        try {
            const response = await axios.post(`/api/v1/medicine`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    
    async updateInfo(params){
        try {
            const response = await axios.put(`/api/v1/medical-formula/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateSubInfo(params){
        try {
            const response = await axios.put(`/api/v1/medicine/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteInfo(params){
        try {
            const response = await axios.delete(`/api/v1/medical-formula/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteSubInfo(params){
        try {
            const response = await axios.delete(`/api/v1/medicine/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async downloadPDF(params){
        try {            
            const {AttentionId} = params;                             
            const response = await axios.requestAxios({
                url: `/api/v1/medical-formula/${params.id}/pdf`,
                method: 'GET',
                responseType: 'blob', // Obtener el contenido como Blob
                headers: {
                    'Accept': 'application/pdf' // Asegurarse de aceptar el tipo PDF
                }
            });           
            if(response && response.data){ 
                Helper.downloadFilePdf(response.data, `${params.id}-medical-formula.pdf`);
                return { data : "OK" };
            }
        } catch (error) {
            console.log("Error Download pdf ", this.type, error)
            return error = {...error, error: true}
        }
    }
    linkPdf(params){
        return `/api/v1/medical-formula/${params.id}/pdf`
    }
    

}