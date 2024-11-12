<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference="NursingNotesForm"
		:inputField="info"
		:ReduceSize="ReduceSize==360? 420 : 100"
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
					:disabled ="isDisabled"									
				>
					{{ info.id ? $t('update') : $t('save') }}
				</v-btn> -->

				<!-- <v-btn        
					small
					v-show="!loading"
					color = "success"
					@click = "setStatusNursing()"
					:loading = "loading"	
					:disabled ="isDisabled"				
				>
					
					AlTA ENFERMERIA
				</v-btn> -->
				<v-btn        
					small
					color="error"
					@click="openPdf()"
					:loading="loading"
					v-show="info.ObservationEvolutionNotes.length"
				>
					<v-icon class="mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-ObservationNursings="{ itemField }">
			<SubNursingNotesComponent :infoInput="info" :isDisabledActions="isDisabled" :currentPermission="currentPermission"></SubNursingNotesComponent>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">
import field_params from "@/components/nursing/js/nursing_notes_params.js"

import SubNursingNotesComponent from "@/components/nursing/SubNursingNotesComponent.vue"
import NoteService from "@/services/NoteService.js"// 

import FormSessionLayout from "@/layouts/FormSessionLayout.vue"

import DiagnosesService from "@/services/DiagnosesService.js"
import NursingNotesService from "@/services/NursingNotesService.js"

export default {
	name : "MedicalNotesComponent",
	components : {
		FormSessionLayout, SubNursingNotesComponent
	}, //components
	props: ["ReduceSize"],
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
		isDisabled : false,
		
	}), // data
	watch:{
		isLastNote(val){
			if (val) {
				this.renderLastNote(val)			
			}
		}
	},

	mounted(){
		this.$nextTick(()=>{
			this.getInfo();
		})
		if (this.isLastNote) {
			this.renderLastNote(this.isLastNote);
		}
	}, // created

	computed : {
		currentPatient(){
			// if (this.$store.getters["infoPatient/patient"] && this.$store.getters["infoPatient/patient"].nursingDischarge) {
			// }
			return this.$store.getters["infoPatient/patient"];			
		},
		isLastNote(){
			return this.$store.getters["infoPatient/getLastNote"];	
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("NursingNotesComponent") 
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
		renderLastNote(val){
			this.isDisabled =true;	
			if (this.info && this.info.ObservationEvolutionNotes) {
				this.info.ObservationEvolutionNotes.push(val);
			}
		},

		async getInfo(){
			try {
				this.loading = true;
				const noteType = this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote(this.$route.name))?.id || undefined;
				const service1 = new NoteService();
				
				const res1 = await service1.findInfo({ atn : this.$route.params.id, type:noteType });
				if(res1 &&  res1.data && res1.data.length){
					this.info.ObservationEvolutionNotes = res1.data || [];	

				}
				const service = new NursingNotesService();
				const res = await service.findInfo({ attention : this.$route.params.id });
				if (res && res.data) {
					// this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "medical_formulas");
					//  console.log("currentPatient ", this.currentPatient)

					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					this.info.assignedAdministrator=this.$store.getters["listCurrentAdministrator/getCurrentAdministrator"](this.info.assignedAdministrator)	
					this.info.id = res.data.id;
					if (res.data.nursingDischarge) {
						this.isDisabled = true;
					}

					// this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.SubDiagnoseLists);
					// this.info.ObservationEvolutionNotes = res.data.rows || [];	
					// this.getDiagnoses();
				}else{
					// this.getDiagnoses();
					if (this.currentPatient) {
						this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
						this.info.AttentionId = this.info.id || this.$route.params.id;
						// this.info.ObservationEvolutionNotes = [];	

						delete this.info.id;
					}
				}
				if (this.currentPatient && this.currentPatient.nursingDischarge) {
					this.isDisabled = true;
				}
			} catch (error) {
				console.warn("Error get info  nursing notes  ", error)
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
				console.warn("Error get diagnoses ", er)
			}finally{

			}
			
		}, // get diagnoses
		async save(){
			try {
				this.loading = true;
				const service = new NursingNotesService();
				this.info.attention = this.info.AttentionId;
				const res = await service.saveInfo(this.info);
				if (res && res.data) {
					this.info.id = res.data.id;
					this.getInfo();
					this.$ManagerSmith.Sound.play("sound1")
					this.$EventBus.$emit("notifications", {
						type 	: "saved"
					});
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
				const service = new NursingNotesService();
				this.info.attention = this.info.AttentionId;
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
				const service = new NursingNotesService();
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
				const noteType = this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote("NursingNotes"))?.id || undefined;
				const service = new NoteService();
				this.$Helper.openLink(service.linkPdf({atn : this.$route.params.id, type : noteType})); // this.$route.params.id / {id : this.info.id}

			}catch(error){
				console.warn("Error open pdf ", error )
			}finally{
				this.loading=false;
			}
		},
		
	}, // methods

};
</script>