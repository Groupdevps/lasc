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
	    :loading 			= "loading" 
	>
		<template v-slot:top>
			<v-row dense>
				<!-- <v-col cols="12">
					<CategoryComponent startCategory="PROCEDIMIENTOS" :inputField="searchInput" keyField="cup"></CategoryComponent>							
				</v-col> -->
				<template v-for="item in renderFields ">
					<v-col :cols="item.cols || 'auto'">
						
						<v-text-field outlined dense v-if="item.type =='text'" v-model="info[item.key]" :label="$t(item.text)"></v-text-field>
						<v-text-field outlined dense v-else-if="item.type =='number'" type="number" v-model.number="info[item.key]" :label="$t(item.text)"></v-text-field>
						<v-textarea
							dense outlined hide-details fixed counter
					        rows 			= "2"
					        row-height 		= "25"
							v-else-if		= "['textarea'].includes(item.type)"
							:label 			= "item.text"
							v-model 		= "info[item.key]"							
							class 			= "text-uppercase"
							:disabled 		= "isDisabledActions"
							@input 			= "(v) => info[item.key] = v.toUpperCase()"
						></v-textarea>
						<dates
							:key 				= "item.key + reference"
							v-else-if		    = "['date_range', 'time_picker'].includes(item.type)"
							:info_to_component  = "item"
							:info_to_dates 	    = "info[item.key]"
							@receive_info	    = "info[item.key] = $event"
							:ref_to_component   = "item.key + reference"
						></dates>
					</v-col>
				</template>
				<v-col>
					<v-btn 
						:disabled="isDisabledActions" 
						color="primary" 
						:loading="loading" 
						@click="(info.id || info.idx)?updateItem():saveItem()">{{(info.id || info.idx)?"Editar":"Agregar"}}</v-btn>
				</v-col>
			</v-row>
			
		</template>	
		<template v-slot:item.date="{ item }">
			<span> {{ item.date }}</span>
		</template>
		<template v-slot:item.actions="{ item }">
			<v-btn-toggle mandatory>
				<v-btn x-small color="primary" @click="confirmEdit(item)" :disabled="isDisabledActions" v-show="currentPermission.canEdit"> <v-icon x-small color="white" >mdi-pencil</v-icon></v-btn>
				<v-btn x-small color="error" @click="confirmDelete(item)" :disabled="isDisabledActions" v-show="currentPermission.canDelete"><v-icon x-small color="white">mdi-delete</v-icon></v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>
