import axios from "@/plugins/requests"

export default class InvoiceDetailsService{
    constructor(){}
    async getDetails(params){
        try {//'/:BillId/'
            const response = await axios.get(`/api/v1/detail`,params); 
            return response;
        } catch (error) {
            return {error}
        }
    }

    
    async saveDetailInvoice(params){
        try {        
            const response = await axios.post("/api/v1/detail",params);            
            return response;
        } catch (error) {            
            return {error}
        }
    }
    
    async editDetailInvoice(params){
        try {        
            const response = await axios.put(`/api/v1/detail/${params.id}`,params);            
            return response;
        } catch (error) {            
            return {error}
        }
    }
    async deleteDetail(params){
        try {        
            const response = await axios.delete(`/api/v1/detail/${params.id}`);            
            return response;
        } catch (error) {            
            return {error}
        }
    }
} 