<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Egreso"
		reference = "DischargeForm"
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
		<template v-slot:field-mainDischargeDiagnosis="{ itemField }">
			<MenuDiagnoses :inputField="info" keyField="mainDischargeDiagnosis" labelToMenu="DIAGNOSTICO PRINCIPAL" itemValue="id"></MenuDiagnoses>			
		</template>
		<template v-slot:field-diagnosis1Discharge="{ itemField }">
			<MenuDiagnoses :inputField="info" keyField="diagnosis1Discharge" labelToMenu="DIAGNOSTICO 1 ALTA" itemValue="id"></MenuDiagnoses>			
		</template>
		<template v-slot:field-diagnosis2Discharge="{ itemField }">
			<MenuDiagnoses :inputField="info" keyField="diagnosis2Discharge" labelToMenu="DIAGNOSTICO 2 ALTA" itemValue="id"></MenuDiagnoses>			
		</template>
		<template v-slot:field-diagnosis3Discharge="{ itemField }">
			<MenuDiagnoses :inputField="info" keyField="diagnosis3Discharge" labelToMenu="DIAGNOSTICO 3 ALTA" itemValue="id"></MenuDiagnoses>			
		</template>
		<template v-slot:prepend-icon-field-headAndNeck="{itemField}" >
			<v-icon class="mr-2" @click="copyText(itemField)">{{itemField.prependIcon}}</v-icon>
		</template>
		<template v-slot:prepend-icon-field-chest="{itemField}" >
			<v-icon class="mr-2" @click="copyText(itemField)">{{itemField.prependIcon}}</v-icon>
		</template>
		<template v-slot:prepend-icon-field-abdomen="{itemField}" >
			<v-icon class="mr-2" @click="copyText(itemField)">{{itemField.prependIcon}}</v-icon>
		</template>
		<template v-slot:prepend-icon-field-extremities="{itemField}" >
			<v-icon class="mr-2" @click="copyText(itemField)">{{itemField.prependIcon}}</v-icon>
		</template>
		<template v-slot:prepend-icon-field-neurological="{itemField}" >
			<v-icon class="mr-2" @click="copyText(itemField)">{{itemField.prependIcon}}</v-icon>
		</template>
		<template v-slot:prepend-icon-field-genitourinary="{itemField}" >
			<v-icon class="mr-2" @click="copyText(itemField)">{{itemField.prependIcon}}</v-icon>
		</template>
		<template v-slot:prepend-icon-field-skinFannels="{itemField}" >
			<v-icon class="mr-2" @click="copyText(itemField)">{{itemField.prependIcon}}</v-icon>
		</template>
		<template v-slot:prepend-icon-field-lumbarOsteotendinous="{itemField}" >
			<v-icon class="mr-2" @click="copyText(itemField)">{{itemField.prependIcon}}</v-icon>
		</template>
	</FormSessionLayout>	
</template>
<script type = "text/javascript">
import field_params from "@/components/medico/js/discharge_params.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
import MenuDiagnoses from "@/components/info/MenuDiagnosesComponent.vue"

