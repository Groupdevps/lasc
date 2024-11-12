<template>
  
  <v-app id = "inspire">
  
    <v-navigation-drawer 
      fixed
      clipped
      app
      temporary
      class = "mt-10"
      v-model = "menu"
      width   = "250"
      v-show  = "currentUser"
      
    >
      <v-list 
        dense

      >
        <template
          v-for  = "(item_sidebar, idx_sidebar) of modules"
        
        > 
          <v-list-group
            :value="false"
            :prepend-icon="item_sidebar.icon"            
            height  = "15px"
          >
            <template v-slot:activator>
              <v-list-item-title   class   = "pl-0 ma-0 text-uppercase" >{{item_sidebar.text}}</v-list-item-title>
            </template>
            <v-list-item
              dense
              v-for="(itemSub, iSub) in subMenu"
              @click  = "redirect(item_sidebar, itemSub)"
              :key    = "iSub"
              v-show  = "isEnableSubMenu(itemSub, item_sidebar)"
              class   = "pl-6 ma-0"   
              height  = "15px"
            >
              <v-list-item-icon

                class = "py-0 my-1"
              >
                <v-icon
                >
                  {{ itemSub.icon}}
                </v-icon>
              </v-list-item-icon>

              <v-list-item-title class="text-uppercase">
                {{ itemSub.text }}
              </v-list-item-title>
              
            </v-list-item>
          </v-list-group>

          
          
        </template>
      </v-list>     
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      :color  = "bar.color"
      height = "40"
      
    >
      <v-toolbar-title 
        :class = "bar.class_title"
        @click = "actions({action : 'redirect_title'})"
      >
        <strong>       
          {{ bar.title }} 
        </strong>
      </v-toolbar-title>

      <v-app-bar-nav-icon
        @click = "actions({action : 'menu'})"
        v-show = "show.menu"
      >
        <v-icon
        >
          mdi-menu
        </v-icon>
      </v-app-bar-nav-icon>    

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <span 
        v-show = "show.route"
        class = "text-uppercase h5 font-weight-bold" 
      >
        {{ $t(currentRoute) }}
      </span>

      
      <template
        v-for = "(item_option, idx_option) of render_options"
      >
      <!-- {{ show[item_option.key]}} -->
        <v-spacer
          :key  = "'app' + idx_option"
          v-if  = "['space'].includes(item_option.type)"
          v-show  = "show[item_option.key]"
        
        ></v-spacer>
        <v-btn
          text
          :key  = "'app_btn' + idx_option"
          v-if  = "['btn'].includes(item_option.type)"
          @click  = "actions(item_option)" 
          :icon   = "!item_option.text"
          v-show  = "show[item_option.key]"
          :class  = "bar.class_title"
        >
          <v-icon
            :color  = "item_option.color"
          >
            {{ item_option.icon }}
          </v-icon>
          <span class = "ml-1">           
            {{  item_option.key != "profile" ?   $t(item_option.text) : currentUser && currentUser.username ? currentUser.username : $t('user') }}
          </span>
        </v-btn>
        <component
          :key      = "item_option.key"
          :is       = "item_option.component"
          v-else-if = "item_option.type == 'component'"
        ></component>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid class ="pa-1" >

          <!-- If using vue-router -->
            <router-view  v-slot = "{ Component, route }">
              <transition :name = "route.meta.transition || 'fade'" mode = "out-in">
              <!-- <keep-alive> -->
                <!-- <suspense> -->
                  <!-- <template #default> -->
                    <component
                      :is  = "Component"
                      :key = "route.path ? route.path : undefined"
                    />
                    <!-- route.meta.usePathKey -->
                  <!-- </template> -->
                  <!-- <template #fallback> Loading... </template> -->
                <!-- </suspense> -->
              <!-- </keep-alive> -->
            </transition>
            </router-view>
        </v-container>
    </v-main>
    
    <template>
      <modal_notifications></modal_notifications>
    </template>
    <v-footer app height="30">      
      <v-col
      class="text-center pa-0"
      cols="12"
      >
      <strong>ARSUD</strong> <v-icon small>mdi-registered-trademark</v-icon> — {{ renderYear() }} 
    </v-col>
    </v-footer>
  </v-app>
