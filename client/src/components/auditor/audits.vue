<template>
	<v-data-table
		dense
	    :headers 			 = "headers"
	 	:items 	 			 = "list_render"
	    class 	 			 = "elevation-5"			    
	    :hide-default-footer = "height < 56 ?  true : false"
	   	:options.sync 		 = "options"
	   	:server-items-length = "total"
	   	:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [15, 30],
	   		showCurrentPage     : true
	   	}"
	   	loading-text 		= "Loading... Please wait"
	    :height 			= "height + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    fixed-header
	>
		<template v-slot:top >
			<v-toolbar
				v-show = "fields && fields.length > 0"
			>
				<v-row
					dense
				>
					<template
						v-for = "(item_field, idx_info) of fields"
					>
						<v-col
							:cols = "item_field.col" 
						>
							<v-text-field
								dense
								outlined
								hide-details
								v-if 			= "['text', 'number'].includes(item_field.type)"
								:type 			= "item_field.type"
								v-model 		= "info[item_field.key]"
								:label 			= "item_field.text"
								:placeholder	= "item_field.placeholder" 
								clearable
							>
								<template
									v-slot:prepend-inner-icon
								>
									<v-icon
										:color = "item_field.color_icon"
									>
										{{ item_field.icon}}
									</v-icon>
								</template>
							</v-text-field>
							<v-select
								dense
								outlined
								hide-details
								v-else-if 		= "['select'].includes(item_field.type)"								
								v-model 		= "info[item_field.key]"
								:items 			= "rendered_listed(item_field)"
								:item-value 	= "item_field.item_value"
								:item-text 		= "item_field.item_text"
								:label 			= "item_field.text"
								:placeholder	= "item_field.placeholder" 
								@change 		= "actions(item_field)"
								:return-object  = "item_field.return_obj"
								clearable
							>
								<template
									v-slot:prepend-inner-icon
								>
									<v-icon
										:color = "item_field.color_icon"
									>
										{{ item_field.icon}}
									</v-icon>
								</template>
							</v-select>
						
							<dates
								:key 				= "item_field.key + ref"
								v-else-if	 		= "item_field.type == 'date_range'"
								:info_to_component 	= "item_field"
								:info_to_dates 	    = "info[item_field.key]"
								@receive_info 		= "info[item_field.key] = $event"
							></dates>
							<v-btn
								v-else-if  = "item_field.type == 'btn' "
								:color = "item_field.color"
								@click = "actions(item_field)"
							>
								<v-icon>
									{{ item_field.icon }}
								</v-icon>
								{{ $t(item_field.text) }}
							</v-btn>
						</v-col>
					</template>
				</v-row>
			</v-toolbar>
			<modal
				:key 				= "'table_modal_' + ref"
				:info_to_component  = "modal"
				:ref_to_component 	= "'table_modal_' + ref"
				@close 				= "actions({action : 'close_modal'}, $event)"
	   		></modal>
		</template>

		<template
			v-for 			= "head of headers"
			:slot	 		= "`header.${head.value}`" 
 			slot-scope 		= "{header}"
		>
			<!-- v-slot:[`header.${head.text}`] = "{ header, index }"  -->			
			<span>					
				{{ $t(head.text) }} 
			</span>
			<!-- {{ head.text}} -->
		</template>
		<template
			v-for = "(item_opt, idx_opt) of list_options"
			v-slot:[`item.${item_opt.key}`] = "{ item, index}"
		>

			<v-btn-toggle
				mandatory
				v-if = "item_opt && item_opt.options && item_opt.options.length > 0"
				dark
			>
				<template 
					v-for = "(sub_opt, idx_sub) of item_opt.options"
				>
				
					<v-tooltip
						bottom
					>
						<template v-slot:activator = "{ on, attrs }" >
							
							<v-btn
								x-small
								@click 	= "actions(sub_opt, item, index)"
								v-show  = "check_role(sub_opt)"
								:color  = "sub_opt.color"
								v-bind 	= "attrs"
								v-on   	= "on"
								:key 	= "ref + idx_sub + 'btn_options'"
								class  		= "white--text"
							>
								<!-- :outlined = "sub_opt.isOutlined" -->
								<v-icon
									x-small
									:class = "sub_opt.class_icon"
								>
									{{ sub_opt.icon }}
								</v-icon>
								

							</v-btn>
						</template>
						<span>
							{{ $t(sub_opt.tooltip) }}
						</span>
					</v-tooltip>
				</template>
			</v-btn-toggle>
		</template>
	</v-data-table>

</template>
<script type="text/javascript" src = "./js/audits.js"></script>