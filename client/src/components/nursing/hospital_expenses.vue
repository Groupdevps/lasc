<template>
<v-row>
		<v-col>
			<v-card
				outlined
				:elevation = "7"
			>
				<v-card-title
					class = "primary body-1 pa-1 white--text"
				>
					<span>
						{{ head.title }}
					</span>
				</v-card-title>
				<v-card-subtitle
					class = "body-2 pa-0 "
				>
					<span>
						{{ head.subtitle }}
					</span>
				</v-card-subtitle>
				<v-card-text
					class = "pa-1 pt-3"
				>
					<v-row>
						<template
							v-for = "(item_field, idx_field) of info_fields"
						>		
							<v-col
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
									hide-details
									dense
									outlined
									:label 			= "item_field.text"
									v-model 		= "info[item_field.key]"
									:type 			= "item_field.type"
									v-else-if		= "['text', 'number', 'email'].includes(item_field.type)"
								></v-text-field>

								<v-data-table
									v-else-if 			 = "item_field.type == 'table'"
									:headers 			 = "item_field.header"
								 	:items 	 			 = "render_listed(item_field.list)"
								    class 	 			 = "elevation-5"			  							   
								   	:footer-props 		 = "{
								   		showFirstLastPage   : false,
								   		itemsPerPageOptions : [30],
								   		showCurrentPage     : false
								   	}"
								   	loading-text 		= "Loading... Please wait"
								    :height 			= "300"
								    item-key 			= "index"
								    fixed-header
								>
								    <!-- :loading 			= "loading" -->
									
								</v-data-table>
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
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						small
						:color  = "button.color"
						@click  = "actions(button.action)"
					>
						{{ button.title }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>
<script 
	type = "text/javascript"
	src  = "./js/hospital_expenses.js"
></script>