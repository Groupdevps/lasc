<template>
	<v-card
		outlined
		class = "pa-1"
	>
		<v-data-table
			dense
		    :headers 			 = "headers"
		 	:items 	 			 = "list_render"
		    class 	 			 = "elevation-5"			    
		    :hide-default-footer = "true"
		   	:options.sync 		 = "options"
		   	:server-items-length = "total"
		   	:footer-props 		 = "{
		   		showFirstLastPage   : true,
		   		itemsPerPageOptions : [15, 30],
		   		showCurrentPage     : true
		   	}"
		   	loading-text 		= "Cargando... Por favor esperar"
		    :height 			= "height+'px'"
		    
		    :loading 			= "loading"
		    :show-select  		= "true"
		    :single-select 		= "true"
		    v-model 			= "selections"
		    :item-key 			= "'id'"
		    fixed-header
		>
			<template v-slot:top >
				<v-row
					dense
					justify ="center"
					align = "center"
					
				>		
					
					
					<v-col
						cols = "12"
						
					>
						<FieldsFamilyComponent 
							ref 				= "fieldsFamilyAdmissions"							
							:infoToComponent 	= "modal_info"
							:updateInfoPatient  = "update_to_component"
							@receiveInfoFieldsFamily="actions($event)"
							@receiveLoading="loading=$event" 
							:currentPermission = "currentPermission"
						></FieldsFamilyComponent>						
					</v-col>	
				</v-row>
			</template>
			<template
				v-slot:item.TypeIDId  = "{ item }"
			>
						
				{{ render_typeId(item.TypeIDId) }}
				
			</template>
			
			<template
				v-slot:item.TypeRelationshipId  = "{ item }"
			>
				<v-chip
					small
					color = "primary"
				>				
					{{ render_relationshipId(item.TypeRelationshipId) }}
				</v-chip>
			</template>
			<template
				v-slot:item.actions  = "{ item, index }"
			>
				<v-btn-toggle>
					
					<v-btn

						small
						v-for 	= "(btn, idx_btn) of render_actions"
						:key  	= "btn.key + ref + idx_btn"
						:color 	= "btn.color"
						@click 	= "actions(btn, item, index)"
					>
						<v-icon
							small
							color="white"
						>
							{{ btn.icon }}
						</v-icon>
					</v-btn>
				</v-btn-toggle>
			</template>
			<template
				v-for 			= "head of headers"
				:slot	 		= "`header.${head.value}`" 
	 			slot-scope 		= "{header}"
			>
				
				<span>					
					{{ $t(head.text) }} 
				</span>
				
			</template>				
			<template v-slot:header.data-table-select = "{ header }">
				<span>
					{{ $t(parameters.text_key_selection) }}
				</span>
			</template>	
			<template v-slot:item.isCompanion = "{ item }">
		        <v-simple-checkbox
		          v-model="item.isCompanion" 
		        ></v-simple-checkbox>
		    </template>
		</v-data-table>
	</v-card>
</template>
<script 
	type = "text/javascript" 
>
import FieldsFamilyComponent from "@/components/admissions/FieldsFamilyComponent.vue"
import FamilyParentService from "@/services/FamilyParentService.js" 


