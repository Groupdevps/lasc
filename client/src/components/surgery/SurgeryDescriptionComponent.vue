<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Descripcion de Cirugia"
		reference = "SurgeryDescriptionForm"
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
					<v-icon class="mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-surgeonId="{ itemField }">
			<MenuUser :inputField="info" keyField="surgeonId" labelToMenu="CIRUJANO"></MenuUser>
		</template>
		<template v-slot:field-anesthesiologistId="{ itemField }">
			<MenuUser :inputField="info" keyField="anesthesiologistId" labelToMenu="ANESTESIOLOGO"></MenuUser>
		</template>
		<template v-slot:field-instrumenterId="{ itemField }">
			<MenuUser :inputField="info" keyField="instrumenterId" labelToMenu="INSTRUMENTISTA"></MenuUser>
		</template>
		<template v-slot:field-assistantId="{ itemField }">
			<MenuUser :inputField="info" keyField="assistantId" labelToMenu="ASISTENTE"></MenuUser>
		</template>
		<template v-slot:field-AnestheticTechniqueId="{ itemField }">
			<MenuAnesthesiaType :inputField="info" keyField="AnestheticTechniqueId"></MenuAnesthesiaType>
		</template>
		<!-- <template v-slot:field-diagnosis1Admission="{ itemField }">
			<MenuDiagnoses :inputField="info" keyField="diagnosis1Admission" labelToMenu="Diagnostico 1" itemValue="id"></MenuDiagnoses>
		</template>
		<template v-slot:field-diagnosis2Admission="{ itemField }">
			<MenuDiagnoses :inputField="info" keyField="diagnosis2Admission" labelToMenu="Diagnostico 2" itemValue="id"></MenuDiagnoses>
		</template> -->
		<template v-slot:field-QxCupsLists="{ itemField }">	
			<SubSurgeryDescription :inputField="info"  keyField="QxCupsLists" :currentPermission="currentPermission"></SubSurgeryDescription>			
		</template>
		<template v-slot:field-QxDiagnosticLists="{ itemField }">
			<SubDiagnosesSurgeryDescription :inputField="info"  keyField="QxDiagnosticLists" :currentPermission="currentPermission"></SubDiagnosesSurgeryDescription>
		</template>
		<!-- <template v-slot:field-cupOrSoatProcedure="{ itemField }">
			<MenuCupsList :inputField="info" keyField="cupOrSoatProcedure" labelToMenu="CUP 1"></MenuCupsList>
		</template>
		<template v-slot:field-cupOrSoatProcedure2="{ itemField }">
			<MenuCupsList :inputField="info" keyField="cupOrSoatProcedure2" labelToMenu="CUP 2"></MenuCupsList>
		</template> -->
	</FormSessionLayout>	
</template>
<script type="text/javascript">
import field_params from "@/components/surgery/js/surgery_description_params.js"
// import SubLaboratoryComponent from "@/components/medico/SubLaboratoryComponent.vue"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import MenuUser from "@/components/users/MenuUserComponent.vue"
import MenuAnesthesiaType from "@/components/surgery/MenuAnesthesiaTypeComponent.vue"
import SubSurgeryDescription from "@/components/surgery/SubSurgeryDescriptionComponent.vue" // procedures
import SubDiagnosesSurgeryDescription from "@/components/surgery/SubDiagnosesSurgeryDescriptionComponent.vue" 

import MenuDiagnoses from "@/components/info/MenuDiagnosesComponent.vue"
import MenuCupsList from "@/components/info/MenuCupsListComponent.vue"

