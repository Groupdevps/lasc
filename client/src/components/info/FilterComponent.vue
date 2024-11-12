<template>
	<v-row
		dense
	>
		<template
			v-for = "(item_search, idx_search) of fields"
		>
			<v-col
				:cols = "item_search.col" 
				v-show = "!notShow[item_search.key]"
			>
				<v-text-field
					dense
					outlined
					hide-details
					v-if 			= "['text'].includes(item_search.type)"
					:type 			= "item_search.type"
					v-model 		= "infoToSearch[item_search.key]"
					:label 			= "item_search.text"
					:placeholder	= "item_search.placeholder" 
					clearable
				>
					<template
						v-slot:prepend-inner-icon
					>
						<v-icon
							:color = "item_search.color_icon"
						>
							{{ item_search.icon}}
						</v-icon>
					</template>
				</v-text-field>
				<v-text-field
					dense
					outlined
					clearable
					hide-details
					v-if 			= "['number'].includes(item_search.type)"
					:type 			= "item_search.type"
					v-model.number	= "infoToSearch[item_search.key]"
					:label 			= "item_search.text"
					:placeholder	= "item_search.placeholder" 
					class = "text-uppercase"
					clearable
				>
					<template
						v-slot:prepend-inner-icon
					>
						<v-icon
							:color = "item_search.color_icon"
						>
							{{ item_search.icon}}
						</v-icon>
					</template>
				</v-text-field>
				<MenuStatusComponent 
					v-else-if = "['StatusId'].includes(item_search.key)"
					:listAllowStatusToComponent = "listAllowStatus"
					:inputField="infoToSearch"
					keyField ="StatusId"
				></MenuStatusComponent>
				<v-select
					dense
					outlined
					hide-details
					v-else-if 		= "['select'].includes(item_search.type)"
					v-model 		= "infoToSearch[item_search.key]"
					:items 			= "renderListed(item_search)"
					:item-value 	= "item_search.item_value"
					:item-text 		= "item_search.item_text"
					:label 			= "item_search.text"
					:placeholder	= "item_search.placeholder" 
					@change 		= "actions(item_search)"
					:return-object  = "item_search.return_obj"
					class = "text-uppercase"
					clearable
				>
					<template
						v-slot:prepend-inner-icon
					>
						<v-icon
							:color = "item_search.color_icon"
						>
							{{ item_search.icon}}
						</v-icon>
					</template>
				</v-select>
			
				<dates
					:key 				= "item_search.key + reference"
					v-else-if	 		= "item_search.type == 'date_range'"
					:info_to_component 	= "item_search"
					:info_to_dates 	    = "infoToSearch[item_search.key]"
					@receive_info 		= "infoToSearch[item_search.key] = $event"
				></dates>
				<v-btn
					v-else-if  = "item_search.type == 'btn' "
					:color = "item_search.color"
					@click = "actions(item_search)"
				>
					<v-icon>
						{{ item_search.icon }}
					</v-icon>
					{{ item_search.text }}
				</v-btn>
			</v-col>
		</template>
	</v-row>
	
</template>
<script type="text/javascript">
	import dates from "@/helpers/dates.vue"
	import MenuStatusComponent from "@/components/info/MenuStatusComponent.vue"

	export default{
		name :  "FilterComponent",
		props : ["infoToSearch", "reference", "ArrayNotShowFields", "listAllowStatus"],
		components : { dates, MenuStatusComponent },
		data :()=>({
			notShow : {}, 

			fields:[
			    {
			        key 			: "TriageId",
			        text 			: "Triage",
			        type 			: "select",
			        placeholder 	: "Triage",
			        list 			: [
			            { name  : "Reanimacion",id :1},
			            { name :"Emergencia",id :2},
			            { name :"Urgencia",id :3},
			            { name :"Urgencia menor",id :4 },
			            { name : "Sin urgencia", id :5 },
			                
			        ],
			        show 			: true,
			        global_list  	: "triage",
			        item_value   	: "id",
			        item_text 		: "name", 
			        return_obj 		: false,
			        // action 			: "set_status",
			    },
			    {
			        key 			: "StatusId",
			        text 			: "Estado",
			        type 			: "select",
			        placeholder 	: "Estado",
			        list 			: "list_states",
			        show 			: true,
			        global_list  	: "status",
			        item_value   	: "id",
			        item_text 		: "name", 
			        return_obj 		: false,
			        // action 			: "set_status",
			    },			    
			    {
			        key 		: "numberId",
			        text 		: "Documento",
			        type 		: "number",
			        placeholder : "Documento",				
			        show 		: true,
			    },
			    {
			        key 		: "date",
			        text 		: "Fecha",
			        type 		: "date_range",
			        placeholder : "Fecha",				
			        show 		: true,
			        isRange 	: true,
			        multiple 	: true,
			        auto : false,
			    },
			    {
			        key 		: "btn",
			        text 		: "Buscar",
			        type 		: "btn",				
			        action 		: "get_search",
			        color 		: "primary",
			        icon 		: "mdi-magnify",				 						
			        show 		: true,
			    }
    		]
		}), // data
		created(){
			this.renderNotShow();
		}, // created

		methods:{
			actions(actionn){
				const {action}=actionn;								
				if (action == "get_search") {
					this.$emit("actionToSearch", true);
				}

			},

			renderListed(item){
				if (item) {				
					if (item.global_list) {
						return this.$ManagerSmith.render_listed(item);
					}else
					if (typeof item.list == "string") {
						return this[item];
					}
				}
				return [];
			},
			renderNotShow(){
				if (this.ArrayNotShowFields && this.ArrayNotShowFields.length > 0 ) {
					
					this.ArrayNotShowFields.forEach((it)=>{
						this.notShow[it] = true;
					})
				}
			},
		}
	}
</script>