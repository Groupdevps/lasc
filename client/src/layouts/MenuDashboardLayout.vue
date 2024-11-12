<template>
    <v-card outlined :height 			= "currentHeigth">
		<v-row no-gutters>
			<v-col 
				:xl="mini ? 'auto' : 1"
				:lg="mini ? 'auto' : 2"
				:md="mini ? 'auto' : 2"
				:xs="mini ? 'auto' : 2"
				:cols="mini ? 'auto' : 2"
			>
				<v-navigation-drawer
					v-model="drawer"
					:mini-variant.sync="mini"
					permanent		
					dense				
					dark
					:height 			= "currentHeigth"
				>
					<v-list-item class="px-1 " link>
						
						<v-list-item-icon
							class  = "pa-0 mx-0"
						>
							<v-icon  :color="!mini?'warning':'white'">
								{{!mini ? 'mdi-arrow-left-circle' : 'mdi-chevron-right'}}
							</v-icon>
						</v-list-item-icon>
						<v-list-item-content  @click 	= "routeToBack ? $router.push({name: routeToBack}): $router.go(-1)">
							<v-list-item-title 
								class = "text-uppercase body-1 white--text text-center"
							>
								{{ $t('go_back') }}
							</v-list-item-title>
						</v-list-item-content>
						<v-btn
							icon
							@click.stop="mini = !mini"
						>
							<v-icon>mdi-chevron-left</v-icon>
						</v-btn>
					</v-list-item>

					<v-divider></v-divider>

					<v-list dense>
						<template
							v-for="item in listMenu"
							v-if="item"
						>
							<v-list-item
								:key="item.title"
								link
								@click  = "renderRoute(item)"		
								v-if="!item.subMenus"
							>
								<!-- <v-list-item-icon>
									<v-icon>{{ item.icon }}</v-icon>
								</v-list-item-icon>
								 -->
								<v-list-item-content class="text-uppercase">
									<v-list-item-title>{{ item.title }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-group 
								dense
								v-else 		= "!item.isSubMenu && item.isMenu"
								class 		= "white--text"						
							>						
								<template v-slot:activator>
									<v-list-item-icon v-if="item.icon">
										<v-icon>{{ item.icon }}</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title class = "text-uppercase body-2 white--text text-center">
											{{ $t(item.title) }}
										</v-list-item-title>
									</v-list-item-content>
								</template>
								<v-list-item-group
									dense								
									active-class	= "teal accent-4--text"
									class 			= "blue-grey darken-3 white--text"
								> 
								<!-- light-blue darken-3 -->
									<v-list-item
										v-if  	= "item.subMenus && item.subMenus.length > 0"
										v-for 	="(subItem, idxSub) of item.subMenus"
										link
										:key 	= "item.key + idxSub + reference"
										@click  = "renderRoute(subItem)"		
									>
										<!-- <template v-slot:default="{ active }">							 -->
											<v-list-item-content>
												<v-list-item-title class  = "text-uppercase" > 
													{{ subItem.title }}			
												</v-list-item-title>
											</v-list-item-content>
										<!-- </template> -->
									</v-list-item>
								</v-list-item-group>
							</v-list-group>
						</template>
					</v-list>
					<template v-if="listOptions && listOptions.length > 0">

						<v-divider></v-divider>
						<v-list-item class="px-2 ">								
							<v-list-item-icon class  = "pa-0 mx-0">
								<v-icon >mdi-table-of-contents</v-icon>
							</v-list-item-icon>
						<v-list-item-content >
							<v-list-item-title class = "text-uppercase body-1 white--text text-center">
								<!-- OPCIONES -->
								ACCIONES
							</v-list-item-title>
						</v-list-item-content>
						
						</v-list-item>
						<v-list dense rounded>
							<template
								v-for="item in listOptions"
							>								
								<v-list-item
									:key 	= "item.title"
									link
									@click  = "renderAction(item)"										
									class="text-uppercase primary"
									:disabled = "item.isDisabled"
								>			
								<v-list-item-icon class  = "pa-0 mx-0">
									<v-progress-circular
										:size="20"
										:width="3"
										indeterminate
										color="cyan"
										v-show="item.loading"
										absolute
									></v-progress-circular>
								</v-list-item-icon>						
									<v-list-item-content >
										<v-list-item-title class="d-flex justify-start">{{ item.title }}</v-list-item-title>										
									</v-list-item-content>
								</v-list-item> 
							</template>		
						</v-list>
					</template>
					
				</v-navigation-drawer>
			</v-col>
			<v-col>				
		        <slot ></slot>
			</v-col>
		</v-row>
  	</v-card>
</template>
<script>
    export default{
        name : "MenuDashboardLayout",
        props : ["currentHeigth", "listMenu", "reference", "routeToBack", "listOptions"],
        data : ()=>({
			mini: false,
			drawer: true,
        }),
        methods:{
            renderRoute(item){
				if(item.route != this.$route.name){					
					this.$router.push({
						name : item.route
					})
				}
			},
			renderAction(item){
				if (item && item.action) {
					item.action(item);
				}else{
					console.warn("this item no have actions")
				}
			},
        }
    };
</script>