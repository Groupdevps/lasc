<template>	
	<!-- v-if 			 	 = "info_field.type == 'table_field'" -->
	<v-data-table
		dense
	    fixed-header
		:headers 			 = "headersToComponent"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-1"			 			   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,
	   		itemsPerPageOptions : [30],
	   		showCurrentPage     : false
	   	}"
	   	:loading-text 		= "$t('LoadingPleaseWait')"
	    height 			= "135px"
	    :loading  			= "loading"   			
	>
	 	<template v-slot:top>
	 		<v-row dense>	 			
	 			<template v-for = "(itemField, idx_field) of fieldsToComponent">
	 				<v-col :cols = "itemField.cols || 'auto'">					 
						<v-text-field
							dense
							outlined
							hide-details
							:label  	 = "$t(itemField.text)"
							v-model 	 = "info[itemField.key]" 
							:type   	 = "itemField.type"
							:placeholder = "$t(itemField.placeholder)"
							v-if  		 = "['text'].includes(itemField.type)"							
							@keyup.enter = "actions(itemField)"
							@input 		 = "(v) => info[itemField.key] = v.toUpperCase()"
							class 			= "text-uppercase"
						>
							<!-- <template v-slot:append-outer v-if  = "itemField.btn_add">
								<v-btn :color="btn_add_table.color" @click="actions(itemField)">
									<v-icon >{{ btn_add_table.icon }}</v-icon>
									{{ btn_add_table.text }}
								</v-btn>
							</template> -->
						</v-text-field>	
						<v-text-field
							dense
							outlined
							hide-details
							:label  	 	= "$t(itemField.text)"
							v-model.number 	= "info[itemField.key]" 
							:type   	 	= "itemField.type"
							:placeholder 	= "$t(itemField.placeholder)"
							v-else-if	 	= "['number'].includes(itemField.type)"							
							@keyup.enter 	= "actions(itemField)"
							@input 		 	= "(v) => info[itemField.key] = v.toUpperCase()"
							class 			= "text-uppercase"
						>
							<!-- <template v-slot:append-outer v-if  = "itemField.btn_add">
								
							</template> -->
						</v-text-field>	
						<v-select
							dense
							outlined
							hide-details
							:label 		= "$t(itemField.text)"
							v-model 	= "info[itemField.key]"
							:items 		= "itemField.list"
							:item-value	= "itemField.item_value"
							:item-text  = "itemField.item_text"
							v-else-if 	= "'select' == itemField.type"							
							@change 	= "actions(itemField)"
							class 			= "text-uppercase"
						></v-select>
						<v-autocomplete
							dense
							outlined
							clearable
							hide-details
							auto-select-first
							v-else-if = "itemField.type == 'Autocomplete'"
							:label 		= "$t(itemField.text)"
							v-model 	= "info[itemField.key]"
							:items 		= "itemField.list"
							:item-value	= "itemField.item_value"
							:item-text  = "itemField.item_text"
							:disabled 		= "itemField.isDisabled"
							class 			= "text-uppercase"
						></v-autocomplete>						
						<v-textarea
							dense
							outlined
							hide-details
							fixed          
					        counter
					        rows 			= "2"
					        row-height 		= "25"
							v-else-if		= "['textarea'].includes(itemField.type)"
							:label 			= "itemField.text"
							v-model 		= "info[itemField.key]"
							@keyup.enter 	= "actions(itemField)"
							class 			= "text-uppercase"
							@input 			= "(v) => info[itemField.key] = v.toUpperCase()"
						>
							<template
								v-slot:append
								v-if  = "itemField.btn_add"
							>
								<v-btn
									small
									:color  = "btn_add_table.color"
									@click  = "actions(itemField)"
								>
									
									<v-icon
									>
										{{ btn_add_table.icon }}
									</v-icon>
								</v-btn>
							</template>
						</v-textarea>
						<dates
							:key 				= "itemField.key + ref"
							v-else-if		    = "['date_range', 'time_picker'].includes(itemField.type)"
							:info_to_component  = "itemField"
							:info_to_dates 	    = "info[itemField.key]"
							@receive_info	    = "info[itemField.key] = $event"
							:ref_to_component   = "itemField.key + ref"
						></dates>
						<span
							v-else-if  = "itemField.subtitle"
							class 	   = "text-uppercase font-weight-medium"
						>
							{{ $t(itemField.subtitle) }}
							<v-divider
								class = "pa-0 ma-0 primary"
								:inset = "true"
							></v-divider>
						</span>
						<!-- <searcher
							v-else-if 	  			= "itemField.type == 'select_search'"
							:info_to_component 		= "itemField"
							:update_to_component 	= "info[itemField.key]"									
							:list_to_component 		= "itemField.list"
							@receive 	 			= "actions(itemField, $event)"
						></searcher> -->

	 				</v-col>

	 			</template>
 				<v-col cols="auto">
 					<v-btn :color="btn_add_table.color" @click="actions(btn_add_table)">
						<!-- <v-icon>{{ btn_add_table.icon }}</v-icon> -->
						{{ btn_add_table.text }}						
					</v-btn>
 				</v-col>
	 		</v-row>
	 	</template>
	 	<template
	 		v-for = "(item_head, idx_head) of headersToComponent"
	 		:slot = "`header.${item_head.value}`"
	 		slot-scope = "{ header }"
	 	>	 	
	 		<span class="text-uppercase">
	 			{{ $t(item_head.text) }}
	 		</span>
	 	</template>
		<template v-slot:item.action = " { item, index }">
			<v-btn-toggle>
				<V-btn
					small					
					:key   = "reference+'btnEdit'"
					color = "primary"
					@click = "confirmEdit(item, index)"
					v-show = "show.confirmEdit"
				>
					<v-icon small color = "white">mdi-pencil</v-icon>
				</V-btn>
				<V-btn
					small					
					:key   = "reference+'btnDelete'"
					color = "error"
					@click = "confirmDelete(item, index)"
					v-show = "show.confirmDelete"
				>
					<v-icon small color="white">mdi-delete</v-icon>
				</V-btn>
			</v-btn-toggle>
		</template>
	
	</v-data-table>
