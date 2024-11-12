<template>
	<v-container fluid>

			
		<v-row
			dense
			justify = "center"
			class 	= "mt-5"
		>
			<v-col
				cols = "5"
			>
				
			
				<v-card outlined>
					<v-row  dense>
						<v-col
							cols  = "3"
						>	
							<v-card >
								<v-card-title
									class = "teal accent-4 text-uppercase justify-center pa-0"
								>
									{{ $t("image") }}
								</v-card-title>
								<v-img
									:src = "info.image"
									alt = "profile"
									contain
								></v-img>
							</v-card>
						</v-col>
						<v-col
							cols  = ""
						>
							<v-card outlined>
								<v-card-title
									class = "teal accent-4 text-uppercase justify-center pa-0"
								>
									{{ $t("information") }}
								</v-card-title>
								<v-card-text
									class = "mt-2"
								>
									<v-row
										dense
									>
										
										<template
											v-for = "(item_field, idx_field) of render_fields"
										>
											<v-col
												:cols = "item_field.cols"
												:key  = "item_field.key + ref"
											>
												<v-text-field
													dense
													outlined
													hide-details
													:label 				= "$t(item_field.text)"
													v-model 			= "info[item_field.key]"
													:type 				= "item_field.type"
													v-if 				= "['text','email'].includes(item_field.type)"
													:prepend-inner-icon = "item_field.icon"
													:disabled 			= "item_field.isDisabled"
													@input 		 		= "(v) => info[item_field.key] = v.toUpperCase()"
													:rules 				= "item_field.rules ? item_field.rules : []"
													:required  			= "item_field.isRequired"
													:autofocus 			= "item_field.autofocus"
												></v-text-field>
													 <!-- @input="v => updateValue(item_field.key, v)" -->
												<v-text-field

													dense
													outlined
													hide-details
													:label 				= "$t(item_field.text)"
													v-model.number 		= "info[item_field.key]"
													:type 				= "item_field.type"
													v-else-if			= "['number'].includes(item_field.type)"
													:prepend-inner-icon = "item_field.icon"											
													:required  			= "item_field.isRequired"
													:rules 				= "item_field.rules ? item_field.rules : []"
													:disabled 			= "item_field.isDisabled"
													
												></v-text-field>
													<!-- :rules 				= "[item_field.rules]" -->
												<v-select
													dense
													outlined
													hide-details
													:label 				= "$t(item_field.text)"
													v-model 			= "info[item_field.key]"
													:items 				= "render_listed(item_field)"
													:item-value			= "item_field.item_value"
													:item-text  		= "item_field.item_text"
													v-else-if 			= "'select' == item_field.type"
													:prepend-inner-icon = "item_field.icon"
													:required  			= "item_field.isRequired"
													:rules 				= "item_field.rules ? item_field.rules : []"
													:disabled 			= "item_field.isDisabled"
													@change 			= "item_field.action ? actions(item_field) : ''"
												></v-select>
											</v-col>
										</template>
									</v-row>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							v-for = "(item_btn, idx_btn) of field_actions"
							:color = "item_btn.color"
							@click = "actions(item_btn)"
							:class = "item_btn.class"
							:key 	= "item_btn.key + ref"
						>
							{{ $t(item_btn.text) }}
						</v-btn>
						<v-spacer></v-spacer>

					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script 
  	type = "text/javascript"
  	src  = "./js/profile.js"
></script>