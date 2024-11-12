import axios from "@/plugins/requests.js"
import Helper from "@/helpers/helpers.js" 
export default class PDFService{
    constructor(){
        this.info = null;
        this.type = "";
    }
    setInfo(item, typeForm){
        if(item){
            this.info = {...item}
            this.type = typeForm;
        }
    }

    async getPDF(){
        try {
            
            const {AttentionId} = this.info;        
            const response = await axios.post(
                `/api/v1/download/${this.type}`,
                { AttentionId }
                , 
                    { responseType: 'blob'}
                );
            if(response && response.data){
                Helper.downloadFileBlob(response.data, `${AttentionId}-${this.type}`, "pdf");
                return { data : "OK" };
            }
        } catch (error) {
            console.log("Error Download pdf ", this.type, error)
            return error = {...error, error: true}
        }
    }
}