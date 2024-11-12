<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Ordenes de Laboratorio"
		reference = "LaboratoryOrderForm"
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
		<template v-slot:field-Orders="{ itemField }">
			<SubLaboratoryComponent :infoInput="info" :currentPermission="currentPermission" ></SubLaboratoryComponent>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">
import field_params from "@/components/medico/js/laboratory_order_params.js"
import SubLaboratoryComponent from "@/components/medico/SubLaboratoryComponent.vue"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import DiagnosesService from "@/services/DiagnosesService.js"
import LaboratoryOrderService from "@/services/LaboratoryOrderService.js"
import OrderService 		from "@/services/OrderService.js"
export default {
	name : "LaboratoryOrdenComponent",
	props: ["ReduceSize"],
	components : {
		FormSessionLayout, SubLaboratoryComponent
	}, //components
	data : (vm) => ({		
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			SubDiagnoseLists : [],		
			Orders : [],
		},		
		fields 		: field_params,		
		diagnoses  	: [],		
		reference 	: 'LaboratoryOrder',		
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
			return this.$store.getters["auth/getPermission"]("LaboratoryOrder") 
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

		async getInfo(){
			try {
				this.loading = true;
				const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN LABORATORIO");				
				const service = new OrderService();
				const res = await service.findInfo({ 
					AttentionId : this.$route.params.id,  
					TypeOrder : typeOrder && typeOrder.length > 0 ? typeOrder[0].id: null, 
				});
				
				// const service = new LaboratoryOrderService();
				// const res = await service.findInfo({ AttentionId : this.$route.params.id });
				if (res && res.data) {
					// this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "medical_formulas");
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					delete this.info.id;
					// this.info.id = res.data.id;
					if (res.data.SubDiagnoseLists && res.data.SubDiagnoseLists.length > 0) {
						this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.SubDiagnoseLists);
					}else{
						this.getDiagnoses();
					}
				// 	this.info.Orders = res.data.Orders;				
				// 	// console.log("this.info get info ", this.info)
				}else{
					this.getDiagnoses();					
					
				}
			} catch (error) {
				console.warn("Error get info  Laboratorio ", error)
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
				}else{
					this.info.SubDiagnoseLists = this.renderSubDiagnose(this.$store.getters["infoPatient/SubDiagnoseLists"]) || [];
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
					if (this.info && this.info.Orders && this.info.Orders.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere ordenes"});
					}else{
						// console.log("@SAVE ", this.info.Orders)
						const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN LABORATORIO");
						const service = new OrderService();
						const res = await service.saveInfo({
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							OrderTypeId : typeOrder && typeOrder.length > 0 ? typeOrder[0].id : null,
							// OrderCupsList : 
							OrderSubDiagnoses: this.info.SubDiagnoseLists.length > 0  ?  this.info.SubDiagnoseLists : [],		
							OrderCupsLists : this.info.Orders,
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
					if (this.info && this.info.Orders && this.info.Orders.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere ordenes"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN LABORATORIO");
						const service = new OrderService();
						const res = await service.updateInfo({
							id : this.info.id,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							OrderTypeId : typeOrder && typeOrder.length > 0 ? typeOrder[0].id : null,
							// OrderCupsList : 
							OrderSubDiagnoses: this.info.SubDiagnoseLists.length > 0  ?  this.info.SubDiagnoseLists : [],		
							OrderCupsLists : this.info.Orders,
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