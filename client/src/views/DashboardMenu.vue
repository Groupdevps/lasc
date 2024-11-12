<template>
	<v-container fluid>
		<v-row 
			dense
			justify = "center"

		>
			<v-col cols ="12" offset="8">

				<v-btn
					small
					v-show = "show.selectService"
					@click = "actions({action:'reselection'})"
					color = "success"
					>
					ReSeleccionar Servicio
				</v-btn>
				<v-btn
					small
					v-show = "show.selectService"
					:disabled = "true"
				>{{ $t(infoOption) }}</v-btn>
			</v-col>
			
			<template
				v-for =  "(item_menu, idx_menu) of render_menus" 
			>
				<v-col
					:cols 	= "item_menu.cols || 3"
					v-show = "renderWithRoles(item_menu)"
				>
					<v-card outlined
						:height = "'100%'"
						class = "elevation-7"
					>
						<v-card-title
							class = "pa-0 blue darken-3 white--text caption font-medium-bold text-uppercase justify-center"
						>
						
							<v-icon
								:color = "item_menu.color"
								class  = "mx-1"
								>
								{{ item_menu.icon }}	
							</v-icon>
							 <span>
								<!-- {{ $t(item_menu.name) }} -->
							</span> 
						</v-card-title>
						<v-card-text
							class = "pa-1"
						>
							<v-img
								height 	= "200px"
								:src 	= "item_menu.image"
							></v-img>
							<!-- <span> {{ $t(item_menu.description) }}</span> -->							
						</v-card-text>
						<v-card-actions
							class = "pa-1 justify-center" 
						>	
							
							<v-row
								justify = "center"
								align 	= "center"
							>
								
								<template
									v-for = "(btn_action, idx_action ) of item_menu.actions"
								>
									<v-col
										cols = "5"
									>
										
										<v-btn
											small
											:color = "btn_action.color"
											@click = "actions(btn_action)"
										>
											{{ $t(btn_action.text) }}
										</v-btn>
									</v-col>
								</template>
							</v-row>
						</v-card-actions>
					</v-card>
				</v-col>	
			</template>
		</v-row>
	</v-container>
</template>
<script  
	type = "text/javascript"
	
>
import menus_defaults from "./js/defaultMenu.js"
import menuServices from "./js/menuServices.js"
export default {
	name : "dashboard",
	data : (vm)=> ({
		info 		: {},
		infoOption  : "",
		info_item 	: null,
		show : {
			selectService : false,
		}
		
	}), // data

	created(){

	}, // created

	computed : {
		render_menus : function(){
			let menus = [];
			if (this.$route && this.$route.name == 'dashboard') {
				if(this.show.selectService){
					menus = [ ... menus_defaults];					
				}else{
					menus = [ ...menuServices];
				}
			}
			return menus;
		},
		currentRolesUser(){
			return this.$store.getters["auth/userRoles"].map(x => x.toLowerCase());
		},
	},// computed

	methods : {

		actions(action, item, option){
			//console.log("actions dashboard ", action, item, option)
			if (action) {
				if (action.action == "redirect") {					
					this.$router.push({
						name : action.redirect_to,
						params 	: {                
							option       : this.infoOption
						}
					})
				}else if(action.action == "selectMenu"){
					this.show.selectService = true;
					this.infoOption = action.key;
				}else if(action.action == "reselection" ){
					this.show.selectService = false;
					this.infoOption = "";
				}
			}
		}, // actions
		renderWithRoles(item){
			if(item){
				if(item.showWithRoles && item.showWithRoles.length){
					try {						
						// const roles = this.currentRolesUser;
						const { canView } = this.$store.getters["auth/getPermission"](item.key)
			            // console.log("CAN VIEW ", canView)
			            if (canView) {
			              	return canView;
			            }
						//console.log("ROLES ", roles, item.showWithRoles)
						// const find = item.showWithRoles.some(x=> roles.includes(x.toLowerCase())) ;					
						// return find
					} catch (error) {
						return false
					}
				}else if(item.isAble){
					return true;
				}
			}
			return false;
		}

	}, // methods
}
// ./js/defaultMenu
</script>