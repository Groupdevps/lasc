<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Orden Interconsulta"
		reference = "OutpatientOrderForm"
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
					v-show = "info.id"
				>
					<v-icon   class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-Orders="{ itemField }">
			<SubOutpatientComponent :infoInput="info" :currentPermission="currentPermission"></SubOutpatientComponent>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">

import fields_params  	from "@/components/medico/js/outpatient_orders_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SubOutpatientComponent from "@/components/medico/SubOutpatientComponent.vue"

import DiagnosesService from "@/services/DiagnosesService.js"
import OutpatientOrderService from "@/services/OutpatientOrdersService.js"
import OrderService 		from "@/services/OrderService.js"


export default {
	name : "OutpatientOrdersComponent",
	props: ["ReduceSize"],
	components : {
		FormSessionLayout, SubOutpatientComponent
	}, //components
	data : (vm) => ({
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			SubDiagnoseLists : [],		
			Orders : [],
		},		
		fields 		: fields_params,		
		diagnoses  	: [],		
		reference 	: 'OutpatientOrders',				
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
			return this.$store.getters["auth/getPermission"]("OutpatientOrders") 
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
				const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN INTERCONSULTA");	
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
					if (res.data.SubDiagnoseLists && res.data.SubDiagnoseLists.length > 0) {
						this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.SubDiagnoseLists);
					}else{
						this.getDiagnoses();
					}
					// this.info.HistoryPerson.assignedAdministrator = res.data.HistoryPerson && res.data.HistoryPerson.currentAdministratorName ? res.data.HistoryPerson.currentAdministratorName : "";
					// console.log("this.info get info ", this.info)
				}else{
					if (this.currentPatient) {
						this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
						this.info.AttentionId = this.info.id || this.$route.params.id;
						delete this.info.id;
					}
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
					if (this.info && this.info.Orders && this.info.Orders.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere ordenes"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN INTERCONSULTA");	
						const service = new OrderService();
						const res = await service.saveInfo({
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,
							CenterId : this.info.CenterId,
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
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
					if (this.info && this.info.Orders && this.info.Orders.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere ordenes"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN INTERCONSULTA");	
						const service = new OrderService();
						const res = await service.updateInfo({
							id : this.info.id,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,
							CenterId : this.info.CenterId,
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
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