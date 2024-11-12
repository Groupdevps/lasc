<template>
	<v-data-table					
	 	dense
	    fixed-header
		:headers 			 = "headers"
	 	:items 	 			 = "listToComponent"
	    class 	 			 = "elevation-5"	
	    :loading 			 = "loading"		  							   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,
	   		itemsPerPageOptions : [30],
	   		showCurrentPage     : false
	   	}"
	   	loading-text 		= "Loading... Please wait"
	    :height 			= "150"
	    item-key 			= "index"
	>
		<template v-slot:top>						
			<CategoryComponent startCategory="DIAGNOSTICOS" :inputField="searchInput" keyField="diagnose" :isDisabledCategory="true" :isWithExt="true">
				<template v-slot:col-prepend>					
					<v-card outlined class="pa-0 ma-0 pl-1">								   
					    <v-radio-group
					    	dense
					    	class="ma-0 pa-0 my-2 pl-1"
					      	v-model="inputField[keyExt]"
					    	label="CONFIRMADO"
					    	:row="true"  
					    	hide-details
					    >
					      <v-radio
					        label="Nuevo"
					        :value="false"
					      ></v-radio>
					      <v-radio
					        label="Repetido"
					        :value="true"
					      ></v-radio>
					    </v-radio-group>
					</v-card>	
				</template>
			</CategoryComponent>
		</template>
		<template v-slot:item.repeated="{item}">
			<span>
				{{item.repeated ? "REPETIDO" : "NUEVO"}}
			</span>
		</template>
		<template v-slot:item.actions="{item}">
			<V-btn
				small									
				color="error"
				@click="confirmDelete(item, index)"
				v-show="isConfirmDelete"
			>
				<v-icon small color="white">mdi-delete</v-icon>
			</V-btn>
		</template>
	</v-data-table>
</template>
<script type="text/javascript">
	import CategoryComponent from "@/components/info/SearcherCategoryComponent.vue"

	export default{
		name: "TableSubDiagnosticListComponent",
		components:{CategoryComponent},
		props:["listToComponent", "isConfirmDelete", "inputField", "keyExt"],
		data : ()=>({
			infoItem:null,			
			loading: false,
			searchInput 	: { diagnose : null},
			headers : [
				{ text : "CODIGO", value : "code" },
				{ text : "DIAGNOSTICO", value : "diagnosis" },
				{ text : "CONFIRMADO", value : "repeated" },			

				{ text : "ACCIONES", value : "actions" },
			]
		}),
		watch:{
			"searchInput.diagnose"(val){
				this.renderCategory(val);				
			},
		},
		methods:{
			renderCategory(item){
				if(item){					
					this.listToComponent.push({
						code: item.code,
						diagnosis: item.description,
						[this.keyExt] : this.inputField[this.keyExt],
					})									
					this.$nextTick(()=>{
						this.searchInput.diagnose= null;
					})
				}
			},
			confirmDelete(item){
				this.infoItem=item;
				this.$EventBus.$emit("notifications",{
					type: "confirm_delete",
					ID: "DiagnosctiTable",
					action : this.deleteItem
				})
			},
			async deleteItem(){
				try{
					this.loading=true;
					if (this.infoItem && this.infoItem.id) {
						this.$store.dispatch("listDiagnostic/deleteSubDiagnostic", { id : this.infoItem.id}).then(res=>{
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{type:"warning", msg :this.$Helper.renderErrorMessage(res.error,"Error Eliminando Diagnostico")})
								}else if(res.data){
									const idx=this.listToComponent.indexOf(this.infoItem);
									if (idx>=0) {
										this.listToComponent.splce(idx,1)
										this.$EventBus.$emit("notifications",{type:"success", msg: "Diagnostico Eliminado"})
									}
								}
							}
						}).catch(error=> {
							this.$EventBus.$emit("notifications",{type:"error", msg :this.$Helper.renderErrorMessage(error,"Eliminando Diagnostico")})

						})
					}else{
						const idx=this.listToComponent.indexOf(this.infoItem);
						if (idx>=0) {
							this.listToComponent.splce(idx,1)
							this.$EventBus.$emit("notifications",{type:"success", msg: "Diagnostico Eliminado"})
						}
					}
				}catch(error){
					console.warn("Error delete sub diagnostic ", error)
					this.$EventBus.$emit("notifications",{type:"error", msg :this.$Helper.renderErrorMessage(error,"Eliminando Diagnostico")})

				}finally{
					this.loading=false;
					this.infoItem=null;
				}
			}
		}, // methods

	}
</script>