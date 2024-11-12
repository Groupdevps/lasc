<template>
	<v-data-table
			fixed-header
	        class    = "elevation-5"
	        :headers = "headers"
	        :items   = "listRender"
	        :loading = "loading"
	        loading-text 		= "Cargando... por favor espere"
		    :height 			= "(currentHeight-395)+'px'"
		>
			<template v-slot:top>
				<v-divider class = "pa-0 my-2 ma-0 primary" :inset="false"></v-divider>
				<span class="ml-2"> AGREGAR O EDITAR CAMPOS DE REFERENCIA: </span>
				<v-row class="ml-1 mt-1" dense>
					<v-col cols="3">						
						<AnalysisListComponent
							ref = "fieldAnalysis"								
							:inputField = "info"
							keyField = "AnalysisList"
							:isReturnObject = "true"								
						></AnalysisListComponent>
					</v-col>
					<template v-for="field in fields">
						<v-col :cols="field.cols || 3">
							<v-text-field 
								dense 
								outlined 
								hide-details 
								:label="field.text" 
								v-model="info[field.key]"
								v-if="field.type == 'text' "
								class="text-uppercase"
								:disabled = "isDisabled"
							></v-text-field>
							<TypeAnalysisComponent
								v-else-if="field.type == 'TypeAnalysisComponent'"
								:keyField = "field.key"
								:inputField="info"
								:isReturnObject = "true"
								:isDisabled = "isDisabled"

							></TypeAnalysisComponent>
						</v-col>
					</template>
					<v-col cols="1">
						<v-btn color="primary" :loading="loading" @click="isEditing ? update() : save()"> {{!isEditing? "Agregar": "Editar"}}</v-btn>
					</v-col>
				</v-row>
			</template>
			<template v-slot:item.actions="{item}">
				<v-btn small color="primary" @click="editItem(item)" v-show="currentPermission.canEdit"><v-icon>mdi-pencil</v-icon></v-btn>				
				<v-btn small color="error" @click="deleteItem(item)" v-show="currentPermission.canDelete"><v-icon>mdi-delete</v-icon></v-btn>				

			</template>
		</v-data-table>
