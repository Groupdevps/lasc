<template>
	<v-data-table
		dense
	    :headers 			 = "headers"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5"			    	    
	   	:options.sync 		 = "options"
	   	:server-items-length = "total"
	   	:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [15, 30],
	   		showCurrentPage     : true
	   	}"
	   	loading-text 		= "Loading... Please wait"
	    :height 			= "(currentHeight - 150)+'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    fixed-header
	>
		<template v-slot:top >
			<v-toolbar>
				<v-container fluid>			
				<v-btn color="primary" @click="openModal(false)">Agregar Administrador/EPS</v-btn>			
					<v-dialog width="500" v-model = "isModal" persistent>
						<v-card>
							<v-card-title class="primary subtitle-2 pa-1 white--text">
								<v-icon small class="mr-2" color="white">mdi-hospital-building</v-icon>
								<span>{{infoItem? "EDITAR" : "AGREGAR" }}</span>
								<v-spacer></v-spacer>
								<v-btn small icon class="error" @click="closeModal(false)"><v-icon color="white" small>mdi-close</v-icon></v-btn>
							</v-card-title>
							<v-card-text class="pa-0">					
								<SubCurrentAdministrator :infoToComponent="infoItem" @receiveInfo="closeModal(false)" :listToComponent="list" :currentPermission="currentPermission"></SubCurrentAdministrator>
							</v-card-text>
						</v-card>
					</v-dialog>
				</v-container>
			</v-toolbar>
			
		</template>

		<template
			v-for 			= "head of headers"
			:slot	 		= "`header.${head.value}`" 
 			slot-scope 		= "{header}"
		>
			<!-- v-slot:[`header.${head.text}`] = "{ header, index }"  -->			
			<span class= "text-uppercase">					
				{{ $t(head.text) }} 
			</span>
			<!-- {{ head.text}} -->
		</template>
		<template v-slot:item.TypeCenterId="{item}" >
			<span class="text-uppercase">
				{{ renderNameTypeCenter(item.TypeCenterId) }}
			</span>
			
		</template>
		<template v-slot:[`item.actions`] = "{ item, index}">
			<v-btn-toggle mandatory dark>				
				<v-btn x-small @click 	= "openModal(item)" v-show  = "currentPermission.canEdit" color="primary" class="white--text">
					<v-icon x-small>mdi-pencil </v-icon>							
				</v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>

</template>
<script type="text/javascript" >
	// src = "./js/current_administrators.js"
import CurrentAdministratorService from "@/services/CurrentAdministratorService.js"
import SubCurrentAdministrator from "@/components/management/SubCurrentAdministratorComponent.vue"
export default {
	name 		: "CurrentAdministratorsComponent",
	components	: {
		SubCurrentAdministrator
	},
	props :["currentHeight"],
	data : (vm)=> ({
		list 			: [],
		infoItem 		: null,
		headers 		: [
			{ text : "name", value : "name" },
			{ text : "TypeCenterId", value : "TypeCenterId" },
			{ text : "nit", value : "nit" },
			{ text : "code", value : "code" },
			{ text : "mobilityCode", value : "mobilityCode" },
			{ text : "regime", value : "regime" },
			{ text : "actions", value : "actions" },
		],
		loading 		: false,
		show 			: {},
		options 		: { itemsPerPage : 50 },
		total 			: 0,
		isModal 		: false,
	}), // data
	mounted(){
		if (!this.$store.getters["listTypeCenter/isList"]) {
            this.$store.dispatch("listTypeCenter/getList")
        }
	},
	watch : {
		options : {
			handler(val){
				if (val) {					
					this.getList();
				}
			}, deep : true
		}
	}, // watch
	computed : {
		renderList : function(){
			return this.list;
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("CurrentAdministratorsComponent") 
		}
	}, // computed

	methods : {
		openModal(item){
			this.infoItem=item?{...item}:null;
			this.isModal=true;
		},
		closeModal(item){
			this.isModal=false;			
		},
		confirmDelete(item){
			this.$EventBus.$emit("notifications",{
				type : "confirm_delete",
				ID   : "CurrentAdministratorsDelete",
				action : this.deleteItem,
			})					
			this.infoItem = item;
		},
		
		setInfoItemDefault(){
			this.infoItem = null;
		}, // setInfoItemDefault
		renderNameTypeCenter(item){
			const it=this.$store.getters['listTypeCenter/getTypeCenterById'](item)
			return it?.name || item;
		},
		async getList(){
			try{
				this.loading=true;
				const service = new CurrentAdministratorService();
				const res = await service.getInfo();
				if (res && res.data && res.data.length > 0) {
					this.list=res.data;
					this.total=this.list.length;
				}else{
					this.list=[];
					this.total=0
				}

			}catch(error){
				console.warn("Error get agreement ", error)
			}finally{
				this.loading=false;
			}
		}, 
	

		async deleteItem(){
			try{
				this.loading=true;
				if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {	
					if (this.infoItem && this.infoItem.id) {
						const service = new CurrentAdministratorService();
						const res = await service.deleteInfo(this.infoItem);
						if (res) {
							if (res.error) {
								this.$EventBus.$emit("notifications",{
									type 	: "warning",
									msg : this.$Helper.renderErrorMessage(res.error, " Error Eliminando Convenio")
								})
							}else if (res.data) {
								this.total --;
								this.list.splice(this.list.indexOf(this.infoItem), 1);
								this.infoItem = null;
								this.$EventBus.$emit("notifications",{
									type  : "success",
									msg   : "Convenio Eliminado"
								});

							}
						}
					}						
				}
			}catch(error){
				this.$EventBus.$emit("notifications",{
					type 	: "error",
					msg : this.$Helper.renderErrorMessage(error, " Eliminando Convenion")
				})
			}finally{
				this.loading=false;
			}
		}, // del
	}
};
</script>