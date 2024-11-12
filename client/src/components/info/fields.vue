<template>
	<v-row
		
	>
		<template
			v-for = "(item_field, idx_field) of render_list_fields"
		>		
		
			<v-col
				:key  = "idx_field + ref + 'comp'" 	
				:cols = "item_field.cols ? item_field.cols : 4 "
			>
				<span
					v-if = "item_field.subtitle"
				>
					{{ item_field.subtitle }}
					<v-divider
						class = "pa-0 ma-0"
						:inset = "true"
					></v-divider>
				</span>
				
				<v-text-field
					dense
					outlined
					hide-details
					v-else-if		= "['text', 'number', 'email'].includes(item_field.type)"
					:label 			= "item_field.text"
					v-model 		= "info[item_field.key]"
					:type 			= "item_field.type"
				></v-text-field>
				
				<table_field
					v-else-if		= "item_field.type == 'table_field'" 
					:info_to_comp   = "item_field"
					:list_to_comp 	= "render_listed(item_field.list)"
					@receive_info 	= "actions('action_table', id_notification, $event)"
				></table_field>
				
				<searcher
					v-else-if 	  = "item_field.type == 'select_search'"
					:info_to_comp = "item_field"
					:list_to_comp = "render_listed(item_field.list)"
					@receive 	  = "info[item_field.key] = $event"
				></searcher>
				<dates
					v-else-if		   = "	item_field.type == 'date_range' 	||
											item_field.type == 'time_picker'
										"
					:info_to_component = "item_field"
					:info_to_dates 	   = "info[item_field.key]"
					@receive_info	   = "info[item_field.key] = $event"
				></dates>
			</v-col>					
		</template>
	</v-row>
</template>
