<template>
	<v-menu
		bottom 
		offset-y 
		:key  					= "'menu' + ref_to_component"
		:close-on-content-click = "false"
		
	>
		<template v-slot:activator = "{ on : menu }">
			<v-tooltip top>
				<template v-slot:activator = "{ on : tooltip}">
					<span
			    		v-on = "{...tooltip, ...menu}"	
		    		>			  

		    			<v-icon
		    				large
		    				v-show = "info.icon"
		    			>
		    				{{ info.icon }}
		    			</v-icon>
		    			<br>
		    			<span 
			      			class  = "caption mb-0"	
		    				v-show = "info.tag"			      				      	
				      	>
				      		{{ $ml.get(info.tag) ? $ml.get(info.tag) : info.tag }}
				      	</span> <!--  d-flex justify-center -->
			    	</span>
				</template>
				<span 
	      			class  = "caption mb-0"	
					v-show = "info.tag"			      				      	
		      	>
		      		{{ $ml.get(info.tag) ? $ml.get(info.tag) : info.tag }}
		      	</span>
			</v-tooltip>
			<span>
				
			</span>
		</template>
		<v-list 
			dense
		>
			<v-list-item-group 
              	dense
              	:multiple  	= "options.multiple"
              	v-if 		= "options.type == 'select'"
              	v-model 	= "selecteds"
            >
              	<template v-for = "(item_list, index_list) of list">
                
		            <v-list-item               
	                	dense
	                	:Key 	   = "index_list"
	                	v-if       = "item_list"                   
	                	@click     = "actions_menu(options.action, item_list, index_list)"
	                
	              	>             
		              	<template v-slot:default="{ active }">
	                  		<v-list-item-action 
	                  			v-if = "options.multiple"
	                  		>
			                    <v-checkbox
			                      color 			 = "primary"
			                      :input-value 		 = "active"
			                    ></v-checkbox>
		                  	</v-list-item-action> 
		                  	<v-list-item-content 
		                  		class = "pa-0 ma-0"
		                  	>
		                    	<v-list-item-title> 
		                    		{{ options.item_text ? item_list[options.item_text] : item_list }} 
		                   		</v-list-item-title>
		                  	</v-list-item-content>
	                	</template>              
	            	</v-list-item>
	            </template>
	        </v-list-item-group>
	    </v-list>
	</v-menu>
</template>