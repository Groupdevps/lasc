<template>
    <v-data-table
        fixed-header
        outlined
        hide-default-footer
        class = "elevation-5"
        :headers = "headers"
        item-key = "idx"
        :items = "listRender"
        :loading = "loading"
        loading-text 		= "CARGANDO... POR FAVOR ESPERE"
	    :height 			= "renderHeightTable+'px'"

    >        
        <template v-slot:footer>
            <v-row dense class="pa-1">
                <template v-for = "(field, idxField) of fields">
                    <v-col :cols="field.cols || 'auto'">
                        <v-text-field
                            dense
                            outlined
                            hide-details
                            v-if = "['text'].includes(field.type)"                        
                            v-model = "infoInput[field.key]"
                            :label = "field.text"
                            :disabled = "field.isDisabled || isDisabled"
                            @input = "v => infoInput[field.key] = v.toUpperCase()"
                        ></v-text-field>
                    </v-col>
                </template>     
                <v-col cols="1">
                    <v-btn color = "primary" @click = "infoInput.id ? update() : saveResult()" :loading = "loading"> {{ $t('save') }}</v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn color = "error" @click = "openPdf()" v-show="infoInput.id"  :loading = "loading"> <v-icon>mdi-download-circle</v-icon> PDF</v-btn>
                </v-col>
            </v-row>
        </template>
        <template v-slot:item.result="{item}">
            <v-text-field
                dense                
                outlined                       
                hide-details
                v-model = "item.result"
                label = ""                             
                @input = "v => item.result = v.toUpperCase()" 
                :disabled = "isDisabled"  
            ></v-text-field>            
            <!-- @keyup.enter="saveResultDetail(item)" -->
        </template>
    </v-data-table>
</template>
<script >
import LaboratoryResultService from "@/services/LaboratoryResultService.js" // laboratory result / form laboratory result
import AnalysisResultService from "@/services/AnalysisResultService.js" // sub resultados
import AnalysisLaboratoryService from "@/services/AnalysisLaboratoryService.js"  // fields sub results

    export default{
        name: "ResultLaboratoryComponent",
        props : ["LaboratorySelected", "infoToComponent", "currentPermission"],
        data:()=>({
            Ref : "LaboratoryForm",
            bus : {},   
            list: [],
            infoInput : {},
            infoLaboratory : {},
            title : "Nombre laboratorio",
            loading : false,
            btnAction : { action : "save", item:null},
            listTypeAnalysis : [],
            listTypeFields : [],
            listTypeResults : [],
            listDescriptions : [],      
            isDisabled : false,
            loadingField :{
                analysis : false,
                reference: false,                
            },      
            searchField : {
                analysis : "",
                reference: "",                
            },
            headers : [
                // {text : "Analisis", value : "typeAnalysis"},
                {text : "ANALISIS", value : "name"},
                {text : "RESULTADO", value : "result"},
                {text : "UNIDADES", value : "units"},             
                {text : "VALORES DE REFERENCIA", value : "referenceValue"},
            ],
           
            fields : [                
                // { key : "analysis" , type : "autocomplete", text : "Tipo de Analisis", itemValue : "id", itemText : "name", list:"listTypeAnalysis", action : "changeAnalysis" },
                // { key : "field" , type : "autocomplete", text : "Campo", itemValue : "id", itemText : "name", list:"listTypeFields" },
                // { key : "result" , type : "text", text : "Resultado", itemValue : "id", itemText : "name", list:"" },
                // { key : "units" , type : "text", text : "Unidades", isDisabled : true },
                // { key : "reference" , type : "text", text : "Valor referencia", itemValue : "id", itemText : "reference", list:"listTypeAnalysis", isDisabled : true},
                { key : "metodology", type : "text", text : "METODOLOGIA"},
                { key : "note", type : "text", text : "NOTA", cols: 5},

            ],
        }), 
        watch:{
            LaboratorySelected(val){
                if (val && val.CupsList && val.CupsList.code) {                                   
                    this.getLaboratoryResult({
                        cup : val.CupsList.code, 
                        order : this.infoToComponent.orderNumber, 
                        attention : this.$route.params.attention,
                        patient  : this.infoToComponent.numberId,
                    })
                }
            },
             
        }, // watch
        
        computed:{
            listRender: function(){
                return this.list;
            },
            renderHeightTable: function(){
                return this.$vuetify.breakpoint.height - 430;
            },            
        }, // computed
        methods:{           
        
            confirmEdit(item){
                this.infoInput = {...item};
                this.btnAction.item = item;
                this.btnAction.action = "edit";
            },
            confirmDelete(item){
                this.btnAction.item = item;
                this.$EventBus.$emit("notifications", {
                    type : "confirm_delete",
                    ID : this.Ref,
                    action : this.deleteAnalysisLab
                })
            },
            async querySelectionsAnalysis(val){
                this.loadingField.analysis = true;
                try {
                    const service = new typeAnalysisLaboratoryService();
                    const res = await service.getTypeAnalysis({name : val});
                    if (res && res.data && res.data.length > 0) {
                        this.listTypeAnalysis = res.data;
                    }
                } catch (error) {
                    
                }
                this.loadingField.analysis = false;

            },

            async getLaboratoryResult(params){
                try {
                    this.loading = true;
                    
                    const service = new LaboratoryResultService();
                    service.searchLaboratory(params).then(res=>{
                        if (res && res.data && res.data.length > 0) {
                            this.infoInput = res.data[0]; //
                            this.list =  this.infoInput && this.infoInput.AnalysisResults && this.infoInput.AnalysisResults.length > 0 ? 
                                this.infoInput.AnalysisResults.map(x=> {                                    
                                    const { Analysis} = x.AnalysisLaboratory;
                                    return{
                                        id: x.id,
                                        result: x.result,
                                        AnalysisLaboratoryId : x.AnalysisLaboratoryId,
                                        ...Analysis,
                                    }
                                }) : [];                            
                                this.isDisabled = true;
                        }else{                            
                            this.getAnalysistResult({cup: params.cup })
                        }   
                    });                   
                } catch (error) {
                    console.warn("error get laboratorio ", error)
                    this.$EventBus.$emit("notifications",{
                        type : "error",
                        msg : "Obteniendo informacion de Laboratorio"
                    })
                }finally{
                    this.loading = false;
                }
            },
            

            async saveResult(){
                try{
                    this.loading = true;            
                    if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {  
                        let results = [];
                        if (this.listRender && this.listRender.length > 0) {
                            results = this.listRender.map(x=> {                                
                                return {
                                    AnalysisLaboratoryId : x.id,
                                    result : x.result, 
                                }   
                            })
                        }
                        if (this.listRender && (this.listRender.length == 0 || this.listRender.some(x=> x.result==""))) {
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requieren los resultados"});
                        }else{                            
                           
                            const service = new LaboratoryResultService();                    
                            const res = await service.saveLaboratory({
                                AttentionId : parseInt(this.$route.params.attention), 
                                numberId : this.infoToComponent.numberId, 
                                UserId : this.$store.getters["auth/userId"], 
                                CenterId : this.infoToComponent.CenterId, 
                                cup : this.LaboratorySelected.CupsList && this.LaboratorySelected.CupsList.code ? this.LaboratorySelected.CupsList.code : "",
                                OrderId : this.LaboratorySelected.OrderId, 
                                metodology : this.infoInput.metodology,
                                note : this.infoInput.note,
                                PersonId : this.infoToComponent.PersonId,
                                AnalysisResults : results
                            });                                           
                            if (res && res.data) {
                                this.infoInput.id = res.data.id;
                                this.$EventBus.$emit("notifications",{
                                    type : "success",
                                    msg : "Resultado Guardado"
                                });
                            }
                        }
                    }
                }catch(error) { 
                    console. warn("Error save result ", error)            
                    this.$EventBus.$emit("notifications",{
                        type : "error",
                        msg : "Guardando Resultado"
                    });
                }finally{   
                    this.loading = false;
                }            
            },
            async getAnalysistResult(params){ // get sub results
                try{
                    this.loading = true; 
                    const service = new AnalysisLaboratoryService()
                    const res = await service.findAnalysisLaboratory(params);
                    if (res && res.data && res.data.length > 0) {
                        this.list = res.data.map((x,idx)=> { 
                            delete x.id; 
                            return { ...x.Analysis, result: "", idx} 
                        });
                    }else{
                        this.list = [];
                    }
               }catch(error){
                console.warn("error get form analisis ", error)
               }finally{
                    this.loading = false;
               } 
            },
            async update(){
                try {
                    this.loading = true;
                    if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {  
                        const service = new LaboratoryResultService();
                        const res = await service.updateLaboratory({
                            id : this.infoInput.id,
                            AttentionId : this.$route.params.attention, 
                            numberId : this.infoToComponent.numberId, 
                            UserId : this.$store.getters["auth/userId"], 
                            CenterId : this.infoToComponent.CenterId, 
                            cup : this.LaboratorySelected.CupsList && this.LaboratorySelected.CupsList.code ? this.LaboratorySelected.CupsList.code : "",
                            OrderId : this.LaboratorySelected.OrderId, 
                            metodology : this.infoInput.metodology,
                            note : this.infoInput.note
                        });
                        if (res && res.data) {                    
                            this.$EventBus.$emit("notifications",{
                                type : "success",
                                msg : "Resultado Actualizado"
                            });
                            
                        }
                    }
                } catch (error) {
                    this.$EventBus.$emit("notifications",{
                        type : "error",
                        msg : "Actualizando Resultado"
                    })
                }finally{                    
                    this.loading = false;
                }
            },
     
            async saveResultDetail(item){ // sub result
                this.loadingField.analysis = true;
                try {
                    const service = new AnalysisResultService();// analysisLaboratoryService
                    const res = await service.saveInfo({
                        AnalysisLaboratoryId : item.id, 
                        LaboratoryResultId: this.infoInput.id,
                        result : item.result
                    });                    
                } catch (error) {
                    console.warn("Error update type analysis ", error);
                }
                this.loadingField.analysis = false;
            },       

            openPdf(){
                try{
                    this.loading = true;                
                    const service = new LaboratoryResultService();
                    this.$Helper.openLink(service.linkPdf({id : this.infoToComponent?.orderId})); // "laboratory"/  this.$route.params.id /orderId

                }catch(error){
                    console.warn("Error open pdf ", error )
                }finally{
                    this.loading=false;
                }
            },       
        }, // methods
       
        
    }
</script>