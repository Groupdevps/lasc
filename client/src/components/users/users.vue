<template>
	<v-data-table
		dense
	    fixed-header
	    :headers 			 = "headers"
	 	:items 	 			 = "list_render"
	    class 	 			 = "elevation-5"			    	    
	   	:options.sync 		 = "options"
	   	:server-items-length = "total"	   	
	   	loading-text 		= "Loading... Please wait"
	    :height 			= "height + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    :footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [100],
	   		showCurrentPage     : true
	   	}"
	>
		<template v-slot:top >
			
			<v-container fluid >			
				<v-btn color="primary" @click="openModal(false)" v-show="currentPermission.canAdd">Agregar</v-btn>			
				<v-dialog width="700" v-model = "isModal" persistent>
					<v-card outlined class="overflow-hidden">
						<v-card-title class="primary subtitle-2 pa-1 white--text">
							<v-icon small class="mr-2" color="white">mdi-account</v-icon>
							<span>{{infoItem? "EDITAR" : "AGREGAR" }}</span>
							<v-spacer></v-spacer>
							<v-btn small icon class="error" @click="closeModal(false)"><v-icon color="white" small>mdi-close</v-icon></v-btn>
						</v-card-title>
						<v-card-text class="pa-0">							
							<SubUser :infoToComponent="infoItem" @receiveInfo="closeModal(false)" :listToComponent="list" :currentPermission="currentPermission"></SubUser>
						</v-card-text>
					</v-card>
				</v-dialog>
			</v-container>
			
		</template>
		<template v-slot:item.actions="{item}">
			<v-btn-toggle mandatory>
				<v-btn color="primary" x-small @click="openModal(item)" v-show="currentPermission.canEdit"> <v-icon color="white" x-small>mdi-pencil</v-icon></v-btn>
				<v-btn color="error" x-small @click="confirmDelete(item)" v-show="currentPermission.canDelete"> <v-icon x-small color="white">mdi-delete</v-icon></v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>

</template>
<script type="text/javascript">
	import SubUser 				from "@/components/users/SubUserComponent.vue"
	import userService          from "@/services/user.service";
	export default {
		name 		: "UsersComponent",
		components	: {
			SubUser
		},
		data : (vm)=> ({
			list 			: [],
			search 			: [],
			info 			: {},
			info_item 		: null,
			ref 			: "users",
			headers 		: [
				{ text : "USUARIO", value : "username" },
				{ text : "NOMBRE", value : "name" },
				{ text : "CENTRO", value : "Center.name" },
				{ text : "CARGO", value : "Role.name" },
				{ text : "CORREO", value : "email" },			
				{ text : "ACCIONES", value : "actions" },
			],
			loading 		: false,
			show 			: {},
			options 		: { itemsPerPage : vm.total || 100 },
			total 			: 0,
			height 			: 400,
			fields 			: [
				{				
					type 		: "btn",
					color 		: "primary",
					text 		: "add_staff",
					action 		: "add_item",
				}
			],

			user 			: {
				role : "admin",
			},
			infoModal 			: null,
			parameters  	: null,
			isModal : false,
			infoItem : null,
			list_options 	: [
				{
					key 	: "action",
					options : [
						/*{
							key  		: "info_patient",
							action  	: "info_patient",						
							icon 		: "mdi-folder-information-outline",
							show_in 	: ["*"],
							tooltip 	: "info_patient"

						},*/
						{
							key  		: "update_item",
							action  	: "editUser",
							icon 		: "mdi-pencil",						
							show_in 	: ["admin", "manager"],						
							tooltip 	: "edit",
							color 		: "primary",				
							
						},
						{
							key  		: "confirm_delete_item",
							action  	: "confirm_delete_item",
							icon 		: "mdi-delete",		
							color 		: "error",				
							show_in 	: ["admin", "manager"],						
							tooltip 	: "delete",						
						},
					]
				}
			],
			bus 			: {},

		}), // data

		created(){
			this.height = this.$vuetify.breakpoint.height - 250 ;
		}, // created

		watch : {
			options : {
				handler(val){
					if (val) {						
						this.getList()
					}
				}, deep : true
			}
		}, // watch
		computed : {
			list_render : function(){
				return this.list;
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("UsersComponent") 
			}
		}, // computed

		methods : {
			openModal(item=null){
				this.infoItem = item?{...item}:null;
				this.isModal = true;
				
			},
			closeModal(item){
				this.isModal=false;			
			},
			confirmDelete(item){
				this.infoItem = { ...item };			
				this.$EventBus.$emit("notifications",{
					type : "confirm_delete",
					action : this.del,
					ID : "UserComponent",
				});
			},
			actions(actionn, item, option){
				if (actionn) {			
					const {action} = actionn;
					if (action == "addUser") {
						this.infoModal = {};
					}else if(action == "editUser"){
						this.infoModal = item;					
					} else if (action == "confirm_delete_item") {
						this.$EventBus.$emit("notifications",{
							type : "confirm_delete",
							ID   : this.ref,
						})					
						this.info_item = {
							item   : item,
							action : "delete_item"
						};

					}else if (action == "delete_item") {
						this.del();
					}
					else if (action == "close_modal") {
						if (item ) {
							if (item.action == "add") {						
								this.list.push({...item.item});
								this.total++;
							}else{							
								const {index}  = this.info_item; 
								if (index >= 0) {
									this.list.splice(index, 1, {...item.item});
									this.setInfoItemDefault();
								}

							}
						}
						this.infoModal = null;
					}
				}
			}, // actions
			
			setInfoItemDefault(){
				this.info_item = null;
			}, // setInfoItemDefault

			async getList(){
				try{
					this.loading = true;
					const service = userService;
					const res = await service.getUsers();
					if (res && res.data && res.data.length > 0) {
						this.list = res.data;								
						this.total = this.list.length ;
					}						
				}catch(error){
					console.warn("Error get users ", error);
					this.$EventBus.$emit("notifications",{
						type 	: "error",
						msg 	: "Listando Usuarios",
					})
				}finally{
					this.loading = false;
				}
			}, // request

			async del(){	
				try{
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {	
						if (this.infoItem && this.infoItem.id) {				
							this.loading 	= true;
							const service = userService;
							const res = await service.deleteUser(this.infoItem);
							if(res){

								if (res.error) {
									this.$EventBus.$emit("notifications",{
										type 	: "warning",
										message : this.$Helper.renderErrorMessage(res.error, this.$t("error_deleting_information"))
									})			
								}else{
									this.total --;
									this.list.splice(this.list.indexOf(this.infoItem), 1);
									this.infoItem = null;
									this.$EventBus.$emit("notifications",{
										type  : "success",
										msg   : "Usuario Eliminado"
									});		
								}
							}
						}
					}
				}catch(error){
					console.warn("Error delete user ", error)
					this.$EventBus.$emit("notifications",{
						type 	: "error",
						message : this.$Helper.renderErrorMessage(error, this.$t("error_deleting_information"))
					})	
				}finally{
					this.loading = false;				
				}			
			}, // del		
		}, // methods
	}; 
</script>