import axios from "@/plugins/requests"

export default class InvoiceService{
    async getInvoice(params){
        try {
            const response = await axios.get(`/api/v1/bill/find/${params.AttentionId}`); //  bill/find/detail
            return response;
        } catch (error) {
            return {error}
        }
    }
    async saveInvoice(params){
        try {
            const response = await axios.post(`/api/v1/bill`, params);
            return response;
        } catch (error) {
            return {error}
        }
    }
    async updateInvoice(params){
        try {
            const response = await axios.put(`/api/v1/bill/${params.id}`, params);
            return response;
        } catch (error) {
            return {error}
        }
    }

    async dowloadPdf(params){
        try {        
            const response = await axios.get(`/api/v1/bill/${params.id}/pdf`,/* { responseType: 'blob'} */);            //invoice/pdf
            return response;
        } catch (error) {            
            return {error}
        }
    }
    
    async generateInvoiceDetail(params){
        try {        
            const response = await axios.get(`/api/v1/bill/invoice/generate/${params.AttentionId}`);            
            return response;
        } catch (error) {            
            return {error}
        }
    }
    linkPdf(params){
        return `/api/v1/bill/${params.id}/pdf`
    }
    linkXml(params){
        return `/api/v1/bill/${params.id}/xml`
    }
}