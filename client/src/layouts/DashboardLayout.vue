<template>
	<v-row>
		<v-col
			cols = "12"
		>
			<v-card 				
				class 		= "pa-0 body-1 rounded-ms"				
				elevation 	= "15"
			>		
				<v-card-text
					class = "pa-0"
				>
					<v-card>
						<v-tabs
							dark
							fixed-tabs 
							v-model 		 	= "tab"
							background-color 	= "cyan"
							active-class 	 	= "teal accent-5"
							height 				= "35"
						>
							<v-tab
								class 				= "white--text"
								v-for = "(item_tab, idx_tab) of items"
								:key  = "idx_tab"
								v-show = "item_tab.isShow"
							>	
								{{ item_tab.text }}
							</v-tab>
						</v-tabs>
					</v-card>
					<v-tabs-items 
						v-model = "tab"
						:style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${currentHeight}px;`"
						>
						<v-tab-item
							v-for = "(item_tab_i, idx_tab_i) of items"
							:key  = "idx_tab_i"
							v-show = "item_tab_i.isShow"
						>

							<v-card flat>
								<v-card-text class="pa-0">									
									<slot  :item="item_tab_i" :currentHeight="currentHeight" ></slot>
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs-items>
					
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>
<script type="text/javascript">
	export default {
		name : "DashboardLayout",
		props: ["items"],
		data : (vm) => ({
			tab 	: null,  
			// tab_items 	: [],			
		}), // data

		created(){
		}, // created
		computed : {
			currentHeight(){
				return this.$vuetify.breakpoint.height - 100
			},

			// currentRoute(){
			// 	let name_route = this.$route.name;
			// 	if (params && params[name_route]) {
			// 		// console.log("find params ")
			// 		this.tab_items = params[name_route];
			// 	}
			// 	return name_route;
			// }, // currentRoute
		}, // computed
	};
</script>