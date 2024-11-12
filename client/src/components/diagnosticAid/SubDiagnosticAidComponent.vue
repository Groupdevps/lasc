<template>
	<v-row dense>
		<v-progress-linear
			indeterminate
			color="cyan"
			:active="loading"
			absolute
		></v-progress-linear>
		<template v-for = "field in fields">
                
            <v-col cols="12">
                <v-textarea
                    dense
                    outlined
                    hide-details
                    auto-grow          
                    counter
                    rows            = "2"
                    row-height      = "25"
                    v-if            = "['textarea'].includes(field.type)"
                    :label          = "field.text"
                    class           = "text-uppercase"
                    v-model         = "info[field.key]"
                    @input          = "(v) => {info[field.key] = v.toUpperCase()}"
                    :disabled="isDisabled"
                ></v-textarea>
            </v-col>
        </template>
        <v-col class="d-flex justify-center">
            <v-btn color="primary" :disabled="isDisabled" :loading="loading" v-show="info.id  ? currentPermission.canEdit : currentPermission.canAdd" @click="info.id  ?   update() : save() "> {{ info.id ? $t("update") : $t("save") }}</v-btn>
            <v-btn color="error" class="ml-1" v-show="info.id" @click="openPdf"> <v-icon>mdi-download-circle</v-icon>{{$t("pdf") }}</v-btn>
        </v-col>		
	</v-row>
</template>
<script type="text/javascript">
    import DiagnosticAidService from "@/services/DiagnosticAidService.js"
	export default{
		name : "SubDiagnosticAidComponent",
		props : ["infoToComponent", "DiagnosticAidSelected", "currentPermission"],
		data : () =>({
			info : {},
			isDisabled : true,
			loading : false,
            fields : [
                { key : "report", type: "textarea", text : "REPORTE"},
                { key : "conclusion", type: "textarea", text : "CONCLUSION"},
                { key : "note", type: "textarea", text : "NOTA"},
            ],
		}),
		watch:{
            DiagnosticAidSelected(val){
                this.clearInputs();
                this.isDisabled = false;
                if (val && val.CupsList && val.CupsList.code) {                                   
                    this.getDiagnoticResult({
                        cup : val.CupsList.code, 
                        order : this.infoToComponent.orderNumber, 
                        attention : this.$route.params.AttentionId,
                        patient  : this.infoToComponent.numberId,
                    })
                }else{
                    this.isDisabled = true;
                }
            },
             
        }, // watch
		methods:{
            clearInputs(){
                this.info = {
                    report : "",
                    conclusion : "",
                    note : "",
                };
            },
			 async getDiagnoticResult(params){
                try {
                    this.loading = true;
                    
                    const service = new DiagnosticAidService();
                    service.findInfo(params).then(res=>{
                        if (res && res.data && res.data.length > 0) {
                            this.info = res.data[0]; //                            
                            // this.isDisabled = true;
                        }else{
                            this.$EventBus.$emit("notifications",{
                                type : "success",
                                msg : "No se encontraron Resultados"
                            });
                        }   
                    });                   
                } catch (error) {
                    console.warn("error get laboratorio ", error)
                    this.$EventBus.$emit("notifications",{
                        type : "error",
                        msg : "Obteniendo informacion de Ayuda diagnostica"
                    })
                }finally{
                    this.loading = false;
                }
            },
			async save(){
                try{
                    this.loading = true;
                    if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
                        if (this.info && !this.info.report ){
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Reporte"});
                        }else{

                            const service = new DiagnosticAidService();
                            const res = await service.saveInfo({
                            	AttentionId : this.$route.params.AttentionId, 
                            	OrderId: this.infoToComponent.orderId, 
                            	cup : this.DiagnosticAidSelected && this.DiagnosticAidSelected.CupsList ? this.DiagnosticAidSelected.CupsList.code : "",  
                            	report : this.info.report, 
                            	conclusion : this.info.conclusion, 
                            	note: this.info.note, 
                            	UserId : this.$store.getters["auth/userId"], 
                            	// image 
                            });
                            if (res && res.error) {
                                this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Guardando Resultado")});
                            }else
                            if (res && res.data) {
                            	this.info.id = res.data.id;
                                this.$EventBus.$emit("notifications",{
                                    type : "success",
                                    msg : "Resultado Guardado"
                                });
                            }
                        }
                    }

                }catch(error){
                    console.warn("Error save info  diagnostic aid ", error)
                    this.$EventBus.$emit("notifications",{
                        type : "error",
                        msg :  this.$Helper.renderErrorMessage(error, "Guardando Resultado")
                    });

                }finally{
                    this.loading = false;
                }
            },
            async update(){
            	try{
                    this.loading = true;
                    if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
                        if (this.info && !this.info.report ){
                            this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Reporte"});
                        }else{
                            const service = new DiagnosticAidService();
                            const res = await service.updateInfo({
                                id : this.info.id,
                            	AttentionId : this.$route.params.AttentionId, 
                            	OrderId: this.infoToComponent.orderId, 
                            	cup : this.DiagnosticAidSelected && this.DiagnosticAidSelected.CupsList ? this.DiagnosticAidSelected.CupsList.code : "",  
                            	report : this.info.report, 
                            	conclusion : this.info.conclusion, 
                            	note: this.info.note, 
                            	UserId : this.$store.getters["auth/userId"], 
                            	// image 
                            });
                             if (res && res.error) {
                                this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Resultado")});
                            }else
                            if (res && res.data) {
                            	this.info.id = res.data.id;
                                this.$EventBus.$emit("notifications",{
                                    type : "success",
                                    msg : "Resultado Actualizado"
                                });
                            }
                        }
                    }

                }catch(error){
                    console.warn("Error save info  diagnostic aid ", error)
                    this.$EventBus.$emit("notifications",{
                        type : "error",
                        msg :  this.$Helper.renderErrorMessage(error, "Actualizando Resultado")               
                    });

                }finally{
                    this.loading = false;
                }
            }, 
            openPdf(){
                try{
                    this.loading = true;                
                    const service = new DiagnosticAidService();                    
                    this.$Helper.openLink(service.linkPdf({id : this.infoToComponent?.orderNumber})); //this.info.id infoToComponent.orderId 
                }catch(error){
                    console.warn("Error open pdf ", error )
                }finally{
                    this.loading=false;
                }
            },       
		}
	}
</script>