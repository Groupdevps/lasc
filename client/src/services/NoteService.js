import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 

export default class NoteService {
    constructor(){

    }
    async getInfo(params){
        try {
            const response = await axios.get(`/api/v1/note`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async findInfo(params){
        try {
            const response = await axios.get(`/api/v1/note`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async saveInfo(params){
        try {
            const response = await axios.post(`/api/v1/note`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async updateInfo(params){
        try {
            const response = await axios.put(`/api/v1/note/${params.id}`, params) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    async deleteInfo(params){
        try {
            const response = await axios.delete(`/api/v1/note/${params.id}`) 
            return response       
        } catch (error) {
            return {error}            
        }
    }
    linkPdf(params){
        let query="";
        if(params.atn){
            query+=(query?'&':'?')+"atn="+params.atn
        }
        if(params.ord){
            query+=(query?'&':'?')+"ord="+params.ord

        }
        if(params.type){
            query+=(query?'&':'?')+"type[]="+params.type
        }
        return `/api/v1/note-pdf/${query}`
    }
   
    
}