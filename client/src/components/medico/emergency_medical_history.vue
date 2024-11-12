<template>
	<FormSessionLayout
		:fields="info_fields"
		title=""
		subtitle="Historia Clinica"
		reference = "EmergencyMedicalHistoryForm"
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
					v-show="info.id"
				>
					<v-icon   class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-SubDiagnoseLists="{itemField}">
			<TableSubDiagnosticList :listToComponent="info.SubDiagnoseLists" :isConfirmDelete="true" :inputField="info" keyExt="repeated"></TableSubDiagnosticList>			
		</template>
		
	</FormSessionLayout>								
</template>
<script type="text/javascript">
import fields_params  	from "@/components/medico/js/emergency_medical_history_params.js"	
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import TriageService from "@/services/TriageService.js";
import EmergencyMedicalHistoryService from "@/services/EmergencyMedicalHistoryService.js"
import TableSubDiagnosticList from "@/components/info/TableSubDiagnosticListComponent.vue"
export default {
	name : "EmergencyMedicalHistory",
	props: ["ReduceSize"],
	components : {		
		FormSessionLayout, TableSubDiagnosticList,
	}, //components
	data : () => ({
		info 		 	: { assignedAdministrator : "", PhysicalExams : [], PersonalBackgrounds: [], SubDiagnoseLists:[], repeated : false},
		info_patient 	: {},
		loading 		: false,
		head   			: {
			title 	 : "Historia Clinica Urgencia",
			subtitle : "",
		},
		button : {
			title  : "Registrar", 
			color  : "primary",
			action : "save"
		},
		info_fields 		: fields_params,
		list_diagnosticos  	: [],
		list_observacions 	: [],
	}), // data
	watch:{
		
		"info.size" :function(val){			
			const { weight, size} = this.info;
			if (weight && size) {
				this.info.isc = Math.sqrt((parseInt(weight)*parseInt(size))/3600).toFixed(2);
			}		
		},
		"info.weight": function(val){			
			const { weight, size} = this.info;
			if (weight && size) {
				this.info.isc = Math.sqrt((parseInt(weight)*parseInt(size))/3600).toFixed(2);
			}
		},
	}, // watch
	mounted(){
		this.info.assignedDate 	= this.$ManagerSmith.getDateCurrent();
		this.info.hour 			= this.$ManagerSmith.getTimeCurrent();
		this.info.isc 			= 0;
		this.getInfo();
	}, // mounted

	computed:{
		currentPatient(){
			return this.$store.getters["infoPatient/patient"];
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("EmergencyMedicalHistory") 
		}
	},

	methods : {		
		renderListed(item){
			if (this[item]) {
				return this[item];
			}
		}, // render listed
		async getInfo(){
			try {
				this.loading = true;
				// this.info = this.$ManagerSmith.formatFormInfo(this.currentPatient, {...this.info}, "basic")
				const service = new EmergencyMedicalHistoryService();
				const res = await service.findInfo({ AttentionId : this.$route.params.id });
				// console.log("EMergency medical ", res, this.currentPatient);
				// this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});				
				if (res && res.data && res.data.UserId == this.$store.getters["auth/userId"]) {
					this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "emergency_medical_history");
					if (this.info.HistoryPerson) {
						this.info.HistoryPerson.assignedAdministrator = res.data && res.data.HistoryPerson && res.data.HistoryPerson.currentAdministratorName ? res.data.HistoryPerson.currentAdministratorName : "";
					}
				}else{
					const service = new TriageService();
					const res = await service.getTriage(null,{ AttentionId : this.$route.params.id });
					console.log("triage emergency ", res)
					if (res && res.data) {
						delete res.data.id;
						this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "emergency_medical_history");						
						delete this.info.id;
					}else{
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se No se encontro informacion de Historia o Triage"});

					}					
				}
			} catch (error) {
				console.warn("Error get info emergency medical ", error)
			}finally{
				this.loading = false;
			}
		},
		
		async save(){
			try {
				this.loading = true;


				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {					
					if (this.info && !this.info.typeAttention && (this.SubDiagnoseLists && this.SubDiagnoseLists.length > 0) ) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Tipo de atencion y diagnostico"});
					}else{
						const service = new EmergencyMedicalHistoryService();
						this.info.SubDiagnoseLists.map(x => { 
							x.AttentionId = this.$route.params.id; 
							return x 
						});
						this.info.AttentionId = this.$route.params.id; 
						this.info.UserId = this.$store.getters["auth/userId"]; 

						this.$store.commit("infoPatient/setSubDiagnoseLists", this.info.SubDiagnoseLists) 
						const res = await service.saveInfo(this.info);
						if (res && res.data) {
							this.info.PhysicalExams=res.data.PhysicalExams;
							this.info.id = res.data.id;
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
						}
					}
				}
			}catch(error){
				console.warn("Error save emergency medical ", error);
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
				const service = new EmergencyMedicalHistoryService();
				this.info.SubDiagnoseLists.map(x => { 
					x.AttentionId = this.$route.params.id; 
					return x 
				});
				this.info.AttentionId = this.$route.params.id; 
				this.$store.commit("infoPatient/setSubDiagnoseLists", this.info.SubDiagnoseLists) 
				
				const res = await service.updateInfo(this.info);
				if (res && res.data) {					
					this.$ManagerSmith.Sound.play("sound1")
					this.$EventBus.$emit("notifications", {
						type 	: "updated"
					});
				}
			}catch(error){
				console.warn("Error udpate emergency medical ", error);
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
				const service = new EmergencyMedicalHistoryService();
				const res = await service.downloadPDF({id : this.info.id}); // AttentionId : this.$route.params.id
			}catch(error){
				console.warn("Error download pdf ", error )
			}finally{
				this.loading=false;
			}
		},
		openPdf(){
			try{
				this.loading = true;				
				const service = new EmergencyMedicalHistoryService();
				this.$Helper.openLink(service.linkPdf({id : this.info.id})); // AttentionId : this.$route.params.id / this.$route.params.id
			}catch(error){
				console.warn("Error open pdf ", error )
			}finally{
				this.loading=false;
			}
		},
	}, // methods
};
</script>