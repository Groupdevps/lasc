import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 
import EventBus from "@/event-bus";

export default class AttentionService{
    constructor(){

    }

    async saveAttention(params){
        try {
            const response = axios.post("/api/v1/attention", params)
            return response;
        } catch (error) {
            return {error}
        }
    }
    async updateAttention(params){
        try {
            const response = axios.put(`/api/v1/attention/${params.id}`, params)
            return response;
        } catch (error) {
            return {error}
        }
    }
    async getAttentions({page, itemsPerPage}){
        try{
            let api = `/api/v1/attentions/`
            if(page) api += `?page=${page}`;            
            if(itemsPerPage) api += `&size=${itemsPerPage}`;
            const response = await axios.get(api);
            return response;
        }catch(error){
            return {error}
        }
    }
    async getAttentionById(id){
        try {
            const response = await axios.get(`/api/v1/attention/${id}`)
            return response;
        } catch (error) {
            return {error}
        }
    }

    async getCensus(id){
        try {
            const response = await axios.get(`/api/v1/census/`)
            return response;
        } catch (error) {
            return {error}
        }
    }

    linkPdfCensus(params){
        return `/api/v1/census/pdf`
    }
    async searchAttentionsByParams(params,{page=null, itemsPerPage=null}){
        try {
            let api = `/api/v1/find/attentions/`
            if(page) api += `?page=${page}`;            
            if(itemsPerPage) api += `&size=${itemsPerPage}`;
            const response = await axios.post(api, params);
            return response;

        } catch (error) {
            return {error}
        }
    }
    // for folder Formats
    formatCAU(item){
        if (item) {

            const {assignedDate,hour,createdAt,updatedAt,  CAU}= item;
            let Cau = "Por vencer";
            let timeCAU = "En ";
            let colorCAU = "success";
             if(!CAU){
                const dateEnd = Helper.addTimeWithMoment(createdAt, 1, 'days')
                const nowtDate = Helper.currentDateMoment();
                const diff = dateEnd.diff(nowtDate, 'hours');                
                if(diff > 0){                    
                    timeCAU = `En ${diff} horas`;
                    colorCAU = "warning";                    
                }else{
                    Cau = "Vencido";
                    timeCAU = `Hace ${Math.abs(diff)} horas`;
                    colorCAU = "error";
                } 
            }else{ 
                timeCAU    = "En fecha";
                Cau = "Ingresado";                
            }

            return {
                ...item, 
                colorCAU, 
                CAU : Cau, 
                timeCAU,  
                timeElapsed : Helper.timeElapsedInType(`${updatedAt}`) + ' Minutos', // ${assignedDate} ${hour}
            }
        }
    }
    formatAttentionAgenda(item){
        if (item){
            const {assignedDate,hour, createdAt, CAU, HistoryPerson } = item;
            let Cau = "Por vencer";
            let timeCAU = "En ";
            let colorCAU = "success";
            let regime = "N/A";
            let fullName = "";
            if(!CAU){
                const dateEnd = Helper.addTimeWithMoment(createdAt, 1, 'days')
                const nowtDate = Helper.currentDateMoment();
                const diff = dateEnd.diff(nowtDate, 'hours');                
                if(diff > 0){                    
                    timeCAU = `En ${diff} horas`;
                    colorCAU = "warning";                    
                }else{
                    Cau = "Vencido";
                    timeCAU = `Hace ${Math.abs(diff)} horas`;
                    colorCAU = "error";
                } 
            }else{ 
                timeCAU    = "En fecha";
                Cau = "Ingresado";                
            }
            if(HistoryPerson){

                fullName = HistoryPerson.name;
                // if (HistoryPerson.secondName ) fullName += " " + HistoryPerson.secondName;                 
                if(HistoryPerson.lastName) fullName += " " + HistoryPerson.lastName;
                // if (HistoryPerson.secondSurname ) fullName += " " + HistoryPerson.secondSurname;

                regime = HistoryPerson.regime;
                
            }
            return {
                ...item,
                timeElapsed : Helper.timeElapsedInType(`${assignedDate} ${hour}`) + ' Minutos',
                colorCAU,
                CAU : Cau,
                timeCAU,
                regime,
                fullName,
            }
        }
    }

}