import SurgeryProgrammingService from "@/services/SurgeryProgrammingService.js"
import DiagnosesService from "@/services/DiagnosesService.js"
// import LaboratoryOrderService from "@/services/LaboratoryOrderService.js"
// import OrderService 		from "@/services/OrderService.js"
import SurgeryDescriptionService 		from "@/services/SurgeryDescriptionService.js"
export default {
	name : "SurgeryDescriptionComponent",
	props: ["ReduceSize"],
	components : {
		FormSessionLayout, MenuUser, MenuAnesthesiaType, MenuDiagnoses, MenuCupsList, SubSurgeryDescription, SubDiagnosesSurgeryDescription, /*SubLaboratoryComponent*/
	}, //components
	data : (vm) => ({		
		info 		 	: {
			startDate : vm.$ManagerSmith.getDateCurrent(),
			startTime 		 : vm.$ManagerSmith.getTimeCurrent(),	
			endDate : "",
			endTime : "",
			surgeonId 	 : null,
			QxCupsLists : [], 
			QxDiagnosticLists : [], 
		},		
		fields 		: field_params,		
		diagnoses  	: [],		
		reference 	: 'LaboratoryOrder',		
		// Procedures : [],
		loading : false,
		
	}), // data

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
			return this.$store.getters["auth/getPermission"]("SurgeryDescription") //  
		}
	}, // computed

	methods : {
		renderSubDiagnose(items){
			return items.map(x => { // diagnoses
				if ( x && x.SubDiagnose) {
					return {...x.SubDiagnose, SubDiagnoseId : x.id}
				}
			}); 					
		},
		renderQxCupsList(){
			if (this.info.QxCupsLists && this.info.QxCupsLists.length == 0) {
				const item=this.$store.getters["infoPatient/getOrder"]				
				if (item && item.OrderCupsLists && item.OrderCupsLists.length) {
					this.info.QxCupsLists=item.OrderCupsLists.map(x=>{
						return {
							CupsList : x?.CupsList,
							code : x?.CupsList?.code,
							description : x?.CupsList?.description,
							CupsListId : x?.CupsListId,
							UserId : this.$store.getters["auth/userId"],

						}
					})
				}

			}
		},

		async getInfo(){
			try {
				this.loading = true;			
				const service1 = new SurgeryProgrammingService();
				const res1 = await service1.findInfo({ id : this.$route.params.order });
				const tempProgramming = res1?.data;
				const service = new SurgeryDescriptionService();
				const res = await service.getInfo({ 
					order : this.$route.params.order,  					
				});
				if (res && res.data ) {
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					delete this.info.id;
					this.info = {...this.info ,...res.data};					
					this.renderQxCupsList();
					if (this.currentPatient?.PersonId) {
						this.info.PersonId = this.currentPatient.PersonId
					}
					// if (this.info.QxDiagnosticLists && this.info.QxDiagnosticLists.length == 0) {
					// 	this.info.QxDiagnosticLists=
					// }
					this.getDiagnoses();				
					// this.info.Procedures = this.info?.Procedures || [];
				}else{		
					this.info.surgeonId = tempProgramming?.SurgeonA;
					this.info.startDate=tempProgramming?.Date ? this.$Helper.getCurrentDate(tempProgramming.Date) : this.$Helper.getCurrentDate();  
					this.info.endDate=this.info.initialExecutionDate;
					this.info.startTime = tempProgramming?.Hour;
					this.renderQxCupsList();	
					this.getDiagnoses();					
				}
			} catch (error) {
				console.warn("Error get info  Surgery description ", error)
			}finally{
				this.loading = false;
			}
		},
		async getDiagnoses(){
			try{
				if (this.currentPatient && !this.info.id) {
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					delete this.info.id;
				}
				const item = this.$store.getters["infoPatient/getOrder"];
				if (item && item.OrderSubDiagnoses && item.OrderSubDiagnoses.length) {
					this.info.SubDiagnoseLists = this.renderSubDiagnose(item.OrderSubDiagnoses);
				}else{
					const service = new DiagnosesService();
					const res  = await service.findInfo({ AttentionId : this.$route.params.id })

					if (res && res.data && res.data.rows && res.data.rows.length > 0) {
						this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.rows);
					}else{
						this.info.SubDiagnoseLists = this.renderSubDiagnose(this.$store.getters["infoPatient/SubDiagnoseLists"]) || [];
					}
				}
				
				if (this.info.SubDiagnoseLists && this.info.SubDiagnoseLists.length && this.info.QxDiagnosticLists.length==0) {
					this.info.QxDiagnosticLists=this.info.SubDiagnoseLists.map(x=>{						
						return {
							DiagnosticListId : x.SubDiagnoseId,
							DiagnosticList :{ code : x.code, description : x.name  },
							code : x.code,
							description : x.name,
							UserId: this.$store.getters["auth/userId"],
						}
					})
					
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
					if (this.info && (!this.info.startDate || !this.info.anesthesiologistId || !this.info.instrumenterId || !this.info.endDate)) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Fecha inicio, Cirujano, Anestesiologo, Instrumentista, Fecha final cirugia"});
					}else{
						// console.log("@SAVE ", this.info.Orders)
						// const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN LABORATORIO");
						const service = new SurgeryDescriptionService();
						const res = await service.saveInfo({
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							startDate : this.info?.startDate, 
							startTime : this.info?.startTime,
							endDate : this.info?.endDate,
							endTime: this.info?.endTime,
							surgeonId : this.info?.surgeonId,
							anesthesiologistId : this.info?.anesthesiologistId,
							instrumenterId : this.info?.instrumenterId,
							assistantId : this.info?.assistantId,
							AnestheticTechniqueId : this.info?.AnestheticTechniqueId,
							QxCupsLists : this.info?.QxCupsLists,
							QxDiagnosticLists : this.info?.QxDiagnosticLists,
							OrderId : this.$route.params.order,
							description : this.info?.description,
							// cupOrSoatProcedure : this.info?.cupOrSoatProcedure,
							// cupOrSoatProcedure2 : this.info?.cupOrSoatProcedure2,
							// diagnosis1Admission : this.info?.diagnosis1Admission,
							// diagnosis2Admission : this.info?.diagnosis2Admission,
							
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
				console.warn("Error save surgery description ", error);
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
					if (this.info && (!this.info.startDate || !this.info.anesthesiologistId || !this.info.instrumenterId)) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Fecha inicio, Cirujano, Anestesiologo, Instrumentista"});
					}else{
						// const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN LABORATORIO");
						const service = new SurgeryDescriptionService();
						const res = await service.updateInfo({
							id : this.info?.id,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							// UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							startDate : this.info?.startDate, 
							startTime : this.info?.startTime,
							endDate : this.info?.endDate,
							endTime: this.info?.endTime,
							surgeonId : this.info?.surgeonId,
							anesthesiologistId : this.info?.anesthesiologistId,
							instrumenterId : this.info?.instrumenterId,
							assistantId : this.info?.assistantId,
							description : this.info?.description,
							AnestheticTechniqueId : this.info?.AnestheticTechniqueId,
							QxCupsLists : this.info?.QxCupsLists,
							QxDiagnosticLists : this.info?.QxDiagnosticLists,
							OrderId : this.$route.params.order,
							// anesthesiaTypeId : this.info?.anesthesiaTypeId,
							// cupOrSoatProcedure : this.info?.cupOrSoatProcedure,
							// cupOrSoatProcedure2 : this.info?.cupOrSoatProcedure2,
							// diagnosis1Admission : this.info?.diagnosis1Admission,
							// diagnosis2Admission : this.info?.diagnosis2Admission,
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
				console.warn("Error udpate surgery description ", error);
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
				const service = new SurgeryDescriptionService();
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
				const service = new SurgeryDescriptionService();
				this.$Helper.openLink(service.linkPdf({id : this.info.id})); // "laboratory"/  this.$route.params.id

			}catch(error){
				console.warn("Error open pdf ", error )
			}finally{
				this.loading=false;
			}
		},
		
	}, // methods

};
</script>