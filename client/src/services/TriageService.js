import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 
import EventBus from "@/event-bus";
export default class TriageService{
    constructor(){

    }

    async getTriage(id, params){
        try {
            const response = await axios.post("/api/v1/find/triage", params)
            return response;
        } catch (error) {
            console.warn("Error get triage ", error);
            return {error}
        }
    }
    async findInfo(id, params){
        try {
            const response = await axios.post("/api/v1/find/triage", params)
            return response;
        } catch (error) {
            console.warn("Error get triage ", error);
            return {error}
        }
    }
    async saveTriage(params){
        try {
            const response = await axios.post("/api/v1/triage", params)
            return response;
        } catch (error) {
            console.warn("Error create triage ", error);
            return {error}
        }
    }
    async updateTriage(id,params){
        try {
            const response = await axios.post("/api/v1/triage/"+id, params)
            return response;
        } catch (error) {
            console.warn("Error update triage ", error);
            return {error}
        }
    }
}