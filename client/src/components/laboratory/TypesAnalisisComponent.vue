<template>
	<v-data-table
        fixed-header
        class    = "elevation-5"
        :headers = "headers"
        :items   = "listRender"
        :loading = "loading"
        loading-text 		= "Cargando... por favor espere"
	    :height 			= "(currentHeight-150)+'px'"
	    :footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [30],
	   		showCurrentPage     : true
	   	}"

    >
        <template v-slot:top>
        	<v-toolbar >
        	<v-text-field 
        		outlined 
        		dense  
        		hide-details 
        		v-model="search" 
        		label="BUSCAR" 
        		prepend-inner-icon= "mdi-magnify" 
        		class="mt-1" 
        		@keyup.enter="searchFormula()"
        		@input="v=> search = v.toUpperCase()"
        	></v-text-field>
        	<v-divider
	          	class="mx-4 mt-2"
	          	inset
	          	vertical
	        ></v-divider>
	        <v-spacer></v-spacer>
	        <v-btn  color="primary" @click="redirectToNew()" v-show="currentPermission.canAdd"><v-icon small class="mr-1">mdi-book-plus</v-icon> Nuevo </v-btn>
	    	</v-toolbar>
        </template>
        <template v-slot:item.actions="{item}">
        	<v-btn-toggle mandatory>
	        	<v-btn small color="primary" @click="redirect(item)" v-if="item && item.CupsListId" v-show="currentPermission.canEdit">  
	        		<v-icon small>mdi-format-list-group</v-icon></v-btn>        	
	        	<v-btn small color="error" @click="deleteItem(item)" v-show="currentPermission.canDelete">  
	        		<v-icon small>mdi-delete</v-icon></v-btn>        	
        	</v-btn-toggle>
        </template>
    </v-data-table>
</template>
<script type="text/javascript">
	
	import TypeAnalysisLaboratoryService from "@/services/TypeAnalysisLaboratoryService.js"


	export default{
		name : "TypesAnalisisComponent",
		props : ["currentHeight"],
		data : ()=>({
			search : "",			
			loading : false,
			list : [],
			infoItem : null,
			headers : [
				{ text : "Codigo", value : "CupsList.code" },
				{ text : "Descripcion", value : "CupsList.description" },
				{ text : "Acciones", value : "actions" },
			]
		}),
		mounted(){
			this.getList();
		},
		computed:{
			listRender(){				
				return this.list.filter((x)=> x && x.CupsList && (x.CupsList.code.includes(this.search) || x.CupsList.description.toLowerCase().includes(this.search.toLowerCase())));
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("LaboratoryFormatsComponent") // this.$route.name
			},
		},
		methods:{
			searchFormula(){

			},
			deleteItem(item){
				this.infoItem = item;
				this.$EventBus.$emit("notifications",{
					type : "confirm_delete",
					ID : "TypeAnalisisComp",
					action : this.deleteOfList,
				})				
			},
			redirectToNew(){
				if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
					this.$router.push({ 
						name 	: "DashboardSettingsAnalisis",					
						params 	: {										
							id : 0,
							option 	 : "new"		
						}
					});
				}
			},
			redirect(item){
				if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
					if (item && item.CupsList) {

						this.$router.push({ 
							name 	: "DashboardSettingsAnalisis",
							params 	: {
								id 		 : item.CupsList.id,				
								option 	 : "update"		
							}
						});			
					}else{
						console.warn("No found id of cup");
					}
				}
			},
			async getList(){
				try{
					this.loading = true;
					const service = new TypeAnalysisLaboratoryService();
					const res = await service.getAnalysisLaboratory();
					if (res && res.data && res.data.length > 0) {
						this.list = res.data;
					}
					// console.log("res TypesAnalisisComponent ", res )
				}catch(error){
					console.warn("Error get analysis laboratory ", error)
				}
				this.loading = false;
			},
			async deleteOfList(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {					

						if (this.infoItem) {						
							const service = new TypeAnalysisLaboratoryService();
							const res = await service.deleteTypeAnalysis({id: this.infoItem.id});
							if (res && !res.error ) {			
								const idx = this.list.findIndex( x => x && x.id == this.infoItem.id);
								if (idx >= 0 ) {
									this.list.splice(idx,1);
									this.$EventBus.$emit("notifications",{
										type : "deleted",
										msg : "Tipo de analisis"
									});
								}
							}else{
								this.$EventBus.$emit("notifications",{
									type : "error",
									msg : "Eliminando tipo de analisis"
								});	
							}
						}
					}
				}catch(error){
					console.warn("Error delete type analysis ", error);
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg : "Eliminando tipo de analisis"
					});	

				}
				this.loading = false;
				this.infoItem = null;
			}
		},
	}
</script>