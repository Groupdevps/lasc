<template>
	<v-card
		:class = "head.class_card"
	>
		<v-card-title
			:class 	= "head.class_title"
			
		>
			<v-icon
				small
				:class = "head.class_icon_title"
				:color = "head.color_icon_title"
			>
				{{ head.icon_title}}
			</v-icon>
			<span>
				{{ $t(head.title)}}
			</span>
			<v-spacer></v-spacer>
			<v-btn
				fab
				x-small	
				@click = "actions({
					action : head.action_icon2
				})"
				:color = "head.icon2_btn_color"
				v-show = "show.btn_add"
				:height = "head.height_add"
				:width  = "head.width_add"
			>
				<v-icon
					x-small
				>
					{{ head.icon2_title }}
				</v-icon>
			</v-btn>

		</v-card-title>
		<v-card-text
			:class = "head.class_text"
		>	
			 <v-data-table
			    :headers 			 	= "headers"
			    :items 				 	= "render_list"			    
			    :hide-default-header 	= "head.hideHeaders"			    
			    :loading 			 	= "loading"
			    :hide-default-footer 	= "head.hideFooter"
			    item-key 			 	= "name"
			    :class 				 	= "head.class_table"
			    :height 			 	= "head.height_table"
			    :options.sync 			= "options"
      			:server-items-length 	= "total"
			>
				<template
					v-slot:body = "{ items }"
				>
					<v-item-group multiple>
					    <v-container>
					      	<v-row>
					        	<v-col
						          	v-for 	= "(item, idx_item) of items"
						          	:key 	= "idx_item"
						          	cols 	= "12"
						          	md 		= "4"
					        	>
					          		<v-item v-slot="{ active, toggle }">
							            <v-card
							              	dark
							              	:color 	= "active ? 'primary' : ''"					              	
							              	height 	= "200"
							              	@click 	= "toggle"
							            >
							              	<v-card-text
							              		:class = "head.class_card_table"
							              	>
							              		<v-row
							              			dense
							              		>
							              			
								              		<template
								              			v-for = "(item_text, idx_text) of card_texts"
								              		>
								              			<v-col
								              				cols = "6"
								              			>
								              				{{ item_text.text }}	
								              			</v-col>	
								              			<v-col
								              				cols = "6"
								              			>
								              				{{ item[item_text.key] }}	
								              				
								              			</v-col>	
								              				
								              		</template>
							              		</v-row>
							              	</v-card-text>
					            		</v-card>
					          		</v-item>
					        	</v-col>
					      	</v-row>
					    </v-container>
					</v-item-group>
				</template>  
			</v-data-table>
		</v-card-text>
		<v-card-actions
			:class = "head.class_actions"
		></v-card-actions>
		<modal
			:key 				= "'model_' + this.ref"
			:info_to_component  = "modal"
			:ref_to_component 	= "'modal' + this.ref"
			@close 				= "actions({action : 'close_modal', item : $event})"
		></modal>
		
	</v-card>
</template>
<script 
 	type 	= "text/javascript"
 	src 	= "./js/manager.js"
></script>	