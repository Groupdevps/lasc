import axios from "@/plugins/requests.js"
export default class CauService{
    constructor(){

    }
    async saveCau(params){
        try {
            const response = await axios.post("/api/v1/cau", params);
            return response; 
        } catch (error) {
            return {error}
        }
    }

    async searchCau(params){
        try {            
            const response = await axios.post("/api/v1/find/cau", params)
            return response;
        } catch (error) {
            return {error}
        }
    }
}