</template>
<script type="text/javascript">
	// import CategoryComponent from "@/components/info/SearcherCategoryComponent.vue"
	import NursingNotesService from "@/services/NoteService.js"// 
	import dates 			from "@/helpers/dates.vue"

	export default{
		name : "SubNursingNotesComponent",
		components: { dates},
		props : ["infoInput","isDisabledActions", "currentPermission"],
		data : (vm)=>({				
			info : {
				date: vm.$ManagerSmith.getDateCurrent(),
				hour : vm.$ManagerSmith.getTimeCurrentHS(),
				AttentionId : vm.$route.params.id,
			},			
			reference : "SubNursingNotes",			
			searchInput : { cup : {}, category : {}},
			headers : [
				{ text : "FECHA", value : "date" },
				{ text : "HORA", value : "time" },			
				{ text : "OBSERVACION", value : "note" },		
				{ text : "USUARIO", value : "User.name" },		
				{ text : "", value : "actions" },
			],
			loading : false, 
			fields :[
				{
					key  : 'date',
					text : "date",
					type : "date_range",
					cols : 2,
					ref : "date",
					isDisabled : !vm.currentPermission.canEdit && !vm.isDisabledActions,
					// auto : true,
				},
				{
					key  : 'time',
					text : "hour",
					type : "time_picker",
					cols : 2,
					ref : "hour",
					isDisabled : !vm.currentPermission.canEdit && !vm.isDisabledActions,
				},
				{
					cols : 6,
					key 	 		: "note",
					key_main 		: "ObservationEvolutionNotes",
	 				type 	 		: "textarea",
					text 	 		: "DESCRIPCION",
					btn_add 		: true,
					placeholder 	: "Descripcion",
					action 			: "add_table",
				},
			]
		}),// data
		watch:{
			"searchInput.cup"(val){
				this.renderCategory(val);
			}
		},
		created(){
			this.setDefault();
		},
		computed:{
			renderList(){
				return this.infoInput.ObservationEvolutionNotes || [];
			},
			renderFields(){		
				return this.fields.map(x=>{
					if (this.currentPermission && ["date","hour"].includes(x.key)) {
						if(this.currentPermission.canEdit && this.info && this.info.id){
							x.isDisabled=false;
						} else if (this.currentPermission.canAdd) {
							x.isDisabled=false;
						}else{
							x.isDisabled=true;
						}						
					}
					return x
				})				
			},
		},
		methods:{
			setDefault(){
				this.info = {					
					observation : "",
					date : this.info.date ? this.info.date : "",  
					hour : this.$ManagerSmith.getTimeCurrentHS(),
					AttentionId : this.$route.params.id,
				}
			},
			renderCategory(item){			
				if(item){
					
					// this.info.treatment = item.description;

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
					action : this.deleteItem,
				})
			},
			async saveItem(){
				try{
					this.loading = true;
					this.info.hour = this.$ManagerSmith.getTimeCurrentHS();
					this.info.date = this.$ManagerSmith.getDateCurrent();
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
						if (!this.info.note) {
							this.$EventBus.$emit("notifications", {type: "warning", msg : "Se requiere agregar observacion"})
						}else{

							this.info.NoteTypeId=this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote(this.$route.name))?.id || undefined;							
							const service = new NursingNotesService();
							const res = await service.saveInfo({
								AttentionId : this.$route.params.id,
								UserId : this.$store.getters["auth/userId"],
								...this.info,
							});
							if (res) {
								if (res.error){
									this.$EventBus.$emit("notifications", { type : "warning" , msg : this.Helper.renderErrorMessage(res.error, "Error creando nota")});
								}else if (res.data) {
							
									this.info.id = res.data.id;
									this.infoInput.ObservationEvolutionNotes.push({...this.info, idx: new Date().getTime()});
									this.$EventBus.$emit("notifications", {
										type: "success",
										msg : "Nota Agregada"
									});
									this.setDefault();
								}
							}
						}
					}
				}catch(error){
					console.warn("Error add  " + this.reference, error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error agregando la Nota"
					});
				}finally{
					this.loading = false;
				}
			},
			async updateItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
						if (!this.info.note) {
							this.$EventBus.$emit("notifications", {type: "warning", msg : "Se requiere agregar observacion"})
						}else{
							if (this.infoInput.ObservationEvolutionNotes) {		
								// NOTA DE ENFERMERIA
								if (this.info && this.info.id ) {
									const service = new NursingNotesService();
									const res = await service.updateInfo(this.info)								
									if (res) {
										if (res.error){
											this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Editando nota")});
										}else if (res.data) {	
											const idx = this.infoInput.ObservationEvolutionNotes.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))
											if (idx >= 0) {
												this.infoInput.ObservationEvolutionNotes.splice(idx, 1, {...this.info});
												this.$EventBus.$emit("notifications", {
													type: "success",
													msg : "Nota Editada"
												});
												this.setDefault();
											}		
										}
									}
								}
							}
						}
					}
				}catch(error){
					console.warn("Error add "+ this.reference, error)
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error Editando Nota"
					});
				}finally{
					this.loading = false;
				}
			},
			async deleteItem(){
				try{					
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {						
						if (this.infoInput.ObservationEvolutionNotes && this.infoInput.ObservationEvolutionNotes.length > 0) {					
							if (this.info && this.info.id ) {
								const service = new NursingNotesService();
								const res = await service.deleteInfo(this.info)
								if(res){
									if (res.error) {
										this.$EventBus.$emit("notifications", { type : "warning" , msg : res.error.response.data.message || res.error.response.data || "Error Borrando nota de enfermeria"});									
										this.setDefault();
										
									}else if(res.data){
										const idx = this.infoInput.ObservationEvolutionNotes.findIndex(x => x && (x.id == this.info.id || (this.info.idx && x.idx == this.info.idx)))							
										if (idx >= 0) {
											this.infoInput.ObservationEvolutionNotes.splice(idx, 1);
											this.setDefault();
										}
										this.$EventBus.$emit("notifications", {
											type: "success",
											msg : "Nota eliminada"
										});						
									}
								}
							}
						}
					}
				}catch(error){
					console.warn("Error delete "+ this.reference, error);
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : error.response.data.message || error.response.data || "Error eliminando Nota"
					});
				}finally{
					this.loading = false;
				}
			}
		}, // methods

	};
</script>