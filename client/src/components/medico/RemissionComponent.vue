<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Remision"
		reference = "RemissionForm"
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
		<!-- <template v-slot:field-SubTreatments="{ itemField }">
			<SubTreatmentsComponent :infoInput="info"></SubTreatmentsComponent>
		</template> -->
	</FormSessionLayout>
</template>
<script 
	type = "text/javascript"
>
import fields_params  	from "@/components/medico/js/remission_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
//import SubTreatmentsComponent from "@/components/medico/SubTreatmentsComponent.vue"
import DiagnosesService from "@/services/DiagnosesService.js"
import RemissionService from "@/services/RemissionService.js"
import Anexo9Service from "@/services/Anexo9Service.js"


export default {
	name : "RemissionComponent",
	props: ["ReduceSize",],
	components : {
		FormSessionLayout
	}, //components
	data : (vm) => ({
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			SubDiagnoseLists : [],		
			// SubTreatments : [],
		},
		fields 		: fields_params,
		reference 	: 'Remission',
		loading : false,
		
	}), // data

	created(){

	}, // created

	
	mounted(){
		this.getInfo();
	}, // created

	computed : {
		currentPatient(){
			return this.$store.getters["infoPatient/patient"];			
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("RemissionFunction") 
		}
	}, // computed

	methods : {
		renderSubDiagnose(items){
			return items.map(x => { // diagnoses
				if ( x && x.SubDiagnose) {
					return x.SubDiagnose
				}
			}); 					
		},
		renderAnex9(){
			const serviceAnex = new Anexo9Service();
			let infoTemp=serviceAnex.formatInfo(this.currentPatient, this.$store.getters["infoCenter/getCenter"], this.$store.getters["auth/user"])
			this.info = {...this.info, ...infoTemp}
		},

		async getInfo(){
			try {
				this.loading = true;
				// this.info = this.$ManagerSmith.formatFormInfo(this.currentPatient, {...this.info}, "basic")
				const service = new RemissionService();
				const res = await service.findInfo({ AttentionId : this.$route.params.id });
				if (res && res.data) {
					// this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "medical_formulas");
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.info.id;
					this.info.id = res.data.id;					
					this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.SubDiagnoseLists);
					// this.info.SubTreatments = res.data.SubTreatments;
					// this.info.HistoryPerson.assignedAdministrator = res.data.HistoryPerson && res.data.HistoryPerson.currentAdministratorName ? res.data.HistoryPerson.currentAdministratorName : "";
					// console.log("this.info get info ", this.info)
					this.renderAnex9();
				}else{
					this.getDiagnoses();
					
					if (this.currentPatient) {
						this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
						this.info.AttentionId = this.info.id || this.$route.params.id;
						delete this.info.id;
					}
					this.renderAnex9();
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
					if (this.info && !this.info.observation ) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere observacion"});
					}else{
						const service = new RemissionService();
						const res = await service.saveInfo({
							observation: this.info.observation,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
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
					if (this.info && !this.info.observation) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere observacion"});
					}else{
						const service = new RemissionService();
						const res = await service.updateInfo({
							id : this.info.id,
							observation: this.info.observation,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],							
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
				console.warn("Error udpate " , error);
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
				const service = new RemissionService();
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
				const service = new RemissionService();
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