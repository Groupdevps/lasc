<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "DispatchForm"
		:inputField="info"
		:isActiveGoBack = "true"
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
		<template v-slot:field-DeliveredTo="{ itemField }">
			<v-text-field outlined dense autofocus v-model="info.DeliveredTo" label="ENTREGADO A" @input="v => info.DeliveredTo = v.toUpperCase()" ></v-text-field>
		</template>
		<!-- <template v-slot:field-Orders="{ itemField }">
			<SubOrdersDispatch :listMedicinesToComponent="info.Medicines" :listProductsToComponent="info.OrderProducts" :typeOrderDispatch="info.typeOrder" ></SubOrdersDispatch>
		</template> -->
		<template v-slot:field-DispatchDetails="{ itemField }">
			<SubDispatch  
				v-if="keyRequestToDispatch" 
				:infoInput="info" 
				key="DispatchDetails" 
				:TypeOrderD="info.typeOrder" 
				:currentPermission="currentPermission" 
				:keyRequest="keyRequestToDispatch"
			></SubDispatch>
		</template>
	</FormSessionLayout>	
</template>
<script type 	= "text/javascript">
	import AgendaPharmacyService from "@/services/AgendaPharmacyService.js"
	import dispatch_params from "@/components/pharmacy/js/dispatch_params.js"
	import SubDispatch from "@/components/pharmacy/SubDispatchComponent.vue"
	// import tableInfoSupplies from "@/components/info/tableInfoSupplies.vue"
	import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
	import DispatchService from "@/services/DispatchService.js"
	import SubOrdersDispatch from "@/components/pharmacy/SubOrdersDispatchComponent.vue"

export default {
	name : "DispatchComponent",
	// props: ["ReduceSize"],
	components : {
		FormSessionLayout, SubDispatch, SubOrdersDispatch
	}, //components
	data : (vm) => ({		
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			typeOrderD : "Medicine",
			Orders : [],
			DispatchDetails: [],
		},		
		fields 		: dispatch_params,		
		diagnoses  	: [],		
		reference 	: 'Dispatch',		
		loading : false,
		keyRequestToDispatch : '',
		
	}), // data

	watch:{
		"typesIsLoaded"(val){
			if (val) {
				this.getInfo();
			}
		}
	},
	mounted(){
		this.getInfoPatient();
		if (this.typesIsLoaded) {						
			this.getInfo();
		}

	}, // created

	computed : {
		// currentPatient(){			
		// 	return this.$store.getters["infoPatient/patient"];			
		// },
		typesOrder(){							
			return this.$store.getters["listTypesOrder/list"];
		},
		typesIsLoaded(){
			return this.$store.getters["listTypesOrder/isLoaded"]
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("DispatchComponent") 
		}
	}, // computed

	methods : {
		getInfoPatient(){
			// if (!this.$store.getters["infoPatient/patient"]) {
			// 	this.$store.dispatch("infoPatient/getInfo", this.$route.params.id).then(res=>{
			// 			if (res && res.data) {

			// 			}
			// 	});
			// }
			if (!this.$store.getters["listTypesOrder/isList"]) {
				this.$store.dispatch("listTypesOrder/getList");
			}
		},

		async getInfo(){
			try {
				this.loading = true;
				const types=[];
				const tempOrder1= this.$store.getters["listTypesOrder/getTypeOrderByName"]("SOLICITUD SUMINISTROS")
				const tempOrder2= this.$store.getters["listTypesOrder/getTypeOrderByName"]("ORDEN FORMULA MEDICA")
				if (tempOrder1) {
					types.push(tempOrder1.id)
				}
				if (tempOrder2) {
					types.push(tempOrder2.id)
				}
				const service = new AgendaPharmacyService();
				const res = await service.searchInfoOrder({ 
					AttentionId : this.$route.params.AttentionId,  
					type : types,//[2,8] 
				});
				
				if (res && res.data && res.data.orders && res.data.orders.length > 0) {
					const idx = res.data.orders.findIndex(x => x.id == this.$route.params.id )
					if (idx >= 0) {
						let itemOrder = res.data.orders[idx];
						const {fullName,  numberId, currentAdministratorName, age, Gender} = itemOrder.Attention.HistoryPerson;						
						this.keyRequestToDispatch = itemOrder.Medicines && itemOrder.Medicines.length > 0 ? 'MedicationList.description' :  'Product.name';
						const isMedicine =  itemOrder.Medicines && itemOrder.Medicines.length > 0 ? true : false
						const isOrderProduct =  itemOrder.OrderProducts && itemOrder.OrderProducts.length > 0 ? true : false
						const listRequest = isMedicine  ? itemOrder.Medicines : 
							isOrderProduct ? itemOrder.OrderProducts : [];

						this.info ={
							fullName, 
							OrderId : itemOrder.id,
							numberId, 
							age,
							assignedAdministrator: currentAdministratorName, 
							PersonId :itemOrder.Attention.PersonId, 
							orderNumber : itemOrder.orderNumber,
							TypeOrder : itemOrder.TypeOrder,
							typeOrder: itemOrder.TypeOrder.name,
							OrderTypeId : itemOrder.OrderTypeId,
							CenterId : itemOrder.CenterId,
							TypeServiceId : itemOrder.Attention.TypeServiceId,
							typeService : itemOrder.Attention.TypeService.name,
							// Orders 
							// Medicines : itemOrder.Medicines && itemOrder.Medicines.length > 0  ? itemOrder.Medicines : [],
							//OrderProducts :  itemOrder.OrderProducts && itemOrder.OrderProducts.length > 0 ? itemOrder.OrderProducts : [],
							listRequest, 
							DispatchDetails : [], 
							DeliveredTo : "",
							isMedicine,
							isOrderProduct,
							Gender : Gender && Gender.name ? Gender.name : "", 
							
						}
							// "ORDEN FORMULA MEDICA" |  "SOLICITUD SUMINISTROS"

					}
					// this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.AttentionId;
					// delete this.info.id;
					// this.info.id = res.data.id;
					
				
				}else{
					
					
				}
			} catch (error) {
				console.warn("Error get info  dispatch ", error)
			}finally{
				this.loading = false;
			}
		},
	
		async save(){
			try {

				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {		
					if (this.info.DispatchDetails && this.info.DispatchDetails.length === 0 ) {
						this.$EventBus.$emit("notifications", { type : "warning", msg : "No hay productos Agregados " });
					}else
					if (this.info && !this.info.DeliveredTo) {
						this.$EventBus.$emit("notifications", { type 	: "warning", msg : "A quien se esta entregando ?" });
					}else{

						const service = new DispatchService();
						const res = await service.saveInfo({
							AttentionId :  parseInt(this.info.AttentionId),
							PersonId : this.info.PersonId,
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
							OrderTypeId : this.info.OrderTypeId,
							DeliveredTo : this.info.DeliveredTo,
							orderNumber : this.info.orderNumber,
							// OrderCupsList : 
							OrderId : this.info.OrderId,
							
							DispatchDetails : this.info.DispatchDetails,
						});
	                	
						if (res && res.data) {
							this.info.id = res.data.id;
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "saved"
							});
						}else if (res && res.error) {
							this.$EventBus.$emit("notifications", {
								type 	: "warning",
								msg :  this.$Helper.renderErrorMessage(res.error, "Error Guardando Despacho")
							});
						}
					}
				}
			}catch(error){
				console.warn("Error save dispatch ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	:  this.$Helper.renderErrorMessage(error, "Generando despacho")
				});
			}finally{
				this.loading = false;
			}
		},
		async update(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {	
				if (this.info.DispatchDetails && this.info.DispatchDetails.length === 0 ) {
						this.$EventBus.$emit("notifications", { type : "warning", msg : "No hay productos Agregados " });
					}else
					if (!this.info.DeliveredTo) {
						this.$EventBus.$emit("notifications", { type 	: "warning", msg : "A quien se esta entregando ?" });
					}else{						
						const service = new DispatchService();
						const res = await service.updateInfo({
							id : this.info.id,
							AttentionId :  this.info.AttentionId,
							PersonId : this.info.PersonId,
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
							OrderTypeId : this.info.OrderTypeId,
							DeliveredTo : this.info.DeliveredTo,
							orderNumber : this.info.orderNumber,
							OrderId : this.info.OrderId,
							// OrderCupsList : 					
							DispatchDetails : this.info.DispatchDetails,
						});
						if (res && res.data) {					
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
						}else if (res && res.error) {
							this.$EventBus.$emit("notifications", {
								type 	: "warning",
								msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Despacho")

							});
						}
					}	
				}
			}catch(error){
				console.warn("Error udpate dispatch ", error);
				this.$EventBus.$emit("notifications", {
					type 	: "error",
					msg 	: this.$Helper.renderErrorMessage(error, "Actualizando Despacho")
				});
			}finally{
				this.loading = false;
			}
		},		
		openPdf(){
			try{
				this.loading = true;				
				const service = new DispatchService();
				this.$Helper.openLink(service.linkPdf({id: this.info.id},"dispatch")); // this.$route.params.id

			}catch(error){
				console.warn("Error open pdf ", error )
			}finally{
				this.loading=false;
			}
		},
		
	}, // methods

};
</script>