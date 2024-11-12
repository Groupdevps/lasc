<template>
	<v-container fluid>
		<v-row
			dense
			:align 		= "head.align"
			:justify 	= "head.justify"
		>
			<v-col 
				:cols = "head.cols"
			>
				<v-card 
					:outlined 	= "head.outlined"
					:class 		= "head.card_class"
				> 
					<v-card-title
						:class 		= "head.class_title"
					>
						
						<v-icon
							small
							:class = "head.class_icon"
							:color = "head.color_icon"
						>
							{{ head.icon_title }}
						</v-icon>
						<span>
							{{ head.title }}
						</span>
					</v-card-title>
					<v-card-text
						:class = "head.class_text"
					>
						<v-row
							no-gutters
							:align 		= "head.align_text"
							:justify 	= "head.justify_text"
						>
							
							<template
								v-for = "(item_field, idx_field) of fields"
							>
								<v-col
									:key  = "ref + idx_field"
									:cols = "item_field.cols"	
								>
									<v-text-field
										dense
										outlined
										hide-details
										v-if 		= "['password', 'text', 'number'].includes(item_field.type)"
										:label 		= "item_field.text"
										:type 		= "item_field.type"
										v-model  	= "info[item_field.key]"
										:class 		= "item_field.class"
									></v-text-field>
								</v-col>	
							</template>
						</v-row>
					</v-card-text>
					<v-divider
						:class = "head.class_divider"
					></v-divider>
					<v-card-actions
						:class = "head.class_actions"
					>
						<template
							v-for = "(item_action, idx_action) of options" 
						>
							<v-btn
								small
								v-show  = "show[item_action.key]"
								:color 	= "item_action.color"
								@click 	= "actions(item_action)" 
							>
								{{ item_action.text }}
							</v-btn>
						</template>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
<script 
	type = "text/javascript"
	src  = "./js/register.js"
></script>