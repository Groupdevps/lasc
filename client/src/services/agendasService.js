import axios from "@/plugins/requests"
export default class agendaService{
    async getAgendaPost(uri, info){
        try{
            const data = await axios.post(uri,info);
            return data;
        } catch(e){
            console.warn("Error  post agenda ", e);
        }
    }
}