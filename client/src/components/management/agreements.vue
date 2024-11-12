<template>
	<v-data-table
		dense
	    :headers 			 = "headers"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5"			    
	    :hide-default-footer = "height < 56 ?  true : false"
	   	:options.sync 		 = "options"
	   	:server-items-length = "total"
	   	:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [15, 30],
	   		showCurrentPage     : true
	   	}"
	   	loading-text 		= "Loading... Please wait"
	    :height 			= "height + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    fixed-header
	>
		<template v-slot:top >
			<v-container fluid>			
				<v-btn color="primary" @click="openModal(false)">Agregar Convenio</v-btn>			
				<v-dialog width="500" v-model = "isModal" persistent>
					<v-card>
						<v-card-title class="primary subtitle-2 pa-1 white--text">
							<v-icon small class="mr-2" color="white">mdi-handshake</v-icon>
							<span>{{infoItem? "EDITAR" : "AGREGAR" }}</span>
							<v-spacer></v-spacer>
							<v-btn small icon class="error" @click="closeModal(false)"><v-icon color="white" small>mdi-close</v-icon></v-btn>
						</v-card-title>
						<v-card-text class="pa-0">					
							<SubAgreement :infoToComponent="infoItem" @receiveInfo="closeModal(false)" :listToComponent="list" :currentPermission="currentPermission"></SubAgreement>
						</v-card-text>
					</v-card>
				</v-dialog>
			</v-container>
		</template>

		<template
			v-for 			= "head of headers"
			:slot	 		= "`header.${head.value}`" 
 			slot-scope 		= "{header}"
		>			
			<span class="text-uppercase">					
				{{ $t(head.text) }} 
			</span>
			
		</template>
		<template v-slot:actions = "{ item, index}">
			<v-btn-toggle mandatory dark>					
				<v-btn x-small @click="openModal(item)" v-show  = "currentPermission.canEdit" color="primary" class="white--text">
					<v-icon small color="white" >mdi-pencil</v-icon>
				</v-btn>
			</v-btn-toggle>
		</template>
	</v-data-table>

</template>
<script type="text/javascript" >
	// src = "./js/agreements.js"
	import AgreementService from "@/services/AgreementService.js"	
	import SubAgreement from "@/components/management/SubAgreementComponent.vue"
	export default {
		name 		: "AgreementsComponent",
		components	: {
			SubAgreement
		},
		data : (vm)=> ({
			list 			: [],
			search 			: [],
			info 			: {},
			infoItem 		: null,
			ref 			: "agreements",
			headers 		: [
				{ text : "numberAgreement", value : "numberAgreement" },			
				{ text : "name", value : "name" },							
				{ text : "tariffManualType", value : "tariffManualType" },
				{ text : "startDate", value : "startDate" },			
				{ text : "finalDate", value : "finalDate" },			
				{ text : "administrator", value : "administrator" },
				{ text : "percent", value : "percent" },
				// { text : "state", value : "state" },

				{ text : "actions", value : "actions" },
			],
			loading 		: false,
			show 			: {},
			options 		: { itemsPerPage : 50 },
			total 			: 0,
			height 			: 400,			 
			isModal 			: false,
	

		}), // data

		created(){
			this.height = this.$vuetify.breakpoint.height - 150 ;
		}, // created

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
				this.total=this.list.length;
				return this.list;
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("CentersComponent") 
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
					ID   : this.ref,
					action : this.deleteItem
				})					
				this.infoItem = {...item};
			},
			
			setInfoItemDefault(){
				this.infoitem = null;
			}, // setInfoItemDefault

			async getList(){
				try{
					this.loading=true;
					const service = new AgreementService();
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
							const service = new AgreementService();
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
	}, // methods	
};		
</script>