import axios from "@/plugins/requests";
import fields from "@/models/fields/Anexo9Fields.js"
import Helper from "@/helpers/helpers.js"

export default class Anexo9Service{
    constructor(){

    }
    
    async getAnexo9(params){
        try {
            // "/api/v1/technical-anex-2"
            const response = await axios.get(`/api/v1/technical-anex-9/generate/${params.AttentionId}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }

    async saveAnexo9(params){
        try {            
            const response = await axios.post(`/api/v1/technical-anex-9`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateAnexo9(params){
        try {            
            const response = await axios.put(`/api/v1/technical-anex-9/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async downloadAnexo9(params){
        try {            
            const response = await axios.get(`/api/v1/technical-anex-9/download/${params.id}`, { responseType: 'blob'});
            console.log("response ", response)
            return response
        } catch (error) {
            return {error}
        }
    }
    getFields(){
        return fields;
    }
    formatInfo(item, itemCenter, itemUser){
        // console.log("ANEXO 9", item?.HistoryPerson)
        if (item) {
            const typeID = fields.find(x=> x.key=='patientTypeId')
            let TypeIdTemp = "1";
            if (typeID) {
                const tempID=item?.HistoryPerson?.TypeID?.description
                if (typeID.list) {
                    const find=typeID.list.find(x=> tempID.includes(x.name) )
                    if(find){
                        TypeIdTemp = find.key;
                    }                    
                }
            }
            return {
                attentionNumber :  item?.id,
                date : Helper.getCurrentDate(),
                time : Helper.getCurrentTimeHS(),
                providerName : itemCenter?.name,
                // providerCode
                providerTypeId : itemCenter? "nit" : "cc",
                providerNumberId : itemCenter?.nit,
                providerAddress : itemCenter?.Address?.address,
                providerState: itemCenter?.Address?.State?.name,                
                providerCity : itemCenter?.Address?.City?.name,
                // providerPhoneCode
                providerPhoneNumber : itemCenter?.phone,
                payerName : item?.HistoryPerson?.currentAdministratorName,
                payerCode : item?.HistoryPerson?.administrator?.code,

                patientFullName : item?.HistoryPerson?.fullName,
                patientTypeId : TypeIdTemp,
                patientNumberId : item?.HistoryPerson?.numberId,
                patientBirthDate : item?.HistoryPerson?.birthDate,
                patientAddress : item?.HistoryPerson?.address,
                patientState : item?.HistoryPerson?.state, // for asignar
                patientCity : item?.HistoryPerson?.city,
                patientPhone : item?.HistoryPerson?.phone || item?.HistoryPerson?.cellphone,
                patientRegime : item?.HistoryPerson?.regime,
                patientServiceProviderName : item?.HistoryPerson?.currentAdministratorName,
                tutorFullName : item?.HistoryPerson?.companionName,
                // patientServiceProviderCode
                // attentionOrigin  // sl
                // triageClassification : 
                attentionDate : item?.assignedDate,
                attentionTime : item?.hour,
                // refferingProviderTransferred
                // refferingProviderName
                // refferingProviderCode
                // refferingProviderState
                // refferingProviderCity
                // attentionMotive
                // patientDestination
                informantName : itemUser.name,
                informantPosition : itemUser?.Role?.name,
                // informantPhoneCode
                informantPhoneNumber : itemUser?.phone,
                // informantPhoneExtension
                informantCellphone : itemUser?.cellphone,
            }
        }
    }

}