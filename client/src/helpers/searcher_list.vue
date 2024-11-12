<template>
	<v-select 
		dense
		outlined
		hide-details
		absolute
		v-model 			= "info" 
		:items  			= "render_list" 
		:label   			= "$t(info_compt.text)" 
		:multiple 			= "info_compt.multiple"
		:item-value  		= "info_compt.item_text"		
		:item-text  		= "info_compt.item_text"
		:placeholder 		= "info_compt.placeholder"
		@change 			= "render_search(info)" 
		v-if 				= "info_compt.type == 'select_search_list'"
		:prepend-inner-icon = "info_compt.icon"
    	:return-object  	= "info_compt.return_obj" 
		:disabled 			= "info_compt.isDisabled"
		@click 				= "setShowOnClick"
    	:menu-props 		= "{ 
    		closeOnContentClick : showOnClick, 
    		closeOnClick 		: true,
    		offsetY 			: true
    	}"
	>
    	
		<template 
			v-slot:selection = " { item, index } " 
		>
			
	        <v-chip 
	        	x-small
	        	color = "primary"
	        >
	         	<span> 
	          		{{ item[info_compt.show_texts[0]] }}
	          	</span>
	        </v-chip>
	        <span
	          v-show = "index > 5"
	          class  = "grey--text caption"
	        >
	          (+{{ info.length - 1 }} others)
	        </span>
      	</template>
    	<template 
    		v-slot:prepend-item
    	>
    		
	      	<v-list-item

	      	>
	        	<v-list-item-content>
			        <v-text-field 
			        	fixed        	
			        	dense			
			        	outlined
			        	hide-details
			        	v-model 	 		= "search" 
			        	label		 		= "Search" 
			        	class		 		= "mx-0 pt-0" 
			        	@input 		 		= "v => { search = v }"
			        	prepend-inner-icon  = "mdi-magnify" 
			        	:autofocus 			= "true"
			        ></v-text-field>
			       
	            </v-list-item-content>
	          </v-list-item>
	          <v-divider class = "mt-0"></v-divider>
        </template>
        <template v-slot:item = "{ item }">
	        <v-list-item
	          ripple
	          dense
	          @click = "render_search(item)"
	          
	        >
	          <!-- @click = "toggle" -->
	          	<!-- <v-list-item-action

	          	>
	            	<v-icon >
	              		{{ icon }}
	            	</v-icon>
	          	</v-list-item-action> -->
	          	<v-list-item-content>
	            	<v-list-item-title>
	              		{{ item[info_compt.show_texts[0]] }} 
	            	</v-list-item-title>
	            	<v-list-item-subtitle>
	            		{{   item[info_compt.show_texts[1]] }}
	            	</v-list-item-subtitle>
	          	</v-list-item-content>
	        </v-list-item>
	      </template>
    </v-select>
	
</template>
<script 
	type = "text/javascript" 
	src  = "./js/searcher_list.js"
></script>