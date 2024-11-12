<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Ayudas Diagnosticas"
		reference = "DiagnosticHelpForm"
		:inputField="info"
		:ReduceSize="ReduceSize"
	>
		<template v-slot:buttons>
			<v-progress-linear
				indeterminate
				color="cyan"
				:active="loading"
				absolute
			></v-progress-linear>
			<br>

			<v-spacer></v-spacer>
				<v-btn
					v-show="!loading"
					small
					color  = "primary"
					@click  = "info.id ? update() : save()"
				>
					{{ info.id ? $t('update') : $t('save') }}
				</v-btn>

				<v-btn        
					small
					color = "error"
					@click = "openPdf()"
					:loading = "loading"
					v-show =  "info.id"
				>
					<v-icon   class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-SubTreatments="{ itemField }">
			<SubDiagnosticHelpComponent :infoInput="info" :currentPermission="currentPermission"></SubDiagnosticHelpComponent>
		</template>
	</FormSessionLayout>
</template>
<script 
	type = "text/javascript"
>
import fields_params  	from "@/components/medico/js/diagnostic_help_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SubDiagnosticHelpComponent from "@/components/medico/SubDiagnosticHelpComponent.vue"
import DiagnosesService from "@/services/DiagnosesService.js"
import DiagnosticHelpService from "@/services/DiagnosticHelpService.js"
import OrderService 		from "@/services/OrderService.js"

export default {
	name : "DiagnosticHelpComponent",
	props: ["ReduceSize"],
	components : {
		FormSessionLayout, SubDiagnosticHelpComponent
	}, //components
	data : (vm) => ({
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			SubDiagnoseLists : [],		
			SubTreatments : [],
		},
		fields 		: fields_params,
		reference 	: 'DiagnosticHelp',
		loading : false,
		
	}), // data

	created(){

	}, // created

	watch:{
		"typesIsLoaded"(val){
			if (val) {
				this.getInfo();
			}
		}
	},
	mounted(){
		if (this.typesIsLoaded) {						
			this.getInfo();
		}
	}, // created

	computed : {
		currentPatient(){
			return this.$store.getters["infoPatient/patient"];			
		},
		typesOrder(){							
			return this.$store.getters["listTypesOrder/list"];
		},
		typesIsLoaded(){
			return this.$store.getters["listTypesOrder/isLoaded"]
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("DiagnosticHelp") 
		}
	}, // computed

	methods : {
		renderSubDiagnose(items){
			return items.map(x => { // diagnoses
				if ( x && x.SubDiagnose) {
					return  {...x.SubDiagnose, SubDiagnoseId : x.id}
				}
			}); 					
		},

		async getInfo(){
			try {
				this.loading = true;
				// this.info = this.$ManagerSmith.formatFormInfo(this.currentPatient, {...this.info}, "basic")
				const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN AYUDA DIAGNOSTICA");								
				const service = new OrderService();
				const res = await service.findInfo({ 
					AttentionId : this.$route.params.id,  
					TypeOrder : typeOrder && typeOrder.length > 0 ? typeOrder[0].id: null, 
				});				
				if (res && res.data) {
					// this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "medical_formulas");
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					delete this.info.id;
					// this.info.id = res.data.id;
					// console.log("this.info ", this.info)
					if (res.data.SubDiagnoseLists && res.data.SubDiagnoseLists.length > 0) {
						this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.SubDiagnoseLists);
					}else{
						this.getDiagnoses();
					}
					// this.info.SubTreatments = res.data.SubTreatments;
					// this.info.HistoryPerson.assignedAdministrator = res.data.HistoryPerson && res.data.HistoryPerson.currentAdministratorName ? res.data.HistoryPerson.currentAdministratorName : "";
					// console.log("this.info get info ", this.info)
				}else{
					this.getDiagnoses();
					
				}
			} catch (error) {
				console.warn("Error get info  "+ this.reference, error)
			}finally{
				this.loading = false;
			}
		},
		async getDiagnoses(){
			try{
				const service = new DiagnosesService();
				const res  = await service.findInfo({ AttentionId : this.$route.params.id })
				if (this.currentPatient) {
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					delete this.info.id;
				}
				if (res && res.data && res.data.rows && res.data.rows.length > 0) {
					this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.rows);
				}
			}catch(error){
				console.warn("Error get diagnoses ", error)
			}finally{

			}
			
		}, // get diagnoses
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {	
					if (this.info && this.info.SubTreatments && this.info.SubTreatments.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requieren Notas"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN AYUDA DIAGNOSTICA");								
						const service = new OrderService();
						const res = await service.saveInfo({
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,
							CenterId : this.info.CenterId,
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
							OrderTypeId : typeOrder && typeOrder.length > 0 ? typeOrder[0].id : null,	
							OrderSubDiagnoses: this.info.SubDiagnoseLists.length > 0  ?  this.info.SubDiagnoseLists : [],		
							OrderCupsLists : this.info.SubTreatments,
						});
						if (res && res.data) {
							this.info.id = res.data.id;
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
						}
					}
				}
			}catch(error){
				console.warn("Error save  "+this.referencee, error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: error
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {	
					if (this.info && this.info.SubTreatments && this.info.SubTreatments.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requieren Notas"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN AYUDA DIAGNOSTICA");								
						const service = new OrderService();
						const res = await service.updateInfo({
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,
							CenterId : this.info.CenterId,
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
							OrderTypeId : typeOrder && typeOrder.length > 0 ? typeOrder[0].id : null,	
							OrderSubDiagnoses: this.info.SubDiagnoseLists.length > 0  ?  this.info.SubDiagnoseLists : [],		
							OrderCupsLists : this.info.SubTreatments,
						});
						if (res && res.data) {					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
						}
					}
				}
			}catch(error){
				console.warn("Error udpate "+this.referencee , error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: error
				});
			}finally{
				this.loading = false;
			}
		},
		async downloadPDF(){
			
			try{
				this.loading = true;				
				const service = new OrderService();
				const res = await service.downloadPDF({id : this.info.id}); // this.$route.params.id

			}catch(error){
				console.warn("Error download pdf ", error )
			}finally{
				this.loading=false;
			}
		},
		openPdf(){
			try{
				this.loading = true;				
				const service = new OrderService();
				this.$Helper.openLink(service.linkPdf({id : this.info.id})); // this.$route.params.id

			}catch(error){
				console.warn("Error open pdf ", error )
			}finally{
				this.loading=false;
			}
		},
		
	}, // methods
};
</script>