export default {
	name 		: "familyTableComponent",
	components	: {FieldsFamilyComponent},
	props 		: [
		"update_to_component",
		"info_to_component",
		"ref_to_component",
		"currentPermission",
	],
	data 		: (vm) => ({
		headers : [
			{ text : "", value: "" },
			{ text : "typeRelationship", value : "TypeRelationshipId" },
			{ text : "name", value : "name" },
			{ text : "lastname", value : "lastName" },
			{ text : "typeId",  value : "TypeIDId" },
			{ text : "numberId", value : "numberId" },
			{ text : "cellphone", value : "cellphone" },	
			{ text : "actions", value : "actions" },
		],
		// list_render
		height  	: 200,
		options 	: { itemsPerPage : 30 },
		total   	: 0, 
		loading 	: false,
		list 		: [],
		search  	: null,
		show 		: {
			search : false,
			fields : false,
			btnShowFields : true,
			// TypeRelationshipId :false,
			// name : false,
			// lastName: false,
			// TypeIDId: false,
			// numberId: false,
			// cellphone: false,

		},
		selections  : [],
		info 		: {}, 
		info_item 	: null,
        btnFieldAdd:    {
				key 		: "search",				
                type 		: "btn",
                text 		: "new_familiar",
                action 		: "showFieldsFamily",			
               
              										
            },
		list_actions 	: [
            {
                type 		: "btn",				
                action 		: "update_item",			
                icon 		: "mdi-pencil",
                key_modal 	: "content_modal",
                class_icon  : "mr-1",
                color 		: "primary",

                        
            },		
            {
                type 		: "btn",				
                action 		: "confirm_delete_item",			
                icon 		: "mdi-delete",
                key_modal 	: "content_modal",
                class_icon  : "mr-1",
                color 		: "error",
                        
            },	
		],
		info_input  	: {
			search : ""
		},
		parameters 	: {
			/*
			create,
			get,
			edit,
			del,
			search,
			type_search  : post || get
			text_edit 	 : 
			text_edit_er :
			text_create
			text_create_er
			*/
		},
		modal 			: null,		
		modal_info 		: null,
		ref 			: "familyTableComponent",
		bus 			: {},
		related_key 	: null, 
	}), // data
	created(){
		this.actions({action : "set_info"});
		// this.height = this.$vuetify.breakpoint.height - 150;
	}, // created

	watch : {
		update_to_component: function(val){			
			if (val) {	
				this.actions({action : "updateInfoComponent"}, val);
			}
		}, 
		selections : function(val){			
			if (val) {
				this.$emit("receive_selections", val);
			}
		}, 
		options : {
			handler(val){			
				if (this.search) {
					this.get_search();
				}
			}, deep : true,
		}, // options
	}, // watch

	computed : {
		list_render : function(){
			if (this.list && this.list.length > 0) {
				this.total = this.list.length;
			}
			this.$emit("receive_info", this.list);
			return this.list;
		},
		render_actions : function(){
			return this.list_actions && this.list_actions.length > 0 ? this.list_actions : [];
		}, // return 
	}, // computed

	methods : { 
		actions(action, item, option){			
			if (action) {
				if (action.action == "updateInfoComponent") {					
					if (this.$refs && this.$refs.fieldsFamilyAdmissions) {
						this.$refs.fieldsFamilyAdmissions.clearInputs();
					}
					if (item && item.person) {
						this.get_search({numberId: item.person.numberId});
					}
				}
				if (action.action == "set_info") {
					if (this.update_to_componentt && this.update_to_component.person) {
						this.get_search({numberId : this.update_to_component.person.numberId});
					}
					if (this.ref_to_component) {
						this.ref += this.ref_to_component;
					}
				}else if (action.action == "showFieldsFamily") {
					try{
						this.show.fields = !this.show.fields;
					}catch(e){
						console.error("error set requests create ", e)
					}
				}else if (action.action == "update_item") {
					try{
						this.modal_info = item;
						this.show.fields = true;
					}catch(e){
						console.error("error set requests ", e)
					}
				}else if (action.action == "confirm_delete_item") {
					this.modal_info = null;
					this.$EventBus.$emit("notifications",{
						type : "confirm_delete",
						ID   : this.ref,
						action : this.del
					})					
					this.info_item = {
						item   : item,
						action : "delete_item"
					};

				}else if (action.action == "delete_item") {
					this.del();
				}
				else if (action.action == "add" && !this.modal_info) { // save
									
                        this.list.push({...action.item});
                        this.total++;
						this.show.fields = false;
						this.$emit("receive_info", this.list);
						this.selections=[action.item];
                
				}else if (action.action == "add" && this.modal_info) { // update 				
					const idx = this.list.indexOf(this.modal_info);
					if(idx >=0 ){
						this.list.splice(idx,1,{...action.item});					
						this.show.fields = false;
						this.modal_info = null;
					}
					this.$emit("receive_info", this.list);

				}                
			}
		}, // actions

		setInfoItemDefault(){
			this.info_item = {
				item   : null,
				action : null,				
			}
		}, // setInfoItemDefault


		async get_search(params){
			if (params) {				
				try {						
					this.loading 	= true;															
					const FamilyService = new FamilyParentService();
					const res 			= await FamilyService.getFamilyBySearch(params);								
					if (res && res.data && res.data.length > 0) {													
						this.total = res.data.length;
						this.list  = res.data.map(x => {
							if(x && x.Person){
								const { numberId, TypeIDId, name, lastName, cellphone, Adult} = x.Person;
								return 	{
									id : x.id,									
									numberId, 
									TypeIDId,
									TypeRelationshipId : x.TypeRelationshipId,
									name,
									lastName,
									cellphone,
									Adult,
								}
							}
						});
					}else{
						this.list = [];
						this.total = 0;
					}
					this.loading = false;
				} catch (error) {
					this.loading = false;
					
				}					
			}else{
				// this.$EventBus.$emit("notifications",{
				// 	type 	: "warning",
				// 	message : this.$t("not_found_route")
				// })
			}
			
		}, // get search
		

		async del(){
			const { item } 		 = this.info_item;
			if (item && item.id) {
				try {					
					this.loading 	= true;					
					const FamilyService = new FamilyParentService();
					await FamilyService.deleteFamily(item.id);					
					this.loading = false;						
					this.total --;
					this.list.splice(this.list.indexOf(item), 1);
					this.info_item = null;						
					this.$EventBus.$emit("notifications",{
						type : "success",
						msg  : "Familiar eliminado",
					})					
				} catch (error) {
					console.log("error 2 ",error)
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg  : "Hubo un error eliminando al Familiar : " + error.message,
					})
					this.loading = false;						
				}					
			}else{
				this.$EventBus.$emit("notifications",{
					type 	: "warning",
					message : this.$t("error_deleting_information")
				})
			}
		}, // delete

		render_typeId(item){
			if (typeof item === "number") {
				const tempType = this.$store.getters["listTypeDocument/getTypeById"](item);
				return tempType?.name || "N/A"; //ManagerSmith.get_typeId_string(item);
			}
			return item;
		}, // render_typeId

		render_relationshipId(item){
			if (typeof item === "number") {
				return this.$ManagerSmith.get_relationshipId_string(item);
			}
			return item;
		}, // render_relationshipId

		render_listed(item){
			return []
		},

	}, // methods

};
</script>