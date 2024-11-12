<template>
	<v-data-table
		dense
	    :headers 			 = "headers"
	 	:items 	 			 = "listRender"
	    class 	 			 = "elevation-5"			    	   	   		  
	   	loading-text 		= "CARGANDO... POR FAVOR ESPERE"
	    :height 			= "(currentHeight - 100) + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	   	:server-items-length = "listRender.length"	   	      	
	    fixed-header
	    hide-default-footer

	>
		<template v-slot:top>
			<v-container fluid>
				<v-row dense>
					<v-col cols="12">
						<strong> PERMISOS
							<v-divider
								class = "pa-0 ma-0 primary"
								:inset = "true"
							></v-divider>
						</strong>
					</v-col>
					<v-col cols="6">
						<v-select
							dense
							outlined
							clearable
							return-object
							v-model="info.TypeResource"
							:items="listTypesResources"
							label="MODULO"
							item-text="name"
							item-value="id"		
							:loading = "loadingTypeResource"
						></v-select>
					</v-col>					
					<v-col cols="12">
						<!-- v-show="showAddPermissions && isActive" -->
						<SubPermissions 
							:typeResource="info.TypeResource" 
							:listField="listRender" 
							:currentHeight="200"
							:infoRoleId="inputField.id"
							:isActiveComponent = "showAddPermissions && isActive"
							@closeSubPermissions="renderCloseSubPermissions($event)"							
							:currentPermission="currentPermission"
						></SubPermissions>							
					</v-col>
					<v-col cols="12">
						<v-checkbox 
							dense 
							hide-details 
							v-model="selectionAllRows" 
							@change="selectAllRows" 
							label="Activar Todos los Permisos " 
							:disabled = "!currentPermission.canEdit"  
						></v-checkbox>
					</v-col>
				</v-row>
			</v-container>
		</template>
		
		<template v-slot:header.canView="{header}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="selectionColumn.canView"              	
              	color="primary"              	              	
              	@click="selectColumn('canView')"
              	label = "VER"
              	:disabled = "!currentPermission.canEdit"              	
            ></v-checkbox>
		</template>
		<template v-slot:header.canAdd="{header}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="selectionColumn.canAdd"              	
              	color="primary"              	              	
              	@click="selectColumn('canAdd')"
              	label = "CREAR"
              	:disabled = "!currentPermission.canEdit"

            ></v-checkbox>
		</template>
		<template v-slot:header.canEdit="{header}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="selectionColumn.canEdit"              	
              	color="primary"              	              	
              	@click="selectColumn('canEdit')"
              	label = "EDITAR"
              	:disabled = "!currentPermission.canEdit"
            ></v-checkbox>
		</template>
		<template v-slot:header.canDelete="{header}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="selectionColumn.canDelete"              	
              	color="primary"              	              	
              	@click="selectColumn('canDelete')"
              	label = "ELIMINAR"
              	:disabled = "!currentPermission.canEdit"
            ></v-checkbox>
		</template>
		<template v-slot:item.canView="{item}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="item.canView"              	
              	color="primary"              	
              	:loading= "item.loading"
              	@click="updatePermission(item, 'Ver')"
              	:disabled = "!currentPermission.canEdit"
            ></v-checkbox>
		</template>
      	<template v-slot:item.canAdd="{item}">
			<v-checkbox
              	dense
              	hide-details 
              	v-model="item.canAdd"              	
              	color="primary" 
              	:loading= "item.loading"
              	@click="updatePermission(item, 'Crear')"             	
              	:disabled = "!currentPermission.canEdit"
            ></v-checkbox>
		</template>
		<template v-slot:item.canEdit="{item}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="item.canEdit"              	
              	color="primary"              
              	:loading= "item.loading"
              	@click="updatePermission(item, 'Editar')"	
              	:disabled = "!currentPermission.canEdit"
            ></v-checkbox>
		</template>
		<template v-slot:item.canDelete="{item}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="item.canDelete"              	
              	color="primary"              	
              	:disabled = "!currentPermission.canEdit"
              	:loading= "item.loading"
              	@click="updatePermission(item, 'Eliminar')"
            ></v-checkbox>
		</template>
		<template v-slot:item.actions="{item}">
			<v-btn-toggle mandatory>
				<!-- <v-btn color="primary" x-small @click="openModal(item)"> <v-icon color="white" x-small>mdi-pencil</v-icon></v-btn> -->
				<!-- <v-btn color="error" x-small @click="confirmDelete(item)"> <v-icon x-small>mdi-delete</v-icon></v-btn> -->
			</v-btn-toggle>
		</template>
	</v-data-table>
