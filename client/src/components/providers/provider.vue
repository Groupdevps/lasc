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
			<v-spacer></v-spacer>
			<v-icon
				
				:class = "head.class_icon"
				:color = "head.color_icon_title"
			>
				{{ head.icon }}
			</v-icon>
			<span>
				{{ head.title }}
			</span>	
			<v-chip
				small
				label
				v-show = "info.provider"
			>
				{{ info.provider }}
			</v-chip>
			<v-spacer></v-spacer>
			<template
				v-for = "(item_option, idx_option) of cart_options"
			>
				
				<v-btn
					fab
					x-small
					v-if   = "item_option.type == 'btn'"	
					:class = "item_option.class"
					:color = "item_option.color"
					@click = "actions(item_option.action)"
				>
					<v-icon				
						:class = "item_option.class_icon"
						:color = "item_option.color_icon"
					>
						{{ item_option.icon }}
					</v-icon>
				</v-btn>
				<v-chip
					small
					label
					v-else-if   = "item_option.type == 'chip'"	
					:color 		= "item_option.color"
					:class 		= "item_option.class"
				>	
					<!-- v-show 		= "info[item_option.key]" -->
					<v-icon
						
						:class = "item_option.class_icon"
						:color = "item_option.color_icon"
					>
						{{ item_option.icon }}
					</v-icon>
					{{ info[item_option.key] }}
				</v-chip>
			</template>
			

		</v-card-title>
		<v-card-text
			:class = "head.class_text"

		>			
			<v-row
				dense

			>
				<template
					v-for = "(item_product, idx_product) of render_products "
				>					
					<v-col
						:cols = "head.cols_products"
					>
						<v-card 
							:class = "head.product_card_class" 
						>
							<!-- <v-card-title>
								
							</v-card-title> -->
							<v-card-text>
								<v-row
									no-gutters
									justify = "center"
									align 	= "center"
								>
									<template
										v-for = "(value_product, key_product, idx_val_product) in item_product"
									>
										<v-col
											:cols = "key_product == 'image' ? head.col_image_value : head.col_text_value "
										>
													
											<v-img
												v-if 	= "key_product == 'image'"
												:src 	= "value_product"
												:width  = "head.width_value"
												:height = "head.height_value"
												contain
											></v-img>
											<span
												v-else 
											>
												{{ $t(key_product)}} : {{ value_product }}
											</span>
										</v-col>
									</template>
								</v-row>
							</v-card-text>
							<v-card-actions
								:class = "head.card_action_class" 
							>
								<v-row
									dense
									justify = "center"
									align 	= "center"
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
					</v-col>
				</template>
			</v-row>
		</v-card-text>
		</v-card>
	</v-container>
</template>
<script 
 	type = "text/javascript"
 	src  = "./js/provider.js"
></script>