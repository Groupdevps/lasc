import axios from "@/plugins/requests";
import fields from "@/models/fields/Anexo2Fields.js"
import Helper from "@/helpers/helpers.js"

export default class Anexo2Service{
    constructor(){

    }
    
    async getAnexo2(params){
        try {
            // "/api/v1/technical-anex-2"
            const response = await axios.get(`/api/v1/find/technical-anex-2/${params.AttentionId}`);
            return response
        } catch (error) {
            return {error}
        }
    }

    async saveAnexo2(params){
        try {            
            const response = await axios.post(`/api/v1/technical-anex-2`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async updateAnexo2(params){
        try {            
            const response = await axios.put(`/api/v1/technical-anex-2/${params.id}`, params);
            return response
        } catch (error) {
            return {error}
        }
    }
    async downloadAnexo2(params){
        try {            
            const response = await axios.get(`/api/v1/technical-anex-2/${params.AttentionId}/${params.id}`, params, { responseType: 'blob'});
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
        // console.log("ANEXO 2 ", item, itemCenter, itemUser)
        if (item) {
            return {
                attentionNumber :  item?.id,
                anexoDate : Helper.getCurrentDate(),
                anexoTime : Helper.getCurrentTimeHS(),
                // providerName
                // providerCode
                // providerTypeId
                // providerNumberId
                // providerAddress
                // providerState
                // providerCity
                // providerPhoneCode
                // providerPhoneNumber
                payerName : item?.HistoryPerson?.currentAdministratorName,
                payerCode : item?.HistoryPerson?.administrator?.code,
                patientFirstName : item?.HistoryPerson?.name,
                patientSecondName : item?.HistoryPerson?.secondName,
                patientLastName : item?.HistoryPerson?.lastName,
                patientSecondSurname : item?.HistoryPerson?.secondSurname,
                patientTypeId : item?.HistoryPerson?.TypeIDId ? String(item?.HistoryPerson?.TypeIDId) : "",
                patientNumberId : item?.HistoryPerson?.numberId,
                patientBirthDate : item?.HistoryPerson?.birthDate,
                patientAddress : item?.HistoryPerson?.address,
                patientState : item?.HistoryPerson?.state,
                patientCity : item?.HistoryPerson?.city,
                patientPhone : item?.HistoryPerson?.phone || item?.HistoryPerson?.cellphone,
                patientRegime : item?.HistoryPerson?.regime,
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
        return null
    }

}