</template>
<script type = "text/javascript" >
  import general 		 		from "@/components/parameters/modules.js";
  import modal_notifications 	from "@/components/info/modal_notifications.vue"; 
  import notifications 		from "@/components/info/notifications.vue"
  import menuDefault from "@/views/js/defaultMenu.js"
  import menuServices from "@/views/js/menuServices.js"
  
	export default{
		name 		: "app",
		components  : {
			notifications,
			modal_notifications,
		},
		data : (vm) => ({
			menu    : false, 
			module  : "",
			modules : [ ...menuServices ], // general.modules
      subMenu : [...menuDefault],
			options : [ ...general.options ],
			bar 	: {
				color 		: "red",
				title 		: "L - ASC",// "ARSALUD",//
				class_title : "white--text font-weight-black",
			},
			show 	: {
				menu 			: false,
				route 			: false,
				dark_mode 		: false,
				messages 		: false,
				notifications 	: false,
				flags 			: false,
				user 			: false,
				settings 		: false,
				logout 			: false,
				login 			: false,
				register 		: false,
				start 			: false,
				description 	: false,
				screenshots 	: false,
				contacts 		: false,
				space1 			: false,
				space 			: false,

			},
			list_shows 		: [
				{ key : "start", 		 in : ["landing"] },
				{ key : "description", 	 in : ["landing"] },
				{ key : "screenshots", 	 in : ["landing"] },
				{ key : "contacts", 	 in : ["landing"] },
				{ key : "login", 		 in : ["landing", "before_register"]  },				 
				{ key : "register", 	 in : ["landing", "before_login"]},
				{ key : "space1", 	 	 in : ["landing", "before_login"],},
				{ key : "menu", 		 in : ["login"],} ,
				{ key : "route", 		 in : ["login"],} ,
				{ key : "messages", 	 in : ["login"],} ,
				{ key : "dark_mode", 	 in : ["login"],} ,				
				{ key : "notifications", in : ["login"],} ,
				{ key : "flags", 		 in : ["login"],} ,
				{ key : "profile", 		 in : ["login"],} ,
				{ key : "settings", 	 in : ["login"],} ,
				{ key : "logout", 	 	 in : ["login"]},
				{ key : "space", 	 	 in : ["login", "landing", "before_login", "before_register"]},			

			],
			
		}), // data
		
		created(){
			this.render_route();			
			this.renderLogin();			
		}, // created 
		watch:{
			isUserLogged(val){				
				if (val) {
					this.renderLogin();
				}
			}
		},

		mounted(){			
			this.$vuetify.theme.themes.light.accent = "primary"; // rgb(25 118 210);
			this.$vuetify.theme.defaults.dark.accent = "primary"
			
			this.actions({action : "load_locals"});
			
		}, // mounted
		computed : {
			isUserLogged(){
				return this.$store.getters["auth/isUserLoggedIn"];
			},
			currentUser(){
				return this.$store.getters["auth/user"]; //state.auth.user;
			},  // currentUser
			currentRoute(){				
				this.render_route();
				if (this.$route && this.$route.name == 'landing') {
					this.$vuetify.theme.dark = false;
				}
				return this.$route.name;
			}, // currentRoute

			render_options(){
				return this.options;
			}, // render options

			currentRolesUser(){
				return this.$store.getters["auth/userRoles"].map(x => x.toLowerCase());
			},
			currentPermission(){								
				return this.$store.getters["auth/getPermission"]
			}
		}, // computed
		methods : {
			renderLogin(){
				if (this.currentUser) {
					if (this.currentUser.RoleId) {
						this.$store.dispatch("auth/getInfoRole", { role : this.currentUser.Role.name})
					}
					this.$store.dispatch("infoCenter/getInfo");

					if (!this.$store.getters["listTypesOrder/isList"]) {
						this.$store.dispatch("listTypesOrder/getList");
					}
					if (!this.$store.getters["listTypeService/isList"]) {
						this.$store.dispatch("listTypeService/getList");
					}
          if (!this.$store.getters["listNoteType/isList"]) {
						this.$store.dispatch("listNoteType/getList");
					}
					this.$ManagerSmith.loadLists();
				}
			},
			actions(action, item, option){
				// console.log("action ", action)
				if (action) {

					if (action.action == 'menu') {
						this.menu = !this.menu
					}else if (action.action == 'logout') {
						this.$store.dispatch('auth/logout');
						this.$router.push({ path : "/" });
						this.$Helper.set_local("dark_mode", false);
	      				// this.$router.push('/login')
					}else if (action.action == "redirect"){					
						this.$router.push({ path : "/" + action.key});					
					}else if (action.action == "displace"){
						this.$vuetify.goTo('#' + action.key);
					}else if (action.action == "redirect_title") {
						if (this.currentUser) {
              if(this.$route && this.$route.name != "dashboard"){
                this.$router.push("/dashboard");
              }
						}else{
							this.$router.push("/landing");						
						}
					}else if (action.action == "dark_mode") {	
						if (action.icon == "mdi-brightness-4") {
							action.icon = action.icon2; 
							this.$vuetify.theme.dark = true;
							this.$Helper.set_local("dark_mode", true);
						}else{
							action.icon = action.icon1;  
							this.$vuetify.theme.dark = false;
							this.$Helper.set_local("dark_mode", false);
						}
					}else if (action.action == "load_locals") {
						let is_dark = this.$Helper.get_local("dark_mode") || false;												
						if (is_dark) {							
							let idx = this.options.findIndex(x=>(x.key == "dark_mode"));
							if (idx >= 0) {
								this.options[idx].icon = "mdi-brightness-6"
								this.$vuetify.theme.dark = true;								
							}
						}						
					}
				}
			}, // actions
			renderYear(){
        return  new Date().getFullYear();
      },  
			render_route(){
				// console.log("render route")
				this.$nextTick(()=>{
					let include = "login" == this.$route.name ? "before_login" : 
						this.$route.name == "register" ? "before_register" : 
						this.currentUser ?  'login' : "landing"; 
					

				 	if (["landing", "login", "register"].includes(this.$route.name)) {
						this.bar.color 		 	= "white";
						this.bar.class_title 	= "black--text";	
						if (this.currentUser) {
							this.$router.push("/dashboard");
						}					
					}else{
						this.bar.color 		 = "primary";
						this.bar.class_title = "white--text";					
					}
					this.list_shows.forEach((it)=>{
						if (it.in.includes(include)) {
							this.show[it.key] 			= true;
						}else{
							this.show[it.key] 			= false;							
						}
					})
				})
			 },



       isEnableSubMenu(item, itemSidebar){
        if(item){
          if(item.showWithRoles && item.showWithRoles.length){
            try {               
            	// console.log("currentUser ", this.currentUser, item.key, this.currentPermission(item.key))
              const { canView } = this.currentPermission(item.key)
              // console.log("CAN VIEW ", canView)
              if (canView) {
              	return canView;
              }
            	if (this.currentUser.RoleId == 2 || this.currentUser.id == 1) {
            		return true
            	}
            	return false            	
              // const find = item.showWithRoles.some(x=> this.currentRolesUser.includes(x.toLowerCase())) ;	
              // if(item.key == "pharmacy")console.log("FIND ROLE ",item.key,  find, item.showWithRoles,  this.currentRolesUser, itemSidebar.modules)				              
              // return find && itemSidebar.modules.includes(item.key)
            } catch (error) {
              return false
            }
          }else if(item.isAble){
            return true;
          }
        }
			  return false;
       },
       redirect(item,subItem){
        if(item && subItem){
          this.$router.push({
            name : subItem.key,
            params 	: {                
                option       : item.key
              }
          })
          
        }
       }
		}, // methods



	};
</script>