</template>
<script type="text/javascript">
	import SubPermissions from "@/components/users/SubPermissionsComponent.vue"
	import PermissionsService from "@/services/PermissionsService.js"
	import TypeResourceService from "@/services/TypeResourceService.js" 

	export default{
		name : "PermissionsComponent",
		props : ["inputField", "keyField", "currentHeight", "isActive", "currentPermission"],
		components: { SubPermissions },
		data : (vm)=>({
			list :  [],
			info : { },
			headers :[
				{ text : "MODULO", value: "Resource.TypeResource.name" },
				{ text : "PERMISO", value: "Resource.name" },
				{ text : "VER", value: "canView" },
				{ text : "CREAR", value: "canAdd" },
				{ text : "EDITAR", value: "canEdit" },
				{ text : "BORRAR", value: "canDelete" },
				// { text : "ACCIONES", value: "actions" },
			],
			selectionAllRows : false,
			selectionColumn : {canAdd: false, canView: false, canEdit:false, canDelete :false},
			infoItem : null,
			loading  : false,
			showField : false,
			listTypesResources : [],
			loadingTypeResource : false,
			showAddPermissions : false,
		}),
	
		mounted(){
			this.getListTypePermission();
		},
		computed:{
			listRender(){
				let listTemp = this.inputField[this.keyField] || this.list;
				if (this.info.TypeResource) {
					listTemp = listTemp.filter(x=> x.Resource.TypeResourceId == this.info.TypeResource.id);					
					if (listTemp.length > 0 ) {
						this.showAddPermissions = false;
					}else{
						this.showAddPermissions = true;						
					}
				}
				return listTemp;
			}
		},
		methods : {		
			async selectAllRows() {
		      	try{
		      		this.loading = true;			      				
		      		if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {	      
				      	this.listRender.forEach(async(item, idx)=>{
					      	if (item.id) {
								let { canView, canAdd, canEdit, canDelete }= item;			      			
								if ((canView != this.selectionAllRows && canAdd!=this.selectionAllRows && canEdit != this.selectionAllRows && canDelete != this.selectionAllRows)){
									item.canView = this.selectionAllRows;
									item.canAdd = this.selectionAllRows;
									item.canEdit = this.selectionAllRows;
									item.canDelete = this.selectionAllRows;			      				
									
									const service = new PermissionsService();
									const res = await service.updateInfo(item);
								}
								
							}
							if (idx == this.listRender.length -1) {
			      				this.loading = false;
				      			
							}
				      	})
				    }
		      	}catch(error){
		      		console.warn("Error updating all permissions ", error)
		      		this.loading = false;
					this.$EventBus.$emit("notifications", { type : "error" , msg : this.$Helper.renderErrorMessage(error, "Actualizando Permisos")});
		      	}
		    },
		   	async selectColumn(column) {		      	
		      	try{
		      		this.loading = true;
		      		if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {	      

				      	this.listRender.forEach(async(item, idx)=>{
					      	if (item.id) {		      			
								if (item[column] != this.selectionColumn[column]){
									item[column] = this.selectionColumn[column];								
				      				
									const service = new PermissionsService();
									const res = await service.updateInfo(item);
								}
								
							}
							if (idx == this.listRender.length-1) {
			      				this.loading = false;			      		
							}
				      	})
				    }
		      	}catch(error){
		      		console.warn("Error updating column permissions ", error)
		      		this.loading = false;
					this.$EventBus.$emit("notifications", { type : "error" , msg : this.$Helper.renderErrorMessage(error, "Actualizando Permisos")});

		      	}
		    },			
			renderCloseSubPermissions(items){
				this.info.TypeResource = null;
				this.showAddPermissions = false;
				if (this.inputField && this.keyField && this.inputField[this.keyField]) {
					this.inputField[this.keyField] = this.inputField[this.keyField].concat(items);
				}else{
					this.list = this.list.concat(items);
				}
			},
			async getListTypePermission(){
				try{
					this.loadingTypeResource = true;
					const service = new TypeResourceService();
					const res = await service.getInfo();	
					if (res && res.data && res.data.length > 0 ) {
						this.listTypesResources = res.data;
					}
				}catch(error){
					console.warn("Error get Type resource ", error)
				}finally{
					this.loadingTypeResource = false;

				}
			},
			async updatePermission(item, namePermission){
				try{
					item.loading = true;
		      		if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {	      

						if (item.id) {
							const service = new PermissionsService();
							const res = await service.updateInfo(item);
							if (res && res.error) {
							    this.$EventBus.$emit("notifications", { type : "warning" , msg : this.$Helper.renderErrorMessage(res.error, "Error Actualizando Permiso")});
							}else
							if (res && res.data) {							
								this.$EventBus.$emit("notifications", {type : "success", msg : `Permiso de ${namePermission} en ${item.Resource.name}, Actualizado`})
							}
						}else{
							this.$EventBus.$emit("notifications", {type : "success", msg : `Permiso de ${namePermission} en ${item.Resource.name}, Actualizado`})
						}
					}
				}catch(error){
					console.warn("Error update permission ", error);
					this.$EventBus.$emit("notifications", { type : "error" , msg : this.$Helper.renderErrorMessage(error, "Actualizando Permiso")});
				}finally{
					item.loading = false;
				}

			}
		}, // methods
	};
</script>