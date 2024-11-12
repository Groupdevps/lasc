<template>
	<v-data-table
		dense
		fixed-header
		:height = "(currentHeight-(isForm?285:120))+'px'"
      	:headers="headers"
      	:items="renderList"
      	:loading = "loading"
      	item-key="id"
      	class="elevation-1"
      	:options.sync 		 = "options"
	   	:server-items-length = "total"
		:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [30],
	   		showCurrentPage     : true
	   	}"
      	
    >      	
      	<template v-slot:top>
      		<v-toolbar
		        flat
		    >
	        	<v-text-field
	        		dense
	        		outlined
		          	v-model="search"
		          	label="BUSCAR CUP"
		          	class="mx-4 mt-6"
		          	@input="v => search = v.toUpperCase()"
		          	@keyup.enter="getList"
	        	></v-text-field>
	        	<v-btn color="primary" dark  @click="getList" >              		
              		Buscar 
            	</v-btn>
	        	<v-divider
		          	class="mx-4"
		          	inset
		          	vertical
		        ></v-divider>
		        <div>
		        	
			        <MenuUvtComponent		        	
			          	class="mx-4 mt-5"		          	
			        	:inputField = "info"
						keyField="uvt"
						:isReturnObject = "true"
						:isHideDetails="true"
						:isPersistentHint="true"
            			:currentPermission="currentPermission"
			        ></MenuUvtComponent>
		        </div>
		        <v-spacer></v-spacer>
            	<v-btn :color="!isForm? 'primary': 'warning'" dark  @click="isForm = !isForm" v-show="currentPermission.canAdd">
              		<v-icon small class="mr-1"> {{!isForm ? 'mdi-plus-box' : 'mdi-close-box'}}</v-icon>
              		{{ !isForm ? 'Agregar' : 'Cerrar' }} 
            	</v-btn>
		       	<!-- <v-btn color="error" class="ml-1" dark  @click="openPdf()">
              		<v-icon small class="mr-1">mdi-download</v-icon>
              		PDF 
            	</v-btn> -->
		          
		    </v-toolbar>
            <SubConceptComponent 
            	v-show="isForm" 
            	@CloseForm="closeForm()" 
            	:infoEdit="infoItem" 
            	:listToComponent="list" 
            	:currentPermission="currentPermission"
            ></SubConceptComponent>
      	</template>      
      	
      	<template v-slot:item.date="{item}">
      		{{ $ManagerSmith.getDateCurrentHour(item.createdAt) }}
      	</template>
      	<template v-slot:item.value_iss="{item}">
      		${{ item.value_iss }}
      	</template>
		<template v-slot:item.value_soat="{item}">
			${{ item.value_soat }}
		</template>
      	<template v-slot:item.actions="{item}">
      		<v-btn-toggle mandatory>
      			<!-- <v-btn x-small color="error" @click="openPdfDispatch(item)" v-if="item && item.id"><v-icon small>mdi-download</v-icon> PDF</v-btn> -->
      			<!-- <v-btn x-small color="primary" @click="confirmEdit(item)"><v-icon small>mdi-pencil</v-icon></v-btn> -->
      			<!-- <v-btn x-small color="error" @click="confirmDelete(item)"><v-icon small>mdi-delete</v-icon></v-btn> -->
      			<v-tooltip bottom>
      				<template v-slot:activator="{on, attrs}">      					
      					<v-btn dark x-small color="secondary" v-on="on" :v-bind="attrs" @click="confirmDisabled(item)" v-show="currentPermission.canEdit"><v-icon small color="white">mdi-cancel</v-icon></v-btn>
      				</template>
      				<span> Deshabilitar</span>
      			</v-tooltip>
      		</v-btn-toggle>
      	</template>
    </v-data-table>
</template>

