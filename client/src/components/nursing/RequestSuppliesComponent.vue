<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "RequestSuppliesForm"
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
		<template v-slot:field-Supplies="{ itemField }">
			<SubRequestSuppliesComponent :infoInput="info" :currentPermission="currentPermission"></SubRequestSuppliesComponent>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">
import field_params from "@/components/nursing/js/request_supplies_params.js"
import SubRequestSuppliesComponent from "@/components/nursing/SubRequestSuppliesComponent.vue"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import DiagnosesService from "@/services/DiagnosesService.js"
import RequestSuppliesService from "@/services/RequestSuppliesService.js"
import OrderService 		from "@/services/OrderService.js"
export default {
	name : "RequestSuppliesComponent",
	props: ["ReduceSize"],
	components : {
		FormSessionLayout, SubRequestSuppliesComponent
	}, //components
	data : (vm) => ({		
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			Supplies : [],
		},		
		fields 		: field_params,		
		diagnoses  	: [],		
		reference 	: 'RequestSupplies',		
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
			return this.$store.getters["auth/getPermission"]("RequestSuppliesComponent") 
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
				const typeOrder = this.typesOrder.filter(x=> x.name == "SOLICITUD SUMINISTROS");				
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
					
				}else{
					// this.getDiagnoses();					
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					delete this.info.id;
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
					this.info.SubDiagnoseLists = this.renderSubDiagnose(this.$router.getters["infoPatient/SubDiagnoseLists"]) || [];
				}
			}catch(error){
				console.warn("Error get diagnoses ", er)
			}finally{

			}
			
		}, // get diagnoses
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
					if (this.info.Supplies && this.info.Supplies.length === 0 ) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere listado a Solicitar"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "SOLICITUD SUMINISTROS");
						const service = new OrderService();
						const res = await service.saveInfo({
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,
							CenterId : this.info.CenterId,
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
							OrderTypeId : typeOrder && typeOrder.length > 0 ? typeOrder[0].id : null,
							// OrderCupsList : 
							OrderProducts: this.info.Supplies.length > 0  ?  this.info.Supplies : [],						
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
					if (this.info.Supplies && this.info.Supplies.length === 0 ) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere listado a Solicitar"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "SOLICITUD SUMINISTROS");
						const service = new OrderService();
						const res = await service.updateInfo({
							id : this.info.id,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,
							CenterId : this.info.CenterId,
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
							OrderTypeId : typeOrder && typeOrder.length > 0 ? typeOrder[0].id : null,					
							OrderProducts: this.info.Supplies.length > 0  ?  this.info.Supplies : [],						
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
				this.$Helper.openLink(service.linkPdf({id : this.info.id}, "request-supply")); // this.$route.params.id

			}catch(error){
				console.warn("Error open pdf ", error )
			}finally{
				this.loading=false;
			}
		},
		
	}, // methods

};
</script>