</template>
<script type="text/javascript">
	import AnalysisOfLaboratoryService from "@/services/AnalysisOfLaboratoryService.js"
	import AnalysisLaboratoryService from "@/services/AnalysisLaboratoryService.js"

	import TypeAnalysisComponent from "@/components/laboratory/TypeAnalysisMenuComponent.vue"
	import AnalysisListComponent from "@/components/laboratory/MenuAnalysisListComponent.vue"
	export default{
		name: "SubTypeAnalisisComponent",
		props:["infoToComponent", "currentHeight", "currentPermission"],
		components : {TypeAnalysisComponent, AnalysisListComponent},
		data : ()=>({
			reference : "SubTypeAnalisis",
			info:{AnalysisTypeId: "", AnalysisList: null, },
			infoItem : null,
			bus:{},
			loading : false,
			isEditing : false,
			isDisabled : false,
			list : [],
			headers:[
				{text: "NOMBRE" ,value : "name"},
				{text: "UNIDADES" ,value : "units"},
				{text: "VALOR DE REFERENCIA" ,value : "referenceValue"},
				{text: "TIPO ANALISIS" ,value : "AnalysisType.name"},				
				{text: "ACCIONES" ,value : "actions"},
			],
			fields:[
				{ key : "name", text : "Nombre de Analisis", type : "text", cols: 2},
				{ key : "units", text : "Unidades", type : "text", cols: 2},
				{ key : "referenceValue", text : "Valores de referencia", type : "text",cols: 2 },
				{ key : "AnalysisType", text : "Tipo de Analisis", type : "TypeAnalysisComponent", cols: 2},
			],
		}),

		watch:{
			"info.AnalysisList"(val){
					console.log("VAL ", val)
				if (val) {
					this.info.name = val.name;
					this.info.units = val.units;
					this.info.referenceValue = val.referenceValue;
					this.info.AnalysisType = val.AnalysisType;
					this.isDisabled = true;
				}else{
					this.isDisabled = false;
				}
			},
		},
		mounted(){
			if (this.AnalysisTypeId) {
				this.getList();
			}		
		},
		
		computed:{
			listRender(){
				return this.list;
			},
		},
		methods:{
			editItem(item){
				this.info = {...item};
				this.isEditing =  true;
			},
			deleteItem(item){
				this.infoItem = {...item};		
				this.$EventBus.$emit("notifications",{
					type : "confirm_delete",
					ID : "SubTypeAnalisis",
					action : this.deleteSubType
				})						
			},		
			async getListParams(params){
					try{
					this.loading = true;
					const service = new AnalysisLaboratoryService(); //new AnalysisOfLaboratoryService();
					const res = await service.findAnalysisLaboratory(params);
					if (res && res.data && res.data.length > 0) {
						this.list = res.data.filter(x => x.active ).map(z => z.Analysis);
					}else{
						this.list = [];
					}
				}catch(error){
					console.warn("Error get List Analisis ", error )
				}
				this.loading = false;
			},

			async getList(){
				try{
					this.loading = true;
					const service = new AnalysisOfLaboratoryService();
					// const res = await service.getAnalysis({AnalysisTypeId : this.AnalysisTypeId});					
					if (res && res.data && res.data.length > 0) {
						this.list = res.data.filter(x => x.active );
					}else{
						this.list = [];
					}
				}catch(error){
					console.warn("Error get List Analisis ", error )
				}
				this.loading = false;

			},
			async save(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
						if (this.info && !this.info.name &&  !this.info.units) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre y Unidades"});
						}else{

							if (this.info.AnalysisType && this.info.AnalysisType.id) {
								this.info.AnalysisTypeId = this.info.AnalysisType.id;
							}
							const service = new AnalysisOfLaboratoryService();

							const res = await service.saveAnalysis(this.info);
							if (res && res.error) {
								this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error,"Error Guardando Analisis")});
							}else
							if (res && res.data) {
								this.info.id = res.data.id;				
								this.isDisabled = false;		
								this.$EventBus.$emit("notifications",{
									type : "saved",
									msg : "Campo de analisis"
								});
								if (this.infoToComponent && this.infoToComponent.CupList) {
									this.saveWithComponent({
										AnalysisList : this.info,
										CupList : this.infoToComponent.CupList,
									})
								}

								this.info = {};
							}
						}
					}
				}catch(error){
					console.warn("Error create analisis ", error)
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg : this.$Helper.renderErrorMessage(error, "Guardando campo de analisis")
					});
				}
				this.loading = false;
			},
			saveWithComponent(item){
				this.loading = true;
				const service = new AnalysisOfLaboratoryService();
				service.saveAnalysisLab({ 
					AnalysisId : item.AnalysisList.id, 
					cup : item.CupList.code,
					CupsListId : item.CupList.id,
				}).then(res => {
					if (res && res.data) {
						this.$EventBus.$emit("notifications",{
							type : "saved",
							msg : "Analisis"
						});
						this.list.push({...item.AnalysisList});
					}
					this.loading = false;					
				}).catch(error=> {
					this.loading = false;
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg : "Guardando analisis"
					});
				})
				// 
			},
			async update(){
				try{
					this.loading = true;

					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
						if (this.info && !this.info.name &&  !this.info.units) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nombre y Unidades"});
						}else{
							const service = new AnalysisOfLaboratoryService();
							const res = await service.updateAnalysis(this.info);
							if (res && res.error) {
								this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error,"Error Actualizando Analisis")});
							}else
							if (res && res.data) {			
								const idx = this.list.findIndex( x => x && x.id == this.info.id);
								if (idx >= 0 ) {
									this.list.splice(idx,1, {...this.info});
									this.$EventBus.$emit("notifications",{
										type : "updated",
										msg : "Campo de analisis"
									});
									this.isEditing = false;
									this.info = {};
								}
							}
						}
					}
				}catch(error){
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg : this.$Helper.renderErrorMessage(error, "Actualizando campo de analisis")
					});
				}
				this.loading = false;
			},
			async deleteSubType(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {	
						const service = new AnalysisOfLaboratoryService();
						const res = await service.deleteAnalysis(this.infoItem);
						if (res && res.error) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error,"Error Eliminando Analisis")});
						}else
						if (res && !res.error ) {			
							const idx = this.list.findIndex( x => x && x.id == this.infoItem.id);
							if (idx >= 0 ) {
								this.list.splice(idx,1);
								this.$EventBus.$emit("notifications",{
									type : "deleted",
									msg : "Campo de analisis"
								});
							}
						}else{
							this.$EventBus.$emit("notifications",{
								type : "error",
								msg : "Eliminando campo de analisis"
							});	
						}
					}
				}catch(error){
					console.warn("Error delete analisis ", error);
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg : "Eliminando campo de analisis"
					});
				}
				this.loading = false;
				this.infoItem = null;

			}

		}, // methods

	}
</script>