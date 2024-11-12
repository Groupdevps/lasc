<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle=""
		reference = "OstheosynthesisMaterialsForm"
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
					v-show =  "info.id"
				>
					<v-icon   class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			<v-spacer></v-spacer>
		</template>
		<template v-slot:field-OrderMaterials="{ itemField }">
			<SubOsteosynthesisMaterialComponent :inputField="info" keyField="OrderMaterials" :currentPermission="currentPermission"></SubOsteosynthesisMaterialComponent>
		</template>
	</FormSessionLayout>
</template>
<script type = "text/javascript">
import fields_params  	from "@/components/surgery/js/osteosynthesis_materials_surgery_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import SubOsteosynthesisMaterialComponent from "@/components/surgery/SubOsteosynthesisMaterialComponent.vue"
import DiagnosesService from "@/services/DiagnosesService.js"
import OsteosynthesisMaterialsService from "@/services/OrderService.js"//OsteosynthesisMaterialsService
import Anexo9Service from "@/services/Anexo9Service.js"


export default {
	name : "OstheosynthesisMaterialsComponent",
	props: ["ReduceSize",],
	components : {
		FormSessionLayout, SubOsteosynthesisMaterialComponent
	}, //components
	data : (vm) => ({
		info 		 	: {
			assignedDate 	: vm.$ManagerSmith.getDateCurrent(),
			hour 		 	: vm.$ManagerSmith.getTimeCurrent(),	
			OrderMaterials 	: [],		
			SubDiagnoseLists : [],
			// SubTreatments : [],
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
				const typeOrder = [this.$store.getters["listTypesOrder/getTypeOrderByName"]("SOLICITUD MATERIAL OSTEOSINTEXIS")?.id || 12];
				const service = new OsteosynthesisMaterialsService();
				const res = await service.findInfo({ order : this.$route.params.order, type: typeOrder });
				if (res && res.data && res.data.orders && res.data.orders.length) {
					const item = res.data.orders.find(x=> x.id == parseInt(this.$route.params.order));						
					if (item) {						
						// this.info = this.$ManagerSmith.formatFormInfo({...res.data}, {...this.info}, "medical_formulas");
						this.info = this.$ManagerSmith.formatFormInfo({...this.currentPatient}, {...this.info});
						this.info.AttentionId = this.info.id;
						delete this.info.id;
						// this.info.id = res.data.id;					
						this.info.SubDiagnoseLists = this.renderSubDiagnose(res.data.SubDiagnoseLists);
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
					if (this.info && this.info.OrderMaterials.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Materiales"});
					}else{
						const typeOrder = this.$store.getters["listTypesOrder/getTypeOrderByName"]("SOLICITUD MATERIAL OSTEOSINTEXIS")?.id || 12;
						const service = new OsteosynthesisMaterialsService();
						const res = await service.saveInfo({							
							OrderTypeId : typeOrder,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							OrderMaterials : this.info.OrderMaterials,
							orderReference : this.$route.params.order,
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
					if (this.info && this.info.OrderMaterials.length == 0) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Materiales"});
					}else{
						const service = new OsteosynthesisMaterialsService();
						const res = await service.updateInfo({
							id : this.info.id,							
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							// UserId : this.$store.getters["auth/userId"],
							// CenterId : this.$store.getters["infoCenter/getCenterId"],							
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
				const service = new OsteosynthesisMaterialsService();
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
				const service = new OsteosynthesisMaterialsService();
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