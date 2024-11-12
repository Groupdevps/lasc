<template>
	<v-card outlined>
		<v-card-title :class = "head.class_title">			
			<v-icon
				small
				:color = "head.color_icon"
				:class = "head.class_icon"
			>
				{{ head.icon }}	
			</v-icon>
			<span> {{ $t(titleText) }} </span>
			<v-spacer></v-spacer>
		</v-card-title>			
		<v-card-text :class = "head.class_text">
			<v-row dense :style = "`overflow-y : auto; overflow-x : hidden; max-height: 100px;`">
				<template v-for = "(itemField, idx_info) of renderFields">			
					<v-col	:cols = "itemField.cols ? itemField.cols : 4 ">	
						<span v-if  = "itemField.subtitle" class = "text-uppercase font-weight-medium">
							{{ $t(itemField.subtitle) }}
							<v-divider class = "pa-0 ma-0 primary" :inset = "true"></v-divider>
						</span>
						<v-card outlined
							height="100%"
							v-else-if		= "['text', 'email', 'number', 'textarea', 'date_range','time_picker', 'select_search', 'select', 'Autocomplete'].includes(itemField.type)"
						>
							<span :class = "head.class_title_field">
								{{ $t(itemField.text) }}
							</span>
							<v-card-text :class = "head.class_text_field">									
								{{ infoToField[itemField.key] }}							
							</v-card-text>
						</v-card>
						<v-data-table
							dense
						    fixed-header
							v-else-if 			 = "itemField.type == 'table_field'" 
							:headers 			 = "itemField.header"
						 	:items 	 			 = "infoToField[itemField.key]"
						    class 	 			 = "elevation-5 text-uppercase"			 			   
						   	:footer-props 		 = "{
						   		showFirstLastPage   : false,
						   		itemsPerPageOptions : [30],
						   		showCurrentPage     : false
						   	}"
						   	loading-text 		= "Cargando... Por favor esperar"
						    :height 			= "135"							   
						>
							<template
						 		v-for = "(item_head, idx_head) of itemField.header"
						 		:slot = "`header.${item_head.value}`"
						 		slot-scope = "{ header }"
						 	>	 	
						 		<span>
						 			{{ $t(item_head.text) }}
						 		</span>
						 	</template>
						</v-data-table>
						<v-card outlined
							v-else-if   = "itemField.type == 'multi-text' "
						>
							<v-card-title class = "caption pa-0 pl-1 white--text text-uppercase font-weight-medium">
								<span> {{ itemField.text }}</span>
							</v-card-title>
							<v-card-text class = "pa-1">
								<v-row dense>
									<template v-for = "(itemField_sub, idx_sub) of itemField.sub_fields">
										<v-col :key = "idx_sub">
										<v-card outlined
											v-if="['text', 'email', 'number', 'textarea', 'date_range','time_picker', 'select_search', ''].includes(itemField.type)"
										>
											<v-card-title :class = "head.class_title_multi">
												{{ $t(itemField.text) }}
											</v-card-title>
											<v-card-text :class = "head.class_text_multi">					
												{{ infoToField[itemField_sub.key] }}
											</v-card-text>
										</v-card>
											
										</v-col>
									</template>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>
				</template>
			</v-row>
		</v-card-text>
	</v-card>	
</template>
<script type="text/javascript" > 
	// src="./js/infoModal.js"

export default {
	name 	: "InfoTextField",
	props   : [
		"fieldsToComponent",	
		"infoToField",	
		"titleText"
	],
	data : (vm) => ({
		info 		: {},
		fieldNames  : {
			// emergency_medical_history,
		},
		reference 	: "information_text",
		head 		: {
			title 			: "",
			class_title 	: "primary dark body-2 pa-0 white--text text-uppercase",
			color_icon  	: "white",
			class_icon 		: "mx-1",
			icon 			: "mdi-information",

			close_action 	: "close_modal",
			class_close 	: "",
			height_close 	: "23px",
			width_close 	: "23px",
			class_text 		: "pa-1",

			class_title_field  	: "pa-0 pl-1 caption  text-uppercase font-weight-bold",
			class_text_field  	: "pa-0 pl-2 ma-0 mb-0 pb-0 caption text-uppercase",
			class_title_multi  	: "pa-0 caption text-uppercase font-weight-bold",
			class_text_multi  	: "caption",
		}, 
		
	}),

	created(){
		
	}, // created

	computed : {
		renderFields : function(){
			return this.fieldsToComponent;
		}
	}, // computed

	methods : {
	
	}, // methods
}
</script>
