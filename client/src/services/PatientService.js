import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 
import EventBus from "@/event-bus";

export default class PatientService{
    constructor(){        
        this.patient = null;
    }

    getPatient(){
        return this.patient;
    }

    async fetchByParams(params){
        try{
            const response  = await axios.post("/api/v1/find/person", params)
            return response;
        }catch(er){
            console.warn("Error search patient ", er)
            return null;
        }
    }
    async fetchByParamsName(params){
        try{
            const response  = await axios.post("/api/v1/find/person/name", params)
            return response.data;
        }catch(er){
            console.warn("Error search patient ", er)
            return null;
        }
    }
    async updatePatient(id,params){
        try{
            const response = await axios.put("/api/v1/person/"+id, params)            
            return response;
        }catch(er){
            console.warn("Error update patient ", er)
            return er            
        }
    }

    async savePatient(params){
        try {
            const response = await axios.post("/api/v1/person", params)
            return response;
        } catch (error) {
            console.warn("Error save ", error)           
            return error;
        }
    }

}