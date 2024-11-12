<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "AnestheticRecordsForm"
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
					color="error"
					@click="openPdf()"
					:loading="loading"
					v-show="info.id"
				>
					<v-icon class="mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn> 
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-Observations="{ itemField }">
			<SubRecoverySurgeryComponent :infoInput="info" :currentPermission="currentPermission"></SubRecoverySurgeryComponent>
		</template>

		<template v-slot:field-surgeonId="{ itemField }">
			<MenuUser :inputField="info" keyField="surgeonId" labelToMenu="CIRUJANO" :isDisabled="false"></MenuUser>
		</template>
		<template v-slot:field-anesthesiologistId="{ itemField }">
			<MenuUser :inputField="info" keyField="anesthesiologistId" labelToMenu="ANESTESIOLOGO" :isDisabled="false"></MenuUser>
		</template>
		<template v-slot:field-instrumenterId="{ itemField }">
			<MenuUser :inputField="info" keyField="instrumenterId" labelToMenu="INSTRUMENTISTA" :isDisabled="true"></MenuUser>
		</template>
		<template v-slot:field-assistantId="{ itemField }">
			<MenuUser :inputField="info" keyField="assistantId" labelToMenu="ASISTENTE" :isDisabled="true"></MenuUser>
		</template>
		<template v-slot:field-anesthesiaTypeId="{ itemField }">
			<MenuAnesthesiaType :inputField="info" keyField="anesthesiaTypeId" :isDisabled="true"></MenuAnesthesiaType>
		</template>
		<template v-slot:field-diagnosis1Admission="{ itemField }">
			<MenuDiagnoses :inputField="info" keyField="diagnosis1Admission" labelToMenu="Diagnostico 1" itemValue="id" :isDisabled="true"></MenuDiagnoses>
		</template>
		<template v-slot:field-diagnosis2Admission="{ itemField }">
			<MenuDiagnoses :inputField="info" keyField="diagnosis2Admission" labelToMenu="Diagnostico 2" itemValue="id" :isDisabled="true"></MenuDiagnoses>
		</template>

		<template v-slot:field-cupOrSoatProcedure="{ itemField }">
			<MenuCupsList :inputField="info" keyField="cupOrSoatProcedure" labelToMenu="CUP 1" :isDisabled="true"></MenuCupsList>
		</template>
		<template v-slot:field-cupOrSoatProcedure2="{ itemField }">
			<MenuCupsList :inputField="info" keyField="cupOrSoatProcedure2" labelToMenu="CUP 2" :isDisabled="true"></MenuCupsList>
		</template>
	</FormSessionLayout>	
	</FormSessionLayout>
</template>
<script type="text/javascript">
import fields_params  	from "@/components/surgery/js/anesthetic_records_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SubRecoverySurgeryComponent from "@/components/surgery/SubRecoverySurgeryComponent.vue"
import MenuUser from "@/components/users/MenuUserComponent.vue"
import MenuAnesthesiaType from "@/components/surgery/MenuAnesthesiaTypeComponent.vue"
import MenuDiagnoses from "@/components/info/MenuDiagnosesComponent.vue"
import MenuCupsList from "@/components/info/MenuCupsListComponent.vue"

import DiagnosesService from "@/services/DiagnosesService.js"
import AnesthesiaRecordService from "@/services/AnesthesiaRecordService.js"
import Anexo9Service from "@/services/Anexo9Service.js"


export default {
	name : "AnestheticRecordsSurgeryComponent",
	props: ["ReduceSize",],
	components : {
		FormSessionLayout, MenuUser, MenuAnesthesiaType, MenuDiagnoses, MenuCupsList, SubRecoverySurgeryComponent
	}, //components
	data : (vm) => ({
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			SubDiagnoseLists : [],		
			RecoveryObservations : [],
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
		},
		currentOrder(){
			return this.$store.getters["infoPatient/getOrder"]
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
			let infoTemp=serviceAnex.formatInfo(this.currentPatient, this.$store.getters["infoCenter/center"], this.$store.getters["auth/user"])
			this.info = {...this.info, ...infoTemp}
		},

		async getInfo(){
			try {
				this.loading = true;
				// this.info = this.$ManagerSmith.formatFormInfo(this.currentPatient, {...this.info}, "basic")
				const service = new AnesthesiaRecordService();
				const res = await service.findInfo({ id : this.$route.params.order }); // ByOrder
				if (res && res.data) {
					// this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "medical_formulas");
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.info.id;
					this.info.id = res.data.id;					
					// this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.SubDiagnoseLists);
					// this.info.SubTreatments = res.data.SubTreatments;
					// this.info.HistoryPerson.assignedAdministrator = res.data.HistoryPerson && res.data.HistoryPerson.currentAdministratorName ? res.data.HistoryPerson.currentAdministratorName : "";
					// console.log("this.info get info ", this.info)
					this.renderAnex9();
					this.getDiagnoses();
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
					if (this.info && !this.info.RecoveryObservations ) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere observacion"});
					}else{
						const service = new AnesthesiaRecordService();
						const res = await service.saveInfo({
							RecoveryObservations: this.info.RecoveryObservations,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							OrderId : this.currentOrder?.id,
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
					if (this.info && !this.info.RecoveryObservations) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere observacion"});
					}else{
						const service = new AnesthesiaRecordService();
						const res = await service.updateInfo({
							id : this.info.id,
							RecoveryObservations: this.info.RecoveryObservations,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							// UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],							
							OrderId : this.currentOrder?.id,
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
				const service = new AnesthesiaRecordService();
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
				const service = new AnesthesiaRecordService();
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