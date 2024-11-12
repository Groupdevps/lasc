<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Notas Medicas"
		reference = "EvolutionNotesForm"
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
				<!-- <v-btn
					v-show="!loading"
					small
					color  = "primary"
					@click  = "info.id ? update() : save()"
				>
					{{ info.id ? $t('update') : $t('save') }}
				</v-btn> -->

				<!-- <v-btn        
					small
					color = "error"
					@click = "openPdf()"
					:loading = "loading"
					v-show = "info.id"
				>
					<v-icon   class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn> -->
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-ObservationEvolutionNotes="{ itemField }">
			<SubMedicalNotesComponent :infoInput="info" :currentPermission="currentPermission"></SubMedicalNotesComponent>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">
import field_params from "@/components/medico/js/medical_notes_params.js"
import SubMedicalNotesComponent from "@/components/medico/SubMedicalNotesComponent.vue"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import DiagnosesService from "@/services/DiagnosesService.js"
import MedicalNotesService from "@/services/NoteService.js"
export default {
	name : "EvolutionNotesComponent",
	props: ["ReduceSize"],
	components : {
		FormSessionLayout, SubMedicalNotesComponent
	}, //components
	data : (vm) => ({		
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrentHS(),	
			SubDiagnoseLists : [],		
			ObservationEvolutionNotes : [],
		},		
		fields 		: field_params,		
		diagnoses  	: [],		
		reference 	: 'MedicalNotes',		
		loading : false,
		
	}), // data

	mounted(){
		this.getInfo();
	}, // created

	computed : {
		currentPatient(){
			return this.$store.getters["infoPatient/patient"];			
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("MedicalNotes") 
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

		async getInfo(){
			try {
				this.loading = true;	
				const noteType = this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote(this.$route.name))?.id || undefined;

				const service = new MedicalNotesService();
				const res = await service.findInfo(
					{ atn : this.$route.params.id, type:noteType });//{ AttentionId : this.$route.params.id }
				if (res && res.data && res.data.length) {

					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.info.id || this.$route.params.id;
					this.info.id = res.data.id;					
					this.info.ObservationEvolutionNotes = res.data;	
					this.getDiagnoses();
				}else{
					this.getDiagnoses();
					if (this.currentPatient) {
						this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
						this.info.AttentionId = this.info.id || this.$route.params.id;
						delete this.info.id;
					}
				}
			} catch (error) {
				console.warn("Error get info  medical formulas ", error)
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
					if (this.info && this.info.ObservationEvolutionNotes && this.info.ObservationEvolutionNotes.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requieren Notas"});
					}else{
						const service = new MedicalNotesService();
						const res = await service.saveInfo(this.info);
						if (res && res.data) {
							this.info.id = res.data.id;
							this.getInfo();
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
						}
					}
				}
			}catch(error){
				console.warn("Error save medical fomulas ", error);
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
					if (this.info && this.info.ObservationEvolutionNotes && this.info.ObservationEvolutionNotes.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requieren Notas"});
					}else{
						const service = new MedicalNotesService();
						const res = await service.updateInfo(this.info);
						if (res && res.data) {					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
						}
					}
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
				const service = new MedicalNotesService();
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
				const service = new MedicalNotesService();
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