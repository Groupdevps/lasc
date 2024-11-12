<template>
	<v-container fluid>
		<v-card 
			outlined
			:height = "head.height_card"
		>
			<v-card-title
				v-if 	= "head.title"
				:class 	= "head.class_title"
			>
				<!-- <v-spacer></v-spacer> -->
				<v-icon
					
					:class = "head.class_icon"
					:color = "head.color_icon_title"
				>
					{{ head.icon }}
				</v-icon>
				<span>
					{{ head.title }}
				</span>	
				</v-card-title>
			<v-card-text
				:class = "head.class_text"

			>			
				<v-data-table
					dense
					fixed-header
					hide-default-footer
					:headers 			 = "headers"
					:items 				 = "render_list"
					:server-items-length = "total"
					:class 				 = "head.class_table"					 
			      	:options.sync 		 = "options"			      	
			      	:loading 			 = "loading"
      				:height 			 = "head.height_table"
						
				>
					<template
				        
				        v-slot:footer
				    >
				    	<v-row
				    		justify = "end"
				    		align = "end"

				    	>
				    		<v-col
				    			:cols = "3"
				    		>
				    			<span>				    				
				    				total : {{ info.total }}
				    			</span>
				    		</v-col>
				    	</v-row>
				    </template>
				</v-data-table>
			</v-card-text>
			<v-card-actions
				:class = "head.card_action_class" 
			>
				<v-row
					dense
					justify = "end"
					align 	= "end"
				>
					<template
						v-for = "(item_action, idx_action) of product_actions"
					>
						<v-col
							:cols = "item_action.cols"
							:offset = "item_action.offset"
						>
							<v-btn
								small
								v-if 	= "item_action.type == 'btn'"
								:color  = "item_action.color"
								@click 	= "actions({action : item_action.action, item : item_product})"
							>
								{{ item_action.text }}
							</v-btn>
								<!-- v-model   = "info.products[idx_product][item_action.key]" -->
							<v-text-field
								dense
								outlined
								hide-details
								height = "15px"
								:label 		= "item_action.text"
								v-else-if = "item_action.type == 'number'"
								prepend-inner-icon = "mdi-plus"
								append-icon = "mdi-minus"
							></v-text-field>
						</v-col>
					</template>
				</v-row>
			</v-card-actions>
		</v-card>
	</v-container>
</template>
<script 
 	type = "text/javascript"
 	src  = "./js/shopping_cart.js"
></script>