<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "RecoveryForm"
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
					small
					v-show="!loading"
					color="success"
					@click="highRecovery()"
				>
					{{ "Alta Recuperacion" }}
				</v-btn>
				<v-btn
					small
					v-show="!loading"
					color="primary"
					@click="info.id ? update() : save()"
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
					<v-icon   class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-Observations="{ itemField }">
			<SubRecoverySurgeryComponent :infoInput="info" :currentPermission="currentPermission"></SubRecoverySurgeryComponent>
		</template>

		<template v-slot:field-surgeonId="{ itemField }">
			<MenuUser :inputField="info" keyField="surgeonId" labelToMenu="CIRUJANO" :isDisabled="true"></MenuUser>
		</template>
		<template v-slot:field-anesthesiologistId="{ itemField }">
			<MenuUser :inputField="info" keyField="anesthesiologistId" labelToMenu="ANESTESIOLOGO" :isDisabled="true"></MenuUser>
		</template>
		<template v-slot:field-instrumenterId="{ itemField }">
			<MenuUser :inputField="info" keyField="instrumenterId" labelToMenu="INSTRUMENTISTA" :isDisabled="true"></MenuUser>
		</template>
		<template v-slot:field-assistantId="{ itemField }">
			<MenuUser :inputField="info" keyField="assistantId" labelToMenu="ASISTENTE" :isDisabled="true"></MenuUser>
		</template>
		<template v-slot:field-AnestheticTechniqueId="{ itemField }">
			<MenuAnesthesiaType :inputField="info" keyField="AnestheticTechniqueId" :isDisabled="true"></MenuAnesthesiaType>
		</template>
		<template v-slot:field-QxCupsLists="{ itemField }">	
			<SubSurgeryDescription :inputField="info"  keyField="QxCupsLists"  :isDisabled="true" :currentPermission="{canAdd: false, candEdit:false, canDelete:false}"></SubSurgeryDescription>			
		</template>
		<template v-slot:field-QxDiagnosticLists="{ itemField }">
			<SubDiagnosesSurgeryDescription :inputField="info"  keyField="QxDiagnosticLists" :isDisabled="true" :currentPermission="{canAdd: false, candEdit:false, canDelete:false}"></SubDiagnosesSurgeryDescription>
		</template>
	</FormSessionLayout>	
	</FormSessionLayout>
</template>
<script 
	type = "text/javascript"
>
import fields_params  	from "@/components/surgery/js/recovery_surgery_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SubRecoverySurgeryComponent from "@/components/surgery/SubRecoverySurgeryComponent.vue"
import MenuUser from "@/components/users/MenuUserComponent.vue"
import MenuAnesthesiaType from "@/components/surgery/MenuAnesthesiaTypeComponent.vue"
import MenuDiagnoses from "@/components/info/MenuDiagnosesComponent.vue"
import MenuCupsList from "@/components/info/MenuCupsListComponent.vue"
import SubDiagnosesSurgeryDescription from "@/components/surgery/SubDiagnosesSurgeryDescriptionComponent.vue" 
import SubSurgeryDescription from "@/components/surgery/SubSurgeryDescriptionComponent.vue" // procedures

import DiagnosesService from "@/services/DiagnosesService.js"
import RecoverySurgeryService from "@/services/RecoverySurgeryService.js"
import Anexo9Service from "@/services/Anexo9Service.js"
import SurgeryDescriptionService 		from "@/services/SurgeryDescriptionService.js"


export default {
	name : "RecoveryComponent",
	props: ["ReduceSize",],
	components : {
		FormSessionLayout, MenuUser, MenuAnesthesiaType, MenuDiagnoses, MenuCupsList, SubRecoverySurgeryComponent, SubDiagnosesSurgeryDescription, SubSurgeryDescription
	}, //components
	data : (vm) => ({
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			SubDiagnoseLists : [],		
			RecoveryObservations : [],
			startDate : "",
			startHour : "",
			endDate : undefined,
			endHour : undefined, 
			status : "",
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
				const service1 = new SurgeryDescriptionService();
				const res1 = await service1.getInfo({ order : this.$route.params.order,});

				const tempDescription = res1?.data;
				if (tempDescription) {
					if (tempDescription.startDate) {
						
						this.info.initialExecutionDate=tempDescription.startDate;
						this.info.initialExecutionHour =tempDescription.startTime;
					}
					if (tempDescription.endDate) {
						
						this.info.executionEndDate = tempDescription.endDate;
						this.info.executionEndHour = tempDescription.endTime;
						this.info.startDate = this.info.executionEndDate;
						this.info.startTime = this.info.executionEndHour;
					}
					this.info = {...this.info, 
						QxId :  tempDescription?.id,
						surgeonId : tempDescription?.surgeonId,
						anesthesiologistId : tempDescription?.anesthesiologistId,
						AnestheticTechniqueId : tempDescription?.AnestheticTechniqueId,
						instrumenterId : tempDescription?.instrumenterId,
						assistantId : tempDescription?.assistantId,
						description : tempDescription?.description,
						QxDiagnosticLists : tempDescription?.QxDiagnosticLists,
						QxCupsLists : tempDescription?.QxCupsLists,
					}
				}
				const service = new RecoverySurgeryService();
				const res = await service.findInfoByOrder({ id : this.$route.params.order });
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
		async highRecovery(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					const service = new RecoverySurgeryService();
					const res = await service.sendHighRecovery({id: this.info.id, UserId:this.$store.getters["auth/userId"], ...this.info});
					if(res){
						if(res.error){
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error generando alta")});
						}else if(res.data){
							this.$EventBus.$emit("notifications", { type : "success" , msg : "Alta de recuperacion generada"});
						}
					}
				}
			}catch(error){
				console.warn("Error high recovery  "+this.referencee, error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: error
				});
			}finally{
				this.loading = false;
			}
		},
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {	
					if (this.info) {
						// this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere observacion"});
					// }else{
						const service = new RecoverySurgeryService();
						const res = await service.saveInfo({							
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							OrderId : this.currentOrder?.id,
							startDate : this.info?.startDate,
							startTime: this.info?.startTime, 
							endDate : this.info?.endDate,
							endTime: this.info?.endTime,
							status : this.info?.status,
							QxId : this.info?.QxId,
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
					if (this.info) {
					// 	this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere observacion"});
					// }else{
						const service = new RecoverySurgeryService();
						const res = await service.updateInfo({
							id : this.info.id,							
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							// UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],							
							OrderId : this.currentOrder?.id,
							startDate : this.info?.startDate,
							startTime: this.info?.startTime, 
							endDate : this.info?.endDate || undefined,
							endTime: this.info?.endTime || undefined,
							status : this.info?.status,
							QxId : this.info?.QxId,
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
				const service = new RecoverySurgeryService();
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
				const service = new RecoverySurgeryService();
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