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
				:color	= "head.icon2_btn_color"
				:height = "head.height_add"
				:width 	= "head.width_add"
				@click 	= "actions({
					action : head.action_icon2
				})"
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
			    :class 				 	= "head.class_table"
			    :height 			 	= "head.height_table"
			    :options.sync 			= "options"
      			:server-items-length 	= "total"
			>
			    <!-- item-key 			 	= "name -->"
			</v-data-table>
		</v-card-text>
		<v-card-actions
			:class = "head.class_actions"
		></v-card-actions>
		<modal
			:key 				= "'modal_' + this.ref"
			:info_to_component  = "modal"
			:ref_to_component 	= "'modal' + this.ref"
			@close 				= "actions({action : 'close_modal', item : $event})"
		></modal>
		
	</v-card>
</template>

<script 
	type 	= "text/javascript"
	src 	= "./js/settings.js"
></script>