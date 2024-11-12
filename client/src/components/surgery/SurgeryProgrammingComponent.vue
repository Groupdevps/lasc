<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Programacion de Cirugia"
		reference = "SurgeryProgrammingForm"
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

				<!-- <v-btn        
					small
					color = "error"
					@click = "openPdf()"
					:loading = "loading"
					v-show =  "info.id"
				>
					<v-icon   class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn> -->
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-accessRoutes="{ itemField }">
			<SubProgrammingSurgery :infoInput="info" :currentPermission="currentPermission"></SubProgrammingSurgery>
		</template>
		<template v-slot:field-SurgeonA="{ itemField }">
			<MenuUser :inputField="info" keyField="SurgeonA" labelToMenu="CIRUJANO 1"></MenuUser>
		</template>
		<template v-slot:field-SurgeonB="{ itemField }">
			<MenuUser :inputField="info" keyField="SurgeonB" labelToMenu="CIRUJANO 2" v-show="show.SurgeonB"></MenuUser>
		</template>
		<template v-slot:field-SurgeryLiquidationId="{ itemField }">
			<MenuTypeSurgery 
				:inputField="info" 
				keyField="SurgeryLiquidationId" 
				autoSetInField="SurgeryLiquidation" 
				@receiveSurgery="renderShowSurgery($event)" 
				:fieldWatch="info.SurgeryLiquidationId"
			></MenuTypeSurgery>
		</template>
		
	</FormSessionLayout>
</template>
<script 
	type = "text/javascript"
>
import fields_params  	from "@/components/surgery/js/surgery_programming_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SubProgrammingSurgery from "@/components/surgery/SubProgrammingSurgeryComponent.vue"
import MenuUser from "@/components/users/MenuUserComponent.vue"
import MenuTypeSurgery from "@/components/surgery/MenuTypeSurgeryComponent.vue" 
import DiagnosesService from "@/services/DiagnosesService.js"
import SurgeryProgrammingService from "@/services/SurgeryProgrammingService.js"
import Anexo9Service from "@/services/Anexo9Service.js"



export default {
	name : "SurgeryProgrammingComponent",
	props: ["ReduceSize",],
	components : {
		FormSessionLayout, SubProgrammingSurgery, MenuUser, MenuTypeSurgery
	}, //components
	data : (vm) => ({
		info 		 	: {
			Date : vm.$ManagerSmith.getDateCurrent(),
			Hour : vm.$ManagerSmith.getTimeCurrent(),	
			SubDiagnoseLists : [],		
			accessRoutes : [],
			SurgeryLiquidation: null,
			SurgeryLiquidationId:null,
			// SubTreatments : [],
		},
		fields 		: fields_params,
		reference 	: 'Remission',
		loading : false,
		show : {SurgeonB: false}
		
	}), // data

	// watch:{
	// 	"info.SurgeryLiquidationId"(val){
	// 		if(val){
				
	// 		}
	// 	}
	// },
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
			return this.$store.getters["auth/getPermission"]("SurgeryProgramming") 
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
		renderShowSurgery(val){			
			if (val && val.name) {
				this.show.SurgeonB=val.name.includes("MULTIPLE");
			}else{
				this.show.SurgeonB=false;

			}
		},

		async getInfo(){
			try {
				this.loading = true;
				// this.info = this.$ManagerSmith.formatFormInfo(this.currentPatient, {...this.info}, "basic")
				const service = new SurgeryProgrammingService();
				const res = await service.findInfo({ id : this.$route.params.order });
				if (res && res.data) {
					// this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "medical_formulas");
					this.info = {...this.info, ...res.data}
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.info.id;
					this.info.id = res.data.id;		
					this.info.Date = this.$Helper.getCurrentDate(this.info.Date);							
					if (this.currentOrder.OrderSubDiagnoses && this.currentOrder.OrderSubDiagnoses.length) {
						this.info.SubDiagnoseLists = this.renderSubDiagnose(this.currentOrder.OrderSubDiagnoses);
					}else{
						this.getDiagnoses();
					}		
					this.info.accessRoutes=res.data.accessRoutes || [];
					this.info.OrderId = this.currentOrder?.id;
					this.info.orderNumber = this.currentOrder?.orderNumber || "";
					this.info.Orders = this.currentOrder?.OrderCupsLists || [];					
				}else{
					this.getDiagnoses();
					
					if (this.currentPatient) {
						this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
						this.info.AttentionId = this.info.id || this.$route.params.id;
						delete this.info.id;
						this.info.OrderId = this.currentOrder?.id;
						this.info.orderNumber = this.currentOrder?.orderNumber || "";
						this.info.Orders = this.currentOrder?.OrderCupsLists || [];

					}
					// this.renderAnex9();
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
					if (this.info && (!this.info.Date ||  !this.info.Hour || !this.info.SurgeryLiquidationId || !this.info.SurgeonA) ) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Fecha, Hora, Tipo de Cirugia y Cirujano"});
					}else{
						const service = new SurgeryProgrammingService();
						const res = await service.saveInfo({	
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							accessRoutes: this.info.accessRoutes,
							OrderId : this.info.OrderId,
							Date : this.info.Date,
							Hour : this.info.Hour,
							SurgeryLiquidationId : this.info.SurgeryLiquidationId,
							SurgeonA : this.info.SurgeonA,
							SurgeonB : this.info.SurgeonB,
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
					if (this.info && (!this.info.Date ||  !this.info.Hour || !this.info.SurgeryLiquidationId || !this.info.SurgeonA)) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Fecha, Hora, Tipo de Cirugia y Cirujano"});
					}else{
						const service = new SurgeryProgrammingService();
						const res = await service.updateInfo({
							id : this.info.id,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],			
							accessRoutes: this.info.accessRoutes,
							OrderId : this.info.OrderId,
							Date : this.info.Date,
							Hour : this.info.Hour,
							SurgeryLiquidationId : this.info.SurgeryLiquidationId,
							SurgeonA : this.info.SurgeonA,
							SurgeonB : this.info.SurgeonB,
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
				const service = new SurgeryProgrammingService();
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
				const service = new SurgeryProgrammingService();
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