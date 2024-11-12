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
							@keyup.enter 	= "actions(item)"
							class 			= "text-uppercase"
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
					<v-btn color="primary" :loading="loading" @click="(info.id || info.idx)?updateItem():saveItem()">{{(info.id || info.idx)?"Editar":"Agregar"}}</v-btn>
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
	import RecoveryObservationSurgeryService from "@/services/NoteService.js"//RecoveryObservationSurgeryService
	import dates from "@/helpers/dates.vue"

	export default{
		name : "SubRecoverySurgeryComponent",
		components: {CategoryComponent, dates},
		props : ["infoInput", "currentPermission"],
		data : (vm)=>({				
			infoItem : null,
			info : {
				date: vm.$ManagerSmith.getDateCurrent(),
				hour : vm.$ManagerSmith.getTimeCurrentHS(),
				AttentionId : vm.$route.params.id,
			},			
			reference : "SubMedicalNotesRecovery",						
			headers : [
				{ text : "FECHA", value : "date" },
				{ text : "HORA", value : "time" },			
				{ text : "OBSERVACION", value : "note" },		
				{ text : "", value : "actions" },
			],
			loading : false, 
			isEditing : false,
			fields :[
				{
					key  : 'date',
					text : "date",
					type : "date_range",
					cols : 2,
					ref : "date",
					isDisabled : true,
					// auto : true,
				},
				{
					key  : 'time',
					text : "hour",
					type : "time_picker",
					cols : 2,
					ref : "hour",
					isDisabled : true,
				},
				{
					cols : 6,
					key 	 		: "note", // observation
					key_main 		: "ObservationEvolutionNotes",
	 				type 	 		: "textarea",
					text 	 		: "Descripcion",
					btn_add 		: true,
					placeholder 	: "Descripcion",
					action 			: "add_table",

				}
			]
		}),// data		
		created(){
			this.setDefault();
		},
		mounted(){
			this.getList();
		},
		computed:{
			renderList(){
				return this.infoInput.RecoveryObservations || [];
			},
			renderFields(){		
				return this.fields.map(x=>{
					if (this.currentPermission && ["date","time"].includes(x.key)) {
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
					time : this.$ManagerSmith.getTimeCurrentHS(),
					AttentionId : this.$route.params.id,
				}		
				if (this.$route.params && this.$route.params.order) {
					this.info.OrderId=parseInt(this.$route.params.order);
				}		
				this.isEditing=false;				
				// this.renderDisabledFields();
			},
			
			confirmEdit(item){
				this.info = {...item};		
				this.isEditing=true;
				// this.renderDisabledFields();		
			},
			confirmDelete(item){
				this.infoItem = {...item};				
				this.$EventBus.$emit("notifications",{
					type : "confirm_delete",
					ID : this.reference,
					action : this.deleteItem,
				})
			},
			async getList(){
				try {
				this.loading = true;	
				const noteType = this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote(this.$route.name))?.id || undefined;
				const service = new RecoveryObservationSurgeryService();

				const res = await service.findInfo({ ord : this.$route.params.order, type:noteType });
				if (res && res.data && res.data.length) {					
					this.infoInput.RecoveryObservations = res.data && res.data.length ? res.data : []; // .ObservationEvolutionNotes		
				}
			} catch (error) {
				console.warn("Error get info  notes ", error)
			}finally{
				this.loading = false;
			}
			},
			async saveItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
						if (this.info && !this.info.note ) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Observacion"});
						}else{
							this.info.NoteTypeId=this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote(this.$route.name))?.id || undefined;
							this.info.UserId=this.$store.getters["auth/userId"];

							const service = new RecoveryObservationSurgeryService();
							const res = await service.saveInfo(this.info);
							if (res) {

								if (res.error){
									this.$EventBus.$emit("notifications", { type : "warning" , msg : this.Helper.renderErrorMessage(res.error, "Error creando nota")});

								}else if (res.data) {														
									this.infoInput.RecoveryObservations.push({...this.info, id: res.data.id});//idx: new Date().getTime()
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
						if (this.info && !this.info.note ) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Observacion"});
						}else{
							if (this.infoInput.RecoveryObservations) {		
								if (this.info && this.info.id ) {
									const service = new RecoveryObservationSurgeryService();
									const res = await service.updateInfo(this.info);
									if (res) {
										if (res.error){
											this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Editando nota")});
										}else if (res.data) {			
											const idx = this.infoInput.RecoveryObservations.findIndex(x => x && (x.id == this.info.id )); // || (this.info.idx && x.idx == this.info.idx)
											if (idx >= 0) {
												this.infoInput.RecoveryObservations.splice(idx, 1, {...this.info});
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
						if (this.infoInput.RecoveryObservations && this.infoInput.RecoveryObservations.length > 0) {					
							if (this.infoItem && this.infoItem.id ) {
								const service = new RecoveryObservationSurgeryService();
								const res = await service.deleteInfo(this.infoItem)
							}
							
							const idx = this.infoInput.RecoveryObservations.findIndex(x => x && (x.id == this.infoItem.id )); // || (this.infoItem.idx && x.idx == this.infoItem.idx)
							if (idx >= 0) {
								this.infoInput.RecoveryObservations.splice(idx, 1);
								this.setDefault();
								this.infoItem=null;
							}
							this.$EventBus.$emit("notifications", {
								type: "success",
								msg : "Nota eliminada"
							});						
						}
					}
				}catch(error){
					console.warn("Error delete "+ this.reference, error);
					this.$EventBus.$emit("notifications", {
						type: "warning",
						msg : "Error eliminando Nota"
					});
				}finally{
					this.loading = false;
				}
			}
		}, // methods

	};
</script>