<script type 	= "text/javascript">
	
	
import ConceptService from "@/services/ConceptService.js"
import SubConceptComponent from "@/components/biller/SubConceptComponent.vue"
import MenuUvtComponent from "@/components/biller/MenuUvtComponent.vue"
export default {
	name 		: "ConceptsComponent",
	props :["currentHeight"],
	components 	: { SubConceptComponent, MenuUvtComponent },
	data 	: (vm) => ({
		loading : false,
		infoItem:null,
		info : { uvt : null},
		list : [],
		search : "",
		isForm : false,
		total : 0,
		options : { itemsPerPage:30},
		headers 		: [
			{ text : "CUP" , value: "code_cup"}, // input | output
			{ text : "DESCRIPCION", value  : "description_cup" },
			{ text : "CODIGO ISS" , value: "code_iss"},
			{ text : "ISS", value   : "value_iss" },			
			{ text : "CODIGO SOAT" , value: "code_soat"},
			{ text : "SOAT", value   : "value_soat" },			
			{ text : "ACCIONES", value 	: "actions" },
		],
	}), // data
		watch:{
			options: {
				handler(){
					this.getList();
				}, deep : true				
			}
		},
		computed:{	
			renderList(){				
				return this.search ? this.list.filter(x => x && ((x.code_cup && x.code_cup.toLowerCase().includes(this.search.toLowerCase())) || (x.description_cup && x.description_cup.toLowerCase().includes(this.search.toLowerCase())))) : this.list;
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("ConceptsComponent"); // 
			}
		},
		methods:{
			closeForm(){
				this.isForm = false;
			},
			confirmEdit(item){
				this.infoItem = {...item}
				this.isForm = true;
			},
			confirmDelete(item){
				this.infoItem = {...item}
				this.$EventBus.$emit("notifications",{
					type :  "confirm_delete",
					action : this.deleteItem,
					ID : "ConceptsComponent", 
				})
			},
			confirmDisabled(item){
				this.infoItem = {...item}
				this.$EventBus.$emit("notifications",{
					type :  "confirm_action",
					action : this.disabledItem,
					ID : "ConceptsComponent", 
				})
			},
			async getList(){
				try{
					const { page, itemsPerPage }  = this.options;					
					this.loading = true;
					const service = new ConceptService();
					const res = await service.findInfo({page, limit: itemsPerPage, search: this.search });//{  page, itemsPerPage , name : this.search}

					if (res && res.data) {
						this.total=res.data?.total || 0;
						if (res.data.rows.length > 0) {
							this.list=res.data.rows;
						}else{
							this.list=[];
						}
						// this.total = res.data.totalItems;
					}

				}catch(error){
					console.warn("Error get concept ", error)
				}finally{
					this.loading = false;
				}
			},
			async deleteItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canDelete")) {
						const service = new ConceptService();
						const res = await service.deleteInfo(this.infoItem);
						if (res && res.error) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Eliminando Concepto")});
						}else
						if (res && res.data) {
							const idx = this.list.findIndex(x => x.id == this.infoItem.id)
							if (idx >= 0) {
								this.list.splice(idx, 1);
								this.$EventBus.$emit("notifications",{
									type : "success",
									msg : "Concepto Eliminado"
								})
							}
						}
					}
				}catch(error){
					console.warn("Error delete ITem ", error)
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg :  this.$Helper.renderErrorMessage(error, "Eliminando Concepto")
					})
				}finally{
					this.loading = false;
				}
			},
			async disabledItem(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
						const service = new ConceptService();
						this.infoItem.isActive = false;
						const res = await service.updateInfo(this.infoItem);
						if (res && res.error) {
							this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Deshabilitando Concepto")});
						}else
						if (res && res.data) {
							const idx = this.list.findIndex(x => x.id == this.infoItem.id)
							if (idx >= 0) {
								this.list.splice(idx, 1, this.infoItem);
								this.$EventBus.$emit("notifications",{
									type : "success",
									msg : "Concepto Deshabilitado"
								})
							}
						}
					}
				}catch(error){
					console.warn("Error disabled ITem ", error)
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg :  this.$Helper.renderErrorMessage(error, "Deshabilitando Concepto")
					})
				}finally{
					this.loading = false;
				}
			},
			openPdf(){
				try{
					this.loading = true;				
					const service = new ConceptService();
					this.$Helper.openLink(service.linkPdf()); // this.$route.params.id
				}catch(error){
					console.warn("Error open pdf ", error )
				}finally{
					this.loading=false;
				}
			},
			
		},// methods
}; // export default	
</script>