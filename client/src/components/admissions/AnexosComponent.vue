<template>
    <v-container fluid>
        <v-row
            dense
            
        >
            <v-col cols = "12">
                <v-progress-linear
                    indeterminate
                    v-show = "loading"
                    color="teal"
                ></v-progress-linear>
                <v-btn-toggle mandatory>
                    
                    <template v-for="(btn, idx_btn) of buttons">
                        <v-tooltip bottom>
                            <template v-slot:activator = "{ on, attrs }">                        
                                <v-btn small :color="btn.color" v-on="on" v-bind="attrs" @click = "openAnexoForm(btn)" :ref="idx_btn + btn.key" :loading="btn.isLoading">
                                    {{ $t(btn.text) }}
                                </v-btn>
                            </template>
                            <span> {{ $t(btn.tooltip) }} </span>
                        </v-tooltip>
                    </template>
                </v-btn-toggle>
            </v-col>
            <v-col v-show = "show.form">

                
                <v-row 
                    dense
                    :style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${heightFields}px;`"

                >
                    <template v-for = "(item, idxItem) in fields ">
                        <v-col
                            :cols = "item.cols || 3"
                        >

                            
                            <span
                                v-if   = "item.type == 'title'"
                                :class = "item.class ? item.class : 'text--uppercase subtitle-2 fond-weight-medium'"
                            >	
                                {{ item.text }}
                                <v-divider 
                                    class = "pa-0 ma-0 primary"
                                    :inset = "true"
                                ></v-divider>
                            </span>
                            <v-text-field
                                dense
                                outlined
                                v-else-if = "['text','number'].includes(item.type)"
                                :label = "item.text"
                                v-model ="info[item.key]"
                                :type  = "item.type"
                                :readonly = "item.isOnlyRead"
                                @input 		 		= "(v) => info[item.key] = v.toUpperCase()"
                                class = "text-uppercase"

                            ></v-text-field> 
                            <!-- <v-text-field
                                dense
                                outlined
                                v-if       = "['number'].includes(item.type)"
                                v-model.number  = "info[item.key]"                            
                                :label = "item.text"
                                :readonly = "item.isOnlyRead"
                            ></v-text-field> -->

                            <v-textarea
                                dense
                                outlined                            
                                auto-grow                                      
                                rows 			= "2"
                                row-height 		= "25"
                                v-else-if		= "['textarea'].includes(item.type)"
                                :label 			= "$t(item.text)"
                                class 			= "text-uppercase"
                                v-model 		= "info[item.key]"
                                @input 		 	= "(v) => {info[item.key] = v.toUpperCase()}"                                
                            ></v-textarea>
                            <v-select
                                dense
                                outlined						
                                v-else-if			= "['select'].includes(item.type)"
                                v-model 			= "info[item.key]"
                                :label 				= "item.text"
                                :items 				= "renderListed(item)"
                                :item-text 			= "item.itemText"
                                :item-value 		= "item.itemValue"        
                                :prepend-inner-icon = "item.icon"
                                :return-object      = "item.returnObject"
                                @change             = "actions(item,$event)"
                                class = "text-uppercase"
                            ></v-select>
                            <DateAuto
                                :key 			   = "idxItem  + item.key"
                                v-else-if		   = "item.type == 'DateAuto'"
                                :inputField         = "info"
                                :keyField           = "item.key"
                            ></DateAuto>
                                <!-- :infoToComponent   = "item"
                                :infoToDate 	   = "info[item.key]"
                                @receiveInfo	   = "actions(item, $event)" -->
                            <dates
                                :key 				 = "idxItem  + item.key"
                                v-else-if		   = "['date_range','time_picker'].includes(item.type)"
                                :info_to_component = "item"
                                :info_to_dates 	   = "info[item.key]"
                                @receive_info	   = "actions(item, $event)"
                            ></dates>
                        
                            <component
                                v-else-if   = "item.type == 'table'" 
                                :is         = "item.component"
                                :listToComponent = "info[item.key]"
                                :infoToComponent = "info"
                                @receiveList     = "info[item.key] = $event" 
                            ></component>
                        <!--  <v-combobox
                                color 	= "primary"
                                dense
                                outlined						
                                v-else-if			= "['combobox'].includes(item.type)"
                                v-model 			= "info[item.key]"
                                :label 				= "item.text"
                                :items 				= "renderListed(item)"
                                :menu-props 		= "{ offsetY: true, maxHeight: '200px' }"
                                :item-text 			= "item.item_text"
                                :item-value 		= "item.item_value"        
                                :prepend-inner-icon = "item.icon"
                                append-icon 		= "mdi-chevron-down"
                                ></v-combobox> -->
                                <!-- @change     		= "actions(item_field, $event)" -->
                        </v-col>
                    </template>
                
                
                </v-row>
            </v-col>
            <v-col
                cols = "12"
                offset = "10"
                v-show ="show.form"
            >
            

                <v-btn
                    color = "primary"
                    @click = "actions(btnAction)"
                    :disabled = "disabledGen"
                    v-show = "show.save"
                > {{$t(btnAction.action)}}</v-btn>

            </v-col>
                    
            <v-col
                cols = "12"
                v-show = "show.preview"
            >
                <v-divider 
                    class = "pa-0 ma-1 primary"
                    :inset = "true"
                ></v-divider>
                <v-btn
                    color = "error"
                    @click = "previewPdf"

                > Previsualizar PDF</v-btn>
                <pdfViewer 
                    v-if = "show.viewerPdf"
                    :urlPdf = "uriPdf"                        
                ></pdfViewer>
            </v-col>
        </v-row>
    </v-container>
</template>    
<script>
import pdfViewer from "@/components/info/PdfViewer2Component.vue"
import anexo2Service from "@/services/Anexo2Service.js"
import anexo3Service from "@/services/Anexo3Service.js"
import anexo9Service from "@/services/Anexo9Service.js"
import furipsService from "@/services/FuripsService.js"
import soatService from "@/services/SoatService.js"
import careSatisfactionService from "@/services/CareSatisfactionService.js"
import preHospitalCareService from "@/services/PreHospitalCareService.js"
import furtranService from "@/services/FurtranService.js"

// import furtranService from "@/services/FurtranService.js"
import epicrisisService from "@/services/EpicrisisService.js"
import dates 			from "@/helpers/dates.vue"
import DateAuto 		from "@/components/info/DateAutoPlaceholderComponent.vue"
import AnexCups        from "@/components/admissions/AnexCupsComponent.vue"

export default {
    name: "AnexosComponent",
    props: ["infoToComponent"],
    components:{pdfViewer, dates, DateAuto, AnexCups},
    data: (vm) => ({
        info : {},
        show : {
            form: false,
            viewerPdf : false,
            preview : false,
            save  : false
        },
        btnAction: {
            action : "save",
        },
        buttons: [
            {
                key: "anexo_2",
                numbAnexo : 2,
                color: "primary",
                text: "anexo_2",
                tooltip: "download_anexo_2",
                isLoading : false,                
            },
            {
                key: "anexo_3",
                numbAnexo : 3,
                color: "primary",
                text: "anexo_3",
                tooltip: "download_anexo_3",
                isLoading : false,

            },
            {
                key: "anexo_9",
                numbAnexo : 9,
                color: "primary",
                text: "anexo_9",
                tooltip: "download_anexo_9",
                isLoading : false,

            },
            {
                key: "furips",
                numbAnexo : "furips",
                color: "primary",
                text: "furips",
                tooltip: "download_furrip",
                isLoading : false,
            },
            {
                key: "soat",
                numbAnexo : "soat",
                color: "primary",
                text: "soat",
                tooltip: "download_soat",
                isLoading : false,
            },
            {
                key: "prehospital_care",
                numbAnexo : "prehospital_care",
                color: "primary",
                text: "prehospital_care",
                tooltip: "download_prehospital_care",
                isLoading : false,
            },            
            {
                key: "furtran",
                numbAnexo : "furtran",
                color: "primary",
                text: "furtran",
                tooltip: "download_furtran",
                isLoading : false,
            },            
            {
                key: "care_satisfaction",
                numbAnexo : "care_satisfaction",
                color: "primary",
                text: "care_satisfaction",
                tooltip: "download_care_satisfaction",
                isLoading : false,
            },
            {
                key: "epicrisis",
                numbAnexo : "epicrisis",
                color: "primary",
                text: "epicrisis",
                tooltip: "download_epicrisis",
                isLoading : false,
            },
        ],
        fields : [
           /* {
                key : "AttentionId",
                type : "number",
                text : "Numero de Atencion",
                isOnlyRead : true,
            },
             {
                key : "origenAttention",
                type : "select",
                text : "Origen de la Atencion",
                list : "listOrigenAttentionOptions",
                returnObject : true,
                action : "setFieldComponent"
            },
            {
                key : "valueOrigen",
                type : "text",
                text : "",         
                item_text  : "id",
                item_value : "name",       
            } */
        ],
        listOrigenAttentionOptions  : [],
        loading : false,
        disabledGen : false,
        infoPdf : null,
        uriPdf : null,
        currentOption : null,
        infoFieldComponent : {},
        listDigitalSignature : [],
    }),
    mounted(){
        if (this.infoToComponent) {                       
            this.info.AttentionId = this.infoToComponent.id;            
        }
    },
    watch:{
        infoToComponent : function(val){                        
            if (val) {            
                this.info.AttentionId = val.id;                
            }
        }
    },
    computed:{
        heightFields: function(){
            return this.$vuetify.breakpoint.height-250;
        },
        currentPermission(){
            return this.$store.getters["auth/getPermission"]("AuthorizationView") // this.$route.name
        },
        currentCenter(){
            return this.$store.getters["infoCenter/getCenter"];
        },
        currentUser(){
            return this.$store.getters["auth/user"]
        }
    }, // computed
    methods: {

        actions(actionn, item){
            if(actionn){

                const {action} = actionn;
                if(action == "save"){
                    if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {                  
                        this.save();
                    }
                }else if(action == "update"){
                    if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {                                      
                        this.update();
                    }
                }else if(action == "setDate"){
                    if(actionn.key){
                        this.info[actionn.key] = item;
                    }
                }   
            }
        }, // actions
        async previewPdf(){
            if(this.currentOption){
                const {key} = this.currentOption;
                this.uriPdf = null
                this.show.viewerPdf = false;   

                // this.info={}; 
                // this.info.AttentionId=this.infoToComponent?.id;          
                
                if(this.infoPdf){
                    this.uriPdf = await this.$Helper.generatePdf(this.infoPdf, key);
                    this.show.viewerPdf = true;
                    
                }else if(["anexo_2","anexo_3","anexo_9","furips","soat", "prehospital_care", "care_satisfaction", "furtran", "epicrisis"].includes(key)){
                    let res = null;                
                    if(key == "anexo_2"){
                        const service = new anexo2Service();
                        res = await service.downloadAnexo2({...this.info})                                                
                    }else if(key == "anexo_3"){
                        const service = new anexo3Service();
                        res = await service.downloadAnexo3({...this.info})
                    }else if(key == "anexo_9"){
                        const service = new anexo9Service();
                        res = await service.downloadAnexo9({...this.info})
                    }else if(key == "furips"){
                        const service = new furipsService();
                        res = await service.downloadFurips({...this.info})
                    }else if(key == "soat"){
                        const service = new soatService();
                        res = await service.downloadSoat({...this.info})
                    }else if(key == "care_satisfaction"){
                        const service = new careSatisfactionService();
                        res = await service.downloadCareSatisfaction({...this.info})
                    }else if (key == "prehospital_care"){
                        const service = new preHospitalCareService();
                        res = await service.downloadPreHospitalCare({...this.info})
                    }else if(key == "furtran" ){
                        const service = new furtranService();
                        res = await service.downloadFurtran({...this.info})
                    }
                    else if(key == "epicrisis"){
                        const service = new epicrisisService();                        
                        res = await service.downloadEpicrisis({...this.info})
                    }            
                    
                    
                    if(res){
                        if(res.data && res.request){                            
                            this.uriPdf = res.request.responseURL;                            
                        }
                        this.show.viewerPdf = true;            
                    }
                }
            }
        }, 
        openAnexoForm(item){
            
            const {key} = item;
            this.currentOption = item;
            this.btnAction.action = "save";
            this.uriPdf = null;
            this.show.viewerPdf = false;

            if(!["epicrisis"].includes(key)){
                this.show.form = true;
                this.show.preview = false;

            }else{
                this.show.preview = true;
                this.show.form = false;   
                          

            }
            this.getAnexo(item);
        }, // 
         // for show view pdf
         async getAnexo(item){
            this.loading = true;
            const AttentionId = parseInt(this.$route.params.attention); //this.info
            this.show.save = true;
            if(["anexo_2","anexo_3","anexo_9","furips","soat", "care_satisfaction", "prehospital_care", "furtran"].includes(item.key)){
                let res=null;
                let infoTemp=null;                
                if(item.key == "anexo_2"){
                    const service = new anexo2Service();
                    res = await service.getAnexo2({AttentionId})
                    this.fields = service.getFields();         
                    if (!res?.data?.id) {
                        infoTemp=service.formatInfo(this.infoToComponent, this.currentCenter, this.currentUser);                        
                    }                    
                }else if(item.key == "anexo_3"){
                    const service = new anexo3Service();
                    res = await service.getAnexo3({AttentionId})
                    this.fields = service.getFields();
                    this.info.AnexCups = [];          
                    if (!res?.data?.id) {
                        infoTemp=service.formatInfo(this.infoToComponent, this.currentCenter, this.currentUser);                        
                    }          
                }else if(item.key == "anexo_9"){
                    const service = new anexo9Service();
                    res = await service.getAnexo9({AttentionId})
                    this.fields = service.getFields();   
                    if (!res?.data?.id) { infoTemp=service.formatInfo(this.infoToComponent, this.currentCenter, this.currentUser);}                 
                }else if(item.key == "furips"){
                    const service = new furipsService();
                    res = await service.getFurips({AttentionId})
                    this.fields = service.getFields();                    
                    if (!res?.data?.id) { infoTemp=service.formatInfo(this.infoToComponent, this.currentCenter, this.currentUser);}                 
                }else if(item.key == "soat"){
                    const service = new soatService();
                    res = await service.getSoat({AttentionId})
                    this.fields = service.getFields();                    
                    if (!res?.data?.id) { infoTemp=service.formatInfo(this.infoToComponent, this.currentCenter, this.currentUser);}                 
                }else if(item.key == "care_satisfaction"){
                    const service = new careSatisfactionService();
                    res = await service.getCareSatisfaction({AttentionId})
                    this.fields = service.getFields();                    
                    if (!res?.data?.id) { infoTemp=service.formatInfo(this.infoToComponent, this.currentCenter, this.currentUser);}                 
                }else if(item.key == "prehospital_care"){
                    const service = new preHospitalCareService();
                    res = await service.getPreHospitalCare({AttentionId})                    
                    this.fields = service.getFields();
                    if (!res?.data?.id) { infoTemp=service.formatInfo(this.infoToComponent, this.currentCenter, this.currentUser);}                 
                }else if(item.key == "furtran"){
                    const service = new furtranService();
                    res = await service.getFurtran({AttentionId})                    
                    this.fields = service.getFields();
                    if (!res?.data?.id) { infoTemp=service.formatInfo(this.infoToComponent, this.currentCenter, this.currentUser);}                 
                }
                
                if (infoTemp) {
                    this.info = {...this.info, ...infoTemp};
                }
                if(res && res.data){
                    const tempData = {};
                    for (const key in res.data) {                    
                        if (res.data[key]) {
                            tempData[key] = res.data[key]; // Asignar el valor válido
                        }
                    }
                    this.info = {...this.info, ...tempData};
                    console.log("RESULT ", this.info)
                    if(res.data.id){
                        this.btnAction.action = "update";    
                        this.show.preview = true;
                    }else{
                        this.show.preview = false;
                        
                    }
                    
                }else{                             
                    this.btnAction.action = "save";                        
                    this.show.preview = false;
                }
            }else if(item.key == "epicrisis"){
                const service = new epicrisisService();                
                const res = await service.getEpicrisis({AttentionId});
                if(res && res.data){
                    this.infoPdf = res.data; 
                }
                // this.infoPdf = "Example"
            }else{
                this.fields = [];
                this.show.save = false;
            }
            this.loading = false;

        }, // get Anexo
        async save(){ // for save and show view pdf
            const {key} = this.currentOption;
            delete this.info.id;
            if (["anexo_2","anexo_3","anexo_9","furips","soat", "care_satisfaction", "prehospital_care", "furtran"].includes(key)) {
                let res = null;
                let fieldNoti = "";
                this.info.UserId = this.$store.getters["auth/userId"];
                if(key == "anexo_2"){
                    const service = new anexo2Service();
                    res = await service.saveAnexo2({...this.info})
                    fieldNoti = "anexo 2"
                }else if(key == "anexo_3"){
                    const service = new anexo3Service();                       
                    res = await service.saveAnexo3({...this.info})
                    fieldNoti = "anexo 3"
                    
                }else if(key == "anexo_9"){
                    const service = new anexo9Service();            
                    res = await service.saveAnexo9({...this.info})
                    fieldNoti = "anexo 9"
                    
                }else if(key == "furips"){
                    const service = new furipsService();            
                    res = await service.saveFurips({...this.info})
                    fieldNoti = "FURIPS"
                    
                }else if(key == "soat"){
                    const service = new soatService();           
                    res = await service.saveSoat({...this.info})
                    fieldNoti = "SOAT"                    
                }else if(key == "care_satisfaction"){
                    const service = new careSatisfactionService();           
                    res = await service.saveCareSatisfaction({...this.info})
                    fieldNoti = "Formulario de Satisfaccion";                    
                }else if (key == "prehospital_care"){
                    const service = new preHospitalCareService();           
                    res = await service.savePreHospitalCare({...this.info})
                    fieldNoti = "Prehospitalario";                    
                }else if(key == "furtran"){
                    const service = new furtranService();           
                    res = await service.saveFurtran({...this.info})
                    fieldNoti = "FURTRAN";                    
                } 
                if(res){
                    if(res.error){
                        this.$EventBus.$emit("notifications",{
                            type : "error",
                            msg : "Error guardando informacion de " + fieldNoti
                        })  
                        this.show.preview = false;
                    }else{
                        if(res.data && res.data.id){
                            this.info.id = res.data.id ;
                            this.show.preview = true;
                            this.btnAction.action = "update";
                            this.$EventBus.$emit("notifications",{
                                type : "success",
                                msg : "Guardado informacion de anexo " + fieldNoti
                            })
                        }
                    }
                }
            }

        }, //
        async update(){ // for save and show view pdf
            const {key} = this.currentOption;
            if (["anexo_2","anexo_3","anexo_9","furips","soat", "care_satisfaction", "prehospital_care", "furtran"].includes(key)) {
                let res = null;
                let fieldNoti = "";
            
                if(key == "anexo_2"){
                    const service = new anexo2Service();
                    res = await service.updateAnexo2({...this.info})
                    fieldNoti = "anexo 2";                    
                }else if(key == "anexo_3"){
                    const service = new anexo3Service();
                    res = await service.updateAnexo3({...this.info})
                    fieldNoti = "anexo 3";                
                }else if(key == "anexo_9"){
                    const service = new anexo9Service();
                    res = await service.updateAnexo9({...this.info})
                    fieldNoti = "anexo 9";                
                }else if(key == "furips"){
                    const service = new furipsService();
                    res = await service.updateFurips({...this.info})
                    fieldNoti = "FURIPS";                
                }else if(key == "soat"){
                    const service = new soatService();
                    res = await service.updateSoat({...this.info})
                    fieldNoti = "SOAT";                
                }else if(key == "care_satisfaction"){                    
                    const service = new careSatisfactionService();
                    res = await service.updateCareSatisfaction({...this.info})
                    fieldNoti = "Formulario de Satisfaccion";      
                }else if(key == "prehospital_care"){
                    const service = new preHospitalCareService();
                    res = await service.updatePreHospitalCare({...this.info})
                    fieldNoti = "Prehospitalario";      
                }else if(key == "furtran"){
                    const service = new furtranService();
                    res = await service.updateFurtran({...this.info})
                    fieldNoti = "FURTRAN";      
                }
                if(res){
                    if(res.error){
                        this.$EventBus.$emit("notifications",{
                            type : "error",
                            msg : "Error actualizando informacion de" + fieldNoti
                        })  
                    }else{
                       
                        this.btnAction.action = "update";
                        this.$EventBus.$emit("notifications",{
                            type : "success",
                            msg : "Actualizado informacion de " + fieldNoti
                        })
                    }
                }
            }

        }, //
        renderListed(item){           
            if(item){
                if(item.global_list){
                    return this.$ManagerSmith.render_listed(item);
                }else if(item.list){
                    if(typeof item.list == "string"){
                        return this[item.list];
                    }else{
                        return item.list;
                    }
                } 
            } 
            return []
        }, //
       
        async downloadAnexo(item) {
            
            try {
                item.isLoading = true;
                const uri = `/api/v1/download/attached`;
                const params = {
                    AttentionId : parseInt(this.$route.params.attention),
                    attached    : item.numbAnexo,
                };
                
                const response = await this.$Axios.post(uri, params,  { responseType: 'blob'});
                console.log("file ", response);
                const blob = new Blob([response.data]);
                
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'anexo_2'+new Date().getTime().toString()+'.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);                
                item.isLoading = false;
            } catch (er) {
                
                console.warn("Error get anexo ", er);
                this.$EventBus.$emit({"type ": "error", msg : er});
                item.isLoading = false;
            }
        }, // download Anexo
    }

}
</script>
