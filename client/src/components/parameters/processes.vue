<template>
	<v-card 
		outlined
	>
		<v-card-title
			:class 	= "head.class_title"
			v-if 	= "head.title"
		>	

			<span>
				{{ head.title }}
			</span>
			
		</v-card-title>
		<v-card-text
			:class = "head.class_text"
		>
			<v-data-table
				dense
			    show-expand
	    		fixed-header
			    :headers 		= "headers"
			    :items 			= "render_processes"
			    :single-expand 	= "head.single_expanded"
			    :expanded.sync 	= "expanded"
			    item-key 		= "name"
			    class 			= "elevation-1"
			    :height 		= "height + 'px'"
			    :loading 		= "loading"
			    hide-default-footer
			  >
			    <template v-slot:top>
			      	<v-toolbar 
			      		flat
				       	:color  = "head.color_toolbar"
				        :class  = "head.class_toolbar"
				        :height = "head.height_toolbar"
			      	>	
				        <v-toolbar-title
				        >
				      		<v-icon
				   				small
				   				:class = "head.icon_toolbar_class"
				   				:color = "head.icon_toolbar_color"
				   			>
				   				{{ head.icon_toolbar }}
				   			</v-icon>
				   			
				        	{{ head.title_toolbar }}
				       	</v-toolbar-title>
			        	<v-spacer></v-spacer>
						<v-btn
			       			fab
			       			x-small
			       			
			       			:color = "head.btn_new_color"
			       			@click = "actions({
			       				action : head.btn_new_action
			       			})"
			       		>
			       			<v-icon
			       				x-small
			       			>
			       				{{ head.btn_new_icon }}
			       			</v-icon>
			       		</v-btn>
			        
			      	</v-toolbar>
			    </template>
			    <template v-slot:expanded-item = "{ headers, index, item }">
			      	<td 
			      		:colspan = "headers.length"
			      	>
			       
			       		<v-btn
			       			fab
			       			x-small
			       			absolute
			       			:color = "head.btn_add_color"
			       			@click = "actions({
			       				action : head.btn_add_action
			       			})"
			       		>
			       			<v-icon
			       				x-small
			       			>
			       				{{ head.btn_add_icon }}
			       			</v-icon>
			       		</v-btn>
				        <v-sheet
						    :class 		= "head.sheet_class"
						    elevation 	= "5"
						    :max-width	= "width_expand + 'px'"

						>
						    <!-- :width		= "width_expand + 'px'" -->
						      	<!-- v-model 		= "slide_group" -->
						    <v-slide-group
						      	:class 			= "head.slide_class"
						      	:active-class 	= "head.color_slide"
						      	show-arrows
						      	
						    >
						      <v-slide-item
						        v-for 	= "(item_sub, idx_sub, key_sub ) of item.sub_process"
						        :key 	= "idx_sub"
						        v-slot  = "{ active, toggle }"
						        :class  = "head.slide_item_class"
						      >
						        <v-card
						          :color 	= "active ? undefined : 'white'"
						          :class 	= "head.class_card_slide"
						          :height 	= "head.height_card_slide"
						          :width 	= "head.width_card_slide"
						        >
						        <!-- grey lighten-1 -->
						          <!-- @click 	= "toggle" -->

						            <!-- <v-scale-transition> -->
						          	<v-card-title
						            	:class = "head.card_class_title"
						            >
						            	<v-icon
							               	small
							                v-show 	= "show.edition"
							                :color 	= "head.card_icon_color"
							                :size 	= "head.card_icon_size"
							                v-text 	= "head.card_icon"
							                :class 	= "head.card_icon_class"
							            ></v-icon>
						            	<span>
						            		{{ $t("step") }} : 
						            		{{ item_sub.step }}
						            		-
						            		{{ item_sub.name }}
						            	</span>
						            	<v-spacer></v-spacer>	
							            
							             <v-icon
							               	small
							                v-show 	= "show.edition"
							                :color 	= "head.card_icon1_color"
							                :size 	= "head.card_icon1_size"
							                v-text 	= "head.card_icon1"
							            ></v-icon>
						            </v-card-title>
						           <!--  </v-scale-transition> -->
						            <v-card-text
								       	:class = "head.card_text_class"
						            >
							          	<!-- <v-row
								            :class 	= "head.card_row_class"
								            :align 	= "head.card_row_align"
								            :justify = "head.card_row_justify"
							          	> -->
								           
								            	<v-select
								            		dense
								            		outlined
											      	hide-details
								            		v-model 	= "item_sub.step"
								            		:label 		= "$t('edit_step')"
								            		:items   	= "item.sub_process"
								            		:item-text 	= "'step'"
								            		
								            		v-show 		= "show.edit_step"
								            		@change 	= "actions({
								            			action : 'reorder_sub_process',
								            			item : item_sub,
								            			list : item.sub_process,
								            			index : idx_sub,
								            			main_item : item,
								            		})"
								            	></v-select>
								            	<!-- <v-select
								            		dense
								            		v-model 	= "info.select[idx_sub][head.key_roles]"
								            		:label 		= "$t('roles')"
								            		:items   	= "roles"
								            		:item-text 	= "'step'"
								            		v-show 		= "show.edit_step"
								            		multiple
								            		
								            	></v-select> -->
											      	<!-- auto-grow -->
								            	<v-textarea
											      	filled
											      	hide-details
											      	no-resize
											      	rows="3"
								            		:value 		= "item_sub.description"
								            		name 		= "input-7-1"
											      	:label 		= "$t('description')"
											      	v-model  	= "item_sub.description"
								            		
											     	
								            	></v-textarea>
								           
							          	<!-- </v-row> -->
						          	</v-card-text>
						            <v-card-actions
						            	:class = "head.card_action_class"
						            >
						            	<v-btn
						            		small
						            		:color = "head.action_color_1"
						            		@click = "actions({
						            			action 	: head.action_btn_1,
						            			item 	: item_sub,
						            			index 	: idx_sub,
						            		})"
						            	>
						            		{{ $t(head.action_text_1) }}
						            	</v-btn>
						            	<v-spacer></v-spacer>
						            	<v-btn
						            		small
						            		:color = "head.action_color_2"
						            		@click = "actions({
						            			action 	: head.action_btn_2,
						            			item 	: item_sub,
						            			index,
						            		})"
						            	>
						            		{{ $t(head.action_text_2) }}
						            	</v-btn>
						            </v-card-actions>

						        </v-card>
						      </v-slide-item>
						    </v-slide-group>
						</v-sheet>

			      	</td>
				</template>
			    
			  </v-data-table>
			
		</v-card-text>
		<v-card-actions>
			
		</v-card-actions>
	</v-card>
</template>
<script  	
	type = "text/javascript"
	src  = "./js/processes.js"
></script>
