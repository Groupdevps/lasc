<template>
	<v-row>
		<v-col
			cols = "12"
		>
			<v-card 
				outlined
				:elevation = "25"
			>
				<!-- {{ title }} -->
			</v-card>
			<v-card-text>
				<v-tabs
			      	dark
			      	fixed-tabs 
			      	v-model 		 = "tab"
			      	background-color = "primary"
			    >
			      	<v-tab
			        	v-for = "(item_tab, idx_tab) of tab_items"
			        	:key  = "idx_tab"
			      	>
			        	{{ item_tab.text }}
			      	</v-tab>
			    </v-tabs>

			    <v-tabs-items v-model="tab">
			      	<v-tab-item
			        	v-for="(item_tab_i, idx_tab_i) of tab_items"
			        	:key="idx_tab_i"
			      	>
			        	<v-card flat>
			          		<v-card-text>
			          			<component	 :is = "item_tab_i.component"></component>
			          			<!-- <admisiones/> -->
			          		</v-card-text>
			        	</v-card>
			      </v-tab-item>
			    </v-tabs-items>
			    
			</v-card-text>
		</v-col>
	</v-row>
</template>
<script
	type = "text/javascript"
	src  = "./js/nursing_care.js" 
></script>
