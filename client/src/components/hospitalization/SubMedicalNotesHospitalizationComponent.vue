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
				<template v-for="item in fields ">
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
					<v-btn color="primary" :loading="loading" @click="(info.id || info.idx)?updateItem():saveItem()">{{(info.id || info.idx)?"Editar":"Guardar"}}</v-btn>
				</v-col>
			</v-row>
			
		</template>	
		<template v-slot:item.actions="{ item }">
			<v-btn-toggle mandatory>
				<v-btn x-small color="primary" @click="confirmEdit(item)"> <v-icon x-small>mdi-pencil</v-icon></v-btn>
				<v-btn x-small color="error" @click="confirmDelete(item)"><v-icon x-small>mdi-delete</v-icon></v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>
</template>
<script type="text/javascript">
	import CategoryComponent from "@/components/info/SearcherCategoryComponent.vue"
	import MedicalNotesService from "@/services/MedicalNotesHospitalizationService.js"
	import dates 			from "@/helpers/dates.vue"

	export default{
		name : "SubMedicalNotesHospitalizationComponent",
		components: {CategoryComponent, dates},
		props : ["infoInput"],
		data : (vm)=>({				
			info : {
				date: vm.$ManagerSmith.getDateCurrent(),
				hour : vm.$ManagerSmith.getTimeCurrent(),
				AttentionId : vm.$route.params.id,
			},			
			reference : "SubMedicalNotesHospitalization",			
			searchInput : { cup : {}, category : {}},
			headers : [
				{ text : "Fecha", value : "date" },
				{ text : "Hora", value : "hour" },			
				{ text : "observacion", value : "observation" },		
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
					// auto : true,
				},
				{
					key  : 'hour',
					text : "hour",
					type : "time_picker",
					cols : 2,
					ref : "hour",
				},
				{
					cols : 6,
					key 	 		: "observation",
					key_main 		: "ObservationEvolutionNotes",
	 				type 	 		: "textarea",
					text 	 		: "description",
					btn_add 		: true,
					placeholder 	: "description",
					action 			: "add_table",

				}
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
			}
		},
		methods:{
			setDefault(){
				this.info = {					
					observation : "",
					date : this.info.date ? this.info.date : "",  
					hour : this.info.hour ? this.info.hour : "",
					// AttentionId : this.$route.params.id,
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
					this.infoInput.ObservationEvolutionNotes.push({...this.info, idx: new Date().getTime()});
					this.$EventBus.$emit("notifications", {
						type: "success",
						msg : "Nota Agregada"
					});
					this.setDefault();
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
					if (this.infoInput.ObservationEvolutionNotes) {		
						if (this.info && this.info.id ) {
							const service = new MedicalNotesService();
							const res = await service.updateSubInfo(this.info)								
						}
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
					if (this.infoInput.ObservationEvolutionNotes && this.infoInput.ObservationEvolutionNotes.length > 0) {					
						if (this.info && this.info.id ) {
							const service = new MedicalNotesService();
							const res = await service.deleteSubInfo(this.info)
						}
						
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