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
		<template v-slot:field-BedId="{ itemField }">			
			<SettingsHopitalizationComponent :inputField="info" keyField="BedId" ></SettingsHopitalizationComponent>
		</template>
		
	</FormSessionLayout>	
</template>
<script type = "text/javascript">
import field_params from "@/components/hospitalization/js/stay_order_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SettingsHopitalizationComponent  from "@/components/hospitalization/SettingsStayHopitalizationComponent.vue"
import DiagnosesService from "@/services/DiagnosesService.js"
import StayOrderService 		from "@/services/StayOrderService.js"
export default {
	name : "StaryOrderComponent",
	props: ["ReduceSize"],
	components : {
		FormSessionLayout, SettingsHopitalizationComponent
	}, //components
	data : (vm) => ({		
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),	
			surgeonId 	 : null,
		},		
		infoItem : null,
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

		async getInfo(){
			try {
				this.loading = true;			
				const service = new StayOrderService();
				const res = await service.getInfo({ 
					AttentionId : this.$route.params.id,  
				});
				if (res && res.data && res.data.length) {
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					delete this.info.id;
					this.info = {...this.info ,...res.data[0]};					
					if (this.currentPatient?.PersonId) {
						this.info.PersonId = this.currentPatient.PersonId
					}
					this.getDiagnoses();				
				}else{					
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
				const service = new DiagnosesService();
				const res  = await service.findInfo({ AttentionId : this.$route.params.id })
				if (this.currentPatient && !this.info.id) {
					this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
					this.info.AttentionId = this.$route.params.id;
					this.info.BeforeBedId=this.info?.BedId || null;
					delete this.info.id;
					if (this.currentPatient?.PersonId) {
						this.info.PersonId = this.currentPatient.PersonId
					}
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
		async updateBed(){
			if (this.info.actionBed) {
				//update bed
				this.info.actionBed(this.info.BedId, false);
				
				//update  before bed				
				if (this.info && this.info.BeforeBedId && this.info.BeforeBedId != this.info.BedId) {
					this.$nextTick(()=>{
						this.info.actionBed(this.info.BeforeBedId, true);						
						this.info.BeforeBedId=this.info.BedId
					})
				}
			}
		},
		async save(){
			try {
				this.loading = true;
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {	
					if (this.info && (!this.info.BedId)) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Seleccionar Cama"});
					}else{
						// console.log("@SAVE ", this.info.Orders)
						// const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN LABORATORIO");
						const service = new StayOrderService();
						const res = await service.saveInfo({
							AttentionId :  parseInt(this.$route.params.id),
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							BedId : this.info?.BedId,
							ambit : this.info?.ambit,
							
						});
						if (res && res.data) {
							this.info.id = res.data.id;			
							this.updateBed();				
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
					if (this.info && (!this.info.BedId)) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Seleccionar Cama"});
					}else{
						// const typeOrder = this.typesOrder.filter(x=> x.name == "ORDEN LABORATORIO");
						const service = new StayOrderService();
						const res = await service.updateInfo({
							id : this.info?.id,
							AttentionId :  parseInt(this.$route.params.id),
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							BedId : this.info?.BedId,
							ambit : this.info?.ambit,
						});
						if (res && res.data) {					
							this.updateBed();											
							this.$ManagerSmith.Sound.play("sound1")
							this.$EventBus.$emit("notifications", {
								type 	: "updated"
							});
						}
					}
				}
			}catch(error){
				console.warn("Error udpate  ", error);
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
				const service = new StayOrderService();
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
				const service = new StayOrderService();
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