import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 
import EventBus from "@/event-bus";
export default class FamilyParents{
    constructor(){
        this.family = null;
    }
    getFamily(){
        return this.family;
    }
    async saveFamily(params){
        try{
            const {data} =  await axios.post("/api/v1/relationship/", params)
            // EventBus.$emit("notifications",{
            //     type : "success",
            //     msg  : "Familiar agregado",
            // })
            return data;
        }catch(er){
            console.warn("Error add parent ", er)
            // EventBus.$emit("notifications",{
            //     type : "error",
            //     msg  : "Hubo un error agregando al Familiar : " + er.response.data.isExist.validation || er.message,
            // })            
            return null
        }
    }
    async sendUpdate(params){
        try{
            const response = await axios.put("/api/v1/relationship/"+params.id, params)
            EventBus.$emit("notifications",{
                type : "success",
                msg  : "Informacion de familiar actualizada",
            })
            return response;
        }catch(er){
            console.warn("Error add parent ", er)
            // EventBus.$emit("notifications",{
            //     type : "error",
            //     msg  : "Hubo un error actualizando al Familiar : " + er.message,
            // })
            return null;
        }
    }
    async deleteFamily(id){
        try{
            const response = await axios.delete("/api/v1/relationship/"+id);           
            return response;
        }catch(error){       
            console.log("error 1 ", error)                 
            return {error};
        }
    }

    async getFamilyBySearch(params){
        try{
            const response = await axios.post("/api/v1/items/relationship", params);            
            return response;

        }catch(error){
            
            // EventBus.$emit("notifications",{
            //     type : "error",
            //     msg  : "Hubo un error buscando Familiares relacionados : " + error.message,
            // })
            return {error};
        }       
    } 

}