import DiagnosesService from "@/services/DiagnosesService.js"
import DischargeService from "@/services/DischargeService.js"
import OrderService 		from "@/services/OrderService.js"
export default {
	name : "LaboratoryOrdenComponent",
	props: ["ReduceSize"],
	components : {
		FormSessionLayout, MenuDiagnoses
	}, //components
	data : (vm) => ({		
		info 		 	: {
			assignedDate : vm.$ManagerSmith.getDateCurrent(),
			hour 		 : vm.$ManagerSmith.getTimeCurrent(),		
			// headAndNeck : vm.$t("msg_headAndNeck"),
			// chest : vm.$t("msg_chest"),
			// abdomen : vm.$t("msg_abdomen"),
			// extremities : vm.$t("msg_extremities"),
			// neurological : vm.$t("msg_neurological"),
			// genitourinary : vm.$t("msg_genitourinary"),
			// skinFannels : vm.$t("msg_skinFannels"),
			// lumbarOsteotendinous : vm.$t("msg_lumbarOsteotendinous"),
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
			return this.$store.getters["auth/getPermission"]("DischargeHospitalization") 
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
		copyText(item){
			if (item && item.msg_default) {
				this.$nextTick(()=>{
					this.info ={ 
						...this.info,
						[item.key]: this.$t(item.msg_default)
					}; 
				})				
			}
		},

		async getInfo(){
			try {
				this.loading = true;						
				const service = new DischargeService();
				const res = await service.findInfo({ 
					AttentionId : this.$route.params.id,  					
				});
				
				// const service = new DischargeService();
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
					if (this.info && (!this.info.mainDischargeDiagnosis || !this.info.departureReason || !this.info.exitStatus)) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Diagnostico Principal, Motivo de salida y Estado de salida"});
					}else{
						const service = new DischargeService();
						const res = await service.saveInfo({
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							weight: this.info.weight ,// INTEGER,
						    size: this.info.size ,// INTEGER,
						    arterialTsn: this.info.arterialTsn ,// STRING,
						    cardiacFr: this.info.cardiacFr ,// INTEGER,
						    respiratoryFr: this.info.respiratoryFr ,// INTEGER,
						    pulse: this.info.pulse ,// INTEGER,
						    temperature: this.info.temperature ,// FLOAT,
						    eyeOpening: this.info.eyeOpening ,// INTEGER,
						    verbalResponse: this.info.verbalResponse ,// INTEGER,
						    motorResponse: this.info.motorResponse ,// INTEGER,
						    generalConditionsUponDeparture: this.info.generalConditionsUponDeparture ,// TEXT,
						    headAndNeck: this.info.headAndNeck ,// TEXT,
						    chest: this.info.chest ,// TEXT,
						    abdomen: this.info.abdomen ,// TEXT,
						    extremities: this.info.extremities ,// TEXT,
						    neurological: this.info.neurological ,// TEXT,
						    genitourinary: this.info.genitourinary ,// TEXT,
						    evolutions: this.info.evolutions ,// TEXT,
						    hospitalizationJustification: this.info.hospitalizationJustification ,// TEXT,
						    orders: this.info.orders ,// TEXT,
						    mainDischargeDiagnosis: this.info.mainDischargeDiagnosis ,// INTEGER,
						    diagnosis1Discharge: this.info.diagnosis1Discharge ,// INTEGER,
						    diagnosis2Discharge: this.info.diagnosis2Discharge ,// INTEGER,
						    diagnosis3Discharge: this.info.diagnosis3Discharge ,// INTEGER,
						    consultationSPurpose: this.info.consultationSPurpose ,// STRING,
						    externalCause: this.info.externalCause ,// STRING,
						    departureReason: this.info.departureReason ,// STRING,
						    exitStatus: this.info.exitStatus ,// STRING,
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
				console.warn("Error save ", error);
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
					if (this.info && (!this.info.mainDischargeDiagnosis || !this.info.departureReason || !this.info.exitStatus)) {
						this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Diagnostico Principal, Motivo de  salida y Estado de salida"});
					}else{
						
						const service = new DischargeService();
						const res = await service.updateInfo({
							id : this.info.id,
							AttentionId :  this.$route.params.id,
							PersonId : this.info.PersonId,							
							UserId : this.$store.getters["auth/userId"],
							CenterId : this.$store.getters["infoCenter/getCenterId"],
							weight: this.info.weight ,// INTEGER,
						    size: this.info.size ,// INTEGER,
						    arterialTsn: this.info.arterialTsn ,// STRING,
						    cardiacFr: this.info.cardiacFr ,// INTEGER,
						    respiratoryFr: this.info.respiratoryFr ,// INTEGER,
						    pulse: this.info.pulse ,// INTEGER,
						    temperature: this.info.temperature ,// FLOAT,
						    eyeOpening: this.info.eyeOpening ,// INTEGER,
						    verbalResponse: this.info.verbalResponse ,// INTEGER,
						    motorResponse: this.info.motorResponse ,// INTEGER,
						    generalConditionsUponDeparture: this.info.generalConditionsUponDeparture ,// TEXT,
						    headAndNeck: this.info.headAndNeck ,// TEXT,
						    chest: this.info.chest ,// TEXT,
						    abdomen: this.info.abdomen ,// TEXT,
						    extremities: this.info.extremities ,// TEXT,
						    neurological: this.info.neurological ,// TEXT,
						    genitourinary: this.info.genitourinary ,// TEXT,
						    evolutions: this.info.evolutions ,// TEXT,
						    hospitalizationJustification: this.info.hospitalizationJustification ,// TEXT,
						    orders: this.info.orders ,// TEXT,
						    mainDischargeDiagnosis: this.info.mainDischargeDiagnosis ,// INTEGER,
						    diagnosis1Discharge: this.info.diagnosis1Discharge ,// INTEGER,
						    diagnosis2Discharge: this.info.diagnosis2Discharge ,// INTEGER,
						    diagnosis3Discharge: this.info.diagnosis3Discharge ,// INTEGER,
						    consultationSPurpose: this.info.consultationSPurpose ,// STRING,
						    externalCause: this.info.externalCause ,// STRING,
						    departureReason: this.info.departureReason ,// STRING,
						    exitStatus: this.info.exitStatus ,// STRING,
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
				const service = new DischargeService();
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
				const service = new DischargeService();
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