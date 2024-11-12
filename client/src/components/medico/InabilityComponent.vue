<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Incapacidad"
		reference = "InabilityForm"
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
		<!-- <template v-slot:field-SubTreatments="{ itemField }">
			<SubTreatmentsComponent :infoInput="info"></SubTreatmentsComponent>
		</template> -->
	</FormSessionLayout>
</template>
<script 
	type = "text/javascript"
>
import fields_params  	from "@/components/medico/js/inability_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
// import SubTreatmentsComponent from "@/components/medico/SubTreatmentsComponent.vue"
import DiagnosesService from "@/services/DiagnosesService.js"
import InabilityService from "@/services/InabilityService.js"
import OrderService 		from "@/services/OrderService.js"

export default {
	name : "InabilityComponent",
	props: ["ReduceSize", "GetCurrentTypeServiceByName"],
	components : {
		FormSessionLayout
	}, //components
	data : (vm) => ({
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			SubDiagnoseLists : [],		
			startDate : vm.$ManagerSmith.getDateCurrent(),
			endDate : "",
			
		},
		fields 		: fields_params,
		reference 	: 'Inability',
		loading : false,
		
	}), // data

	watch:{
		"info.startDate":function(val){			
			this.renderDisabilityDays(val, this.info.endDate);
		},
		"info.endDate":function(val){	
			this.renderDisabilityDays(this.info.startDate, val);
		},
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
			return this.$store.getters["auth/getPermission"]("Inability") 
		},
		currentCenter(){
			return this.$store.getters["infoCenter/getCenter"];
		},
		currentUser(){
			return this.$store.getters["auth/user"];
		},
	}, // computed

	methods : {
		renderSubDiagnose(items){
			return items.map(x => { // diagnoses
				if ( x && x.SubDiagnose) {
					return { ...x.SubDiagnose, SubDiagnoseId : x.id}
				}
			}); 					
		},
		renderDisabilityDays(dateStart, endDate){
			let a 		= this.$moment(dateStart);
	        let b 		= this.$moment(endDate);
	        let days 	=  Math.abs(a.diff(b, 'days')) ;			
			this.info.disabilityDays = days + 1;
		},

		renderByCurrentPatient(){
			if (this.currentPatient) {								
				this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
				this.info.currentAdministratorNit = this.currentPatient?.HistoryPerson?.currentAdministratorNit || "";
				this.info.CurrentAdministratorCode = this.currentPatient?.HistoryPerson?.administrator?.code || "";			
				if (this.currentUser) {				
					this.info.DoctorName = this.info.DoctorName || this.currentUser.name;
					this.info.DoctorRoleName = this.info.DoctorRoleName || this.currentUser?.Role?.name || "" ;
				}
				if (this.currentCenter) {				
					this.info.CenterName = this.info.CenterName || this.currentCenter?.name || "" ;
					this.info.CenterAddress = this.info.CenterAddress || this.currentCenter?.Address?.address || ""; 
					this.info.CenterPhone = this.info.CenterPhone || this.currentCenter?.phone || "";
				}
				if (this.currentPatient ) {
					this.info.TypeID_description=this.currentPatient?.HistoryPerson?.TypeID?.description || "" ;
					this.info.city_name=this.currentPatient?.HistoryPerson?.city || "" ;
					this.info.state_name=this.currentPatient?.HistoryPerson?.state || "" ;
					this.info.phone=this.currentPatient?.HistoryPerson?.phone || this.currentPatient?.HistoryPerson?.cellphone || "" ;

				}
				this.info.AttentionId = this.$route.params.id;
				delete this.info.id;
			}
		},

		async getInfo(){
			try {
				this.loading = true;
				// this.info = this.$ManagerSmith.formatFormInfo(this.currentPatient, {...this.info}, "basic")
				const typeOrder = this.typesOrder.filter(x=> x.name == "INCAPACIDAD");				
				const service = new OrderService();
				const res = await service.findInfo({ 
					attention : this.$route.params.id,  
					type : typeOrder && typeOrder.length > 0 ? typeOrder[0].id: null, 
				});
				if (res && res.data  && res.data.orders && res.data.orders.length > 0) {
                    const idx = res.data.orders.findIndex(x => x.id == this.$route.params.id )
                    if (idx >= 0) {
                        let item = res.data.orders[idx];
						// this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "medical_formulas");
						this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
						this.info.AttentionId = this.$route.params.id;
						// this.info.id = res.data.id;
						// delete this.info.id;
					
						// console.log("this.info ", this.info)
						if (item.SubDiagnoseLists && item.SubDiagnoseLists.length > 0) {
							this.info.SubDiagnoseLists = this.renderSubDiagnose(item.SubDiagnoseLists);
						}else{
							this.getDiagnoses();
						}
                   }else{
						this.getDiagnoses();
                   }
				}else{
					this.getDiagnoses();											
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
					this.renderByCurrentPatient();
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
					if (this.info && !this.info.startDate && !this.info.endDate) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere ordenes Fecha de inicio y final de Incapacidad"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "INCAPACIDAD");	
						// const typeService = this.GetCurrentTypeServiceByName(this.$route.params.option);
						console.log("typeService ", typeOrder)			
						const service = new OrderService();
						const res = await service.saveInfo({
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,
							CenterId : this.info.CenterId,
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
							OrderTypeId : typeOrder && typeOrder.length > 0 ? typeOrder[0].id : null,
							OrderSubDiagnoses :  this.info.SubDiagnoseLists.length > 0  ?  this.info.SubDiagnoseLists : [],

							Inabilities : [
								{ 
									observation : this.info.observation,
									startDate : this.info.startDate,
									endDate : this.info.endDate,
									disabilityDays : this.info.disabilityDays,
								}
							],
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
					if (this.info && !this.info.startDate && !this.info.endDate) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere ordenes Fecha de inicio y final de Incapacidad"});
					}else{
						const typeOrder = this.typesOrder.filter(x=> x.name == "INCAPACIDAD");				
						const service = new OrderService();
						const res = await service.updateInfo({
							id : this.info.id,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,
							CenterId : this.info.CenterId,
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.info.CenterId,
							OrderTypeId : typeOrder && typeOrder.length > 0 ? typeOrder[0].id : null,
							OrderSubDiagnoses :  this.info.SubDiagnoseLists.length > 0  ?  this.info.SubDiagnoseLists : [],
							Inabilities : [
								{ 
									observation : this.info.observation,
									startDate : this.info.startDate,
									endDate : this.info.endDate,
									disabilityDays : this.info.disabilityDays,
								}
							],
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