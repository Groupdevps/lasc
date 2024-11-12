<template>
	<v-row>
		<v-col>
			<v-card
				outlined
				:elevation = "7"
			>
				<v-card-title
					class = "primary body-1 pa-1 white--text"
					v-show = "false"
				>
					<span>
						{{ head.title }}
					</span>
				</v-card-title>
				<v-card-text
					class = "pa-1"
				>
					<v-row
						dense
					>
						<template
							v-for = "(item_field, idx_field) of info_fields"
						>							
							<v-col
								:key  = "idx_field + 'main'"
								:cols = "item_field.cols" 
							>
								<v-text-field

									dense
									outlined
									:label 			= "$t(item_field.text)"
									v-model 		= "info[item_field.key]"
									:type 			= "item_field.type"
									v-if 			= "['text', 'email'].includes(item_field.type)"									
									:disabled 		= "item_field.isDisabled"
									@input 		 	= "(v) => info[item_field.key] = v.toUpperCase()"
								></v-text-field>
								<v-text-field

									dense
									outlined
									:label 			= "$t(item_field.text)"
									v-model.number	= "info[item_field.key]"
									:type 			= "item_field.type"
									v-else-if		= "['number'].includes(item_field.type)"
									:disabled 		= "item_field.isDisabled"
									@input 		 	= "(v) => info[item_field.key] = v.toUpperCase()"
								></v-text-field>
								<!-- <dates
									v-else-if		   = "	item_field.type == 'date_range' 	||
															item_field.type == 'time_picker'
														"
									:info_to_component = "item_field"
									:info_to_dates 	   = "info[item_field.key]"
									@receive_info	   = "info[item_field.key] = $event"
								></dates> -->
								<dates
									:key 			   = "ref + item_field.key"
									v-else-if		   = "['date_range','time_picker'].includes(item_field.type)"
									:info_to_component = "item_field"
									:info_to_dates 	   = "info[item_field.key]"
									@receive_info	   = "info[item_field.key] = $event"
								></dates>
								<table_field
									:key 				 = "'table_field_' + item_field.key"
									v-else-if			 = "item_field.type == 'table_field'" 
									:info_to_component   = "{...item_field, info_comp : info, nameForm : field_ref }"
									:update_to_component = "info[item_field.key]"					
									:ref_to_component  	 = "ref + item_field.key"												
									@receive_info 		 = "actions({action : 'action_table'}, $event)"
								></table_field>
								<searcher
									v-else-if 	  			= "item_field.type == 'select_search'"
									:info_to_component 		= "item_field"
									:list_to_component 		= "render_listed(item_field)"
									:update_to_component 	= "info[item_field.key]"
									@receive_info 	 		= "actions(item_field, $event)"
								></searcher>

							</v-col>
						</template>
													
					</v-row>
					
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn						
						:color  = "btn.color"
						@click  = "actions(btn)"
						:disabled = "btn.isDisabled"
					>
						{{ $t(btn.title) }}
					</v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-col>
		<v-col
			cols = "12"
			v-show 				= "show.medical_history"
		>	
			<medical_history
				v-if 				= "show.medical_history"
				:key 				= "ref + 'Historial'"
				:info_to_component 	= "info_comp"
				:ref_to_component  	= "ref"		
				:route 				= "route"											
			></medical_history>
		</v-col>
	</v-row>
</template>
<script 
	type = "text/javascript"
	src  = "./js/notes.js"
></script>