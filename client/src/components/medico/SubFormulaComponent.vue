<template>
	<v-data-table
		dense
	    fixed-header
		:headers 			 = "headers"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5 ma-2"			 			   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,	   		
	   		itemsPerPageOptions : [100],
	   		showCurrentPage     : false
	   	}"
	   	:loading-text 		= "$t('LoadingPeaseWait')"
	    :height             = "200"			   
	    :loading 			= "loadingMedicine" 
	>
		<template v-slot:top>
			<v-row dense>
				<v-col cols="12">
					<CategoryComponent startCategory="MEDICAMENTOS" :inputField="searchInput" keyField="formula" :isDisabledCategory="true"></CategoryComponent>							
				</v-col>
				<template v-for="item in MedicineFields ">
					<v-col>
						
						<v-text-field outlined dense v-if="item.type =='text'" v-model="info[item.key]" :label="$t(item.text)"></v-text-field>
						<v-text-field outlined dense v-else-if="item.type =='number'" type="number" v-model.number="info[item.key]" :label="$t(item.text)"></v-text-field>
					</v-col>
				</template>
				<v-col>
					<v-btn color="primary" :loading="loadingMedicine"  @click="(info.id || info.idx)?updateMedicine():saveMedicine()">{{(info.id || info.idx)?"Editar":"Agregar"}}</v-btn>
				</v-col>
			</v-row>
			
		</template>	
		<template v-slot:item.actions="{ item }">
			<v-btn-toggle mandatory>
				<v-btn x-small color="primary" @click="confirmEdit(item)" v-show="currentPermission.canEdit"> <v-icon x-small>mdi-pencil</v-icon></v-btn>
				<v-btn x-small color="error" @click="confirmDelete(item)" v-show="currentPermission.canDelete"><v-icon x-small>mdi-delete</v-icon></v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>
</template>
<script type="text/javascript">
	import CategoryComponent from "@/components/info/SearcherCategoryComponent.vue"
	import MedicalFormulasService from "@/services/MedicalFormulasService.js"

	export default{
		name : "SubFormulaComponent",
		components: {CategoryComponent},
		props : ["infoInput", "currentPermission"],
		data : ()=>({				
			reference : "SubFormulaMedicine",			
			searchInput : { formula : {}, category : {}},
			headers : [
				{ text : "Medicina", value : "medicine" },			
				{ text : "Cantidad", value : "amount" },			
				{ text : "Dosis", value : "dosage" },			
				{ text : "", value : "actions" },
			],
			info : {},			
			loadingMedicine : false, 
			MedicineFields :[
				{
					key 	 		: "medicine",
					key_main 		: "Medicines",
	 				type 	 		: "text",
					text 	 		: "medicine",			
					placeholder 	: "medicine",
					action 			: "",
				},
				{
					key 	 		: "amount",
					key_main 		: "Medicines",
	 				type 	 		: "number",
					text 	 		: "amount",

					placeholder 	: "amount",
					action 			: "",
					cols 			:  3

				},
				{
					key 	 		: "dosage",
					key_main 		: "Medicines",
	 				type 	 		: "text",
					text 	 		: "dosage",
					btn_add 		: true,
					placeholder 	: "dosage",
					action 			: "add_table",

				},
			]
		}),// data
		watch:{
			"searchInput.formula"(val){
				this.renderCategory(val);
			}
		},
		created(){
			this.setDefault();
		},
		computed:{
			renderList(){
				return this.infoInput.Medicines || [];
			}
		},
		methods:{
			setDefault(){
				this.info = {					
					MedicineId : null,
					MedicationListId : null,
					medicine : ""
				}
			},
			renderCategory(item){			
				if(item){
					// this.info.CupsList = { code : item.code || item.codeAtc || item.cups};
					// this.info.MedicineId = item.id;
					this.info.medicine = item.description;
					this.info.MedicationListId = item.id;					
					item = {} 
				}
			},
			confirmEdit(item){
				this.info = {...item};				
			},
			confirmDelete(item){
				this.info = {...item};
				this.$EventBus.$emit("notifications",{
					type : "confirm_delete",
					ID : this.reference,
					action : this.deleteMedicine,
				})
			},
			async saveMedicine(){
				try{
					this.loadingMedicine = true;
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
						if (this.info && !this.info.medicine && !this.info.amount && !this.info.dosage ) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Medicina, Cantidad, Dosis"});
						}else{

							if (this.infoInput.Medicines) {						
								const service = new MedicalFormulasService();
								const res = await service.saveSubInfo(this.info);
								let ID =  null;
								let Medicine = this.info.medicine;
								let MedicineId = null;
								if (res && res.data) {
									ID = res.data.id;
									MedicineId = ID;
								}					
								this.infoInput.Medicines.push({
									...this.info, 
									id : ID,  
									idx: new Date().getTime(),
									Medicine,
									MedicineId,
								});
								this.$EventBus.$emit("notifications", {
									type: "success",
									msg : "Medicina Agregada"
								});
								this.setDefault();
							}
						}
					}
				}catch(error){
					console.warn("Error add medicine ", error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error agregando la Medicina"
					});
				}finally{
					this.loadingMedicine = false;
				}
			},
			async updateMedicine(){
				try{
					this.loadingMedicine = true;
					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
						if (this.info && !this.info.medicine && !this.info.amount && !this.info.dosage ) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Medicina, Cantidad, Dosis"});

						}else{
							if (this.infoInput.Medicines) {		
								const service = new MedicalFormulasService();
								const res = await service.updateSubInfo(this.info);
								const idx = this.infoInput.Medicines.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
								if (idx >= 0) {
									this.infoInput.Medicines.splice(idx, 1, {...this.info});
									this.$EventBus.$emit("notifications", {
										type: "success",
										msg : "Medicina Editada"
									});
									this.setDefault();
								}		
							}
						}
					}
				}catch(error){
					console.warn("Error add medicine ", error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error Editando Medicina"
					});
				}finally{
					this.loadingMedicine = false;
				}
			},
			async deleteMedicine(){
				try{
					this.loadingMedicine = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {

						if (this.infoInput.Medicines && this.infoInput.Medicines.length > 0) {					
							if (this.info && this.info.id ) {
								const service = new MedicalFormulasService();
								const res = await service.deleteSubInfo(this.info)
							}
							
							const idx = this.infoInput.Medicines.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
							if (idx >= 0) {
								this.infoInput.Medicines.splice(idx, 1);
								this.setDefault();							
							}
							this.$EventBus.$emit("notifications", {
								type: "success",
								msg : "Medicina eliminada"
							});						
						}
					}
				}catch(error){
					console.warn("Error delete medicine ", error);
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error eliminando Medicina"
					});
				}finally{
					this.loadingMedicine = false;
				}
			}
		}, // methods

	};
</script>