</template>

<script type = "text/javascript">
	// src  = "./js/table_field.js"
	import dates 			from "@/helpers/dates.vue"
	// import searcher 		from "@/components/info/SearcherListComponent.vue"

export default {
	name : "TableFieldComponent",
	props :  [
		"headersToComponent",
		"fieldsToComponent",
		"listToComponent",		
		"reference",
		"requestToComponent",
		"validateToComponent",
	],
	components : {
		dates,
		// searcher,
	},
	data : (vm) => ({
		info : {},		
		infoItem : null,
		loading : false,		
		isEditing : false,  		
		show 			: {
			confirmEdit  : false,
			confirmDelete  : true,
		},
		btn_add_table 		: {
			color  : "primary",
			icon   : "mdi-plus",
			action : "add_table",
			text : "AGREGAR"
		},
		// diagnostic_list : vm.$ManagerSmith.getLists("diagnostic-list") || [],
	}), // data

	computed : {
		renderList(){			
			return this.listToComponent;
		},
	},// computed

	methods : {
		// this.info_input.UserId = this.$store.getters["auth/userId"];
		confirmEdit(){
			this.infoItem=item;
			this.isEditing=true;
			this.info={...item};			
		},
		confirmDelete(item){
			this.infoItem=item;
			this.$EventBus.$emit("notifications",{
				type:"confirm_delete", 
				ID : this.reference+"confirm_delete",
				action : this.deleteItem,
			})
		},
		actions(item){
			if (item) {
				const { action }=item;
				if (action=='add_table') {
					if (this.isEditing) {
						this.update();
					}else{
						this.save();
					}
				}
			}
		},

		renderIsValid(){
			if (this.fieldsToComponent && this.fieldsToComponent.length > 0) {
				const requireds=[];
				let isRequireds=false; 
				this.fieldsToComponent.forEach((x)=>{
					if (x && x.isRequired) {
						isRequireds=true;
						if (this.info && !this.info[x.key]) {
							requireds.push(this.$t(x.text))
						}
					}
				})				
				if (isRequireds && requireds.length>0) {
					this.$EventBus.$emit("notifications",{type:"warning", msg: "Se Requiere "+requireds.join(", ") })
					return false;
				}
			}
			return true
		},

		

		async save(){
			try{
				this.loading=true;			
				if (this.renderIsValid()) {						
					if (this.requestToComponent && this.requestToComponent.create) {
						// create
					}else{
						this.listToComponent.push(this.info);
						this.info={};
					}
				}				
				
			}catch(error){
				console.warn("Error Create Item ", error)
				this.$EventBus.$emit("notifications", { type: "error", msg: this.$Helper.renderErrorMessage(error, "Creando item")})
			}finally{
				this.loading=false;				
			}
		},

		async update(){
			try{
				this.loading=true;		
				if (this.renderIsValid()) {						

					if (this.requestToComponent && this.requestToComponent.update && this.infoItem && this.infoItem.id) {
						this.$EventBus.$emit("notifications",{
							type  	: "primary",
							msg   	: this.$t("updating_element"),
							loading : true
						})				
					}else{					
						const idx = this.listToComponent.indexOf(this.infoItem);
						if (idx >= 0) {
							this.listToComponent.splice(idx, 1, this.info);
							this.$EventBus.$emit("notifications",{
								type  : "success",
								msg   : this.$t("updated_item")
							});
							this.isEditing=false;
							this.info={};
							this.infoItem=null;
						}
					}
				}

			}catch(error){
				console.warn("Error Update Item ", error)
				this.$EventBus.$emit("notifications", { type: "error", msg: this.$Helper.renderErrorMessage(error, "Creando item")})
			}finally{
				this.loading=false;				
			}
			
		
		}, // del

		async deleteItem(item){
			try{
				this.loading=true;							
				if (this.requestToComponent && this.requestToComponent.delete && this.infoItem && this.infoItem.id) {
					this.$EventBus.$emit("notifications",{
						type  	: "primary",
						msg   	: this.$t("deleting_element"),
						loading : true,
					});					
					const res = await this.requestToComponent.delete({id:this.infoItem.id})
					if (res) {
						if(res.error){
							this.$EventBus.$emit("notifications",{type: "warning", msg: this.$Helper.renderErrorMessage(res.error, "Eliminando Item")});
						}else 
						if(res.data){
							const idx = this.listToComponent.indexOf(this.infoItem);
							if (idx >= 0) {
								this.listToComponent.splice(idx, 1);
								this.$EventBus.$emit("notifications",{
									type  : "success",
									msg   : this.$t("deleted_item")
								});
								this.infoItem=null;
							}
						}
					}
				}else{					
					const idx = this.listToComponent.indexOf(this.infoItem);
					if (idx >= 0) {
						this.listToComponent.splice(idx, 1);
						this.$EventBus.$emit("notifications",{
							type  : "success",
							msg   : this.$t("deleted_item")
						});
						this.infoItem=null;
					}
				}
			}catch(error){
				console.warn("Error Delete Item ", error)
				this.$EventBus.$emit("notifications", { type: "error", msg: this.$Helper.renderErrorMessage(error, "Eliminando item")})
			}finally{
				this.loading=false;				
			}
		}, // deleteItem	
	}, // methods
};
</script>