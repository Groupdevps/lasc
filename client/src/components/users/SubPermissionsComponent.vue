<template>
	<v-data-table
		dense
	    :headers 			 = "headers"
	 	:items 	 			 = "listRender"
	    class 	 			 = "elevation-5"			    	   	   	
	   	hide-default-footer
	   	loading-text 		= "CARGANDO... POR FAVOR ESPERE"
	    :height 			= "currentHeight + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    fixed-header
	    v-show 				= "isShowTable"
	>
		<template v-slot:top>
			<v-checkbox dense hide-details  v-model="selectionAllRows" @change="selectAllRows" label="Activar Todos los Permisos " :disabled = "!currentPermission.canAdd" ></v-checkbox>
		</template>
		<template v-slot:header.canView="{header}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="selectionColumn.canView"              	
              	color="primary"              	              	
              	@click="selectColumn('canView')"
              	label = "VER"
              	:disabled = "!currentPermission.canAdd"
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
              	:disabled = "!currentPermission.canAdd"
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
              	:disabled = "!currentPermission.canAdd"
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
              	:disabled = "!currentPermission.canAdd"
            ></v-checkbox>
		</template>

		<template v-slot:item.canView="{item}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="item.canView"              	
              	color="primary"              	
              	:disabled = "!currentPermission.canAdd"
            ></v-checkbox>
		</template>
      	<template v-slot:item.canAdd="{item}">
			<v-checkbox
              	dense
              	hide-details 
              	v-model="item.canAdd"              	
              	color="primary"              	
              	:disabled = "!currentPermission.canAdd"
            ></v-checkbox>
		</template>
		<template v-slot:item.canEdit="{item}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="item.canEdit"              	
              	color="primary"              	
              	:disabled = "!currentPermission.canAdd"
            ></v-checkbox>
		</template>
		<template v-slot:item.canDelete="{item}">
			<v-checkbox
              	dense
              	hide-details
              	v-model="item.canDelete"              	
              	color="primary"              	
              	:disabled = "!currentPermission.canAdd"
            ></v-checkbox>
		</template>
		<template v-slot:footer>
			<v-divider></v-divider>
			<div class="d-flex justify-end pa-1">				
				<v-btn small color="success" @click="addToList()">AGREGAR PERMISOS</v-btn>
			</div>
		</template>
		<!-- no-results -->
		<template v-slot:no-data> 
	        {{ msgNoData ? msgNoData :  'NO SE ENCONTRARON RESULTADOS!'}}
	    </template>
	</v-data-table>
</template>
<script type="text/javascript">
	import ResourceService from "@/services/ResourceService.js"
	import PermissionsService from "@/services/PermissionsService.js"
	
	export default{
		name : "PermissionsComponent",
		props : ["listField",  "currentHeight" , "typeResource", "infoRoleId", "isActiveComponent", "currentPermission"],
		components: {  },
		data : (vm)=>({
			list : [],
			headers :[
				{ text : "PERMISO", value: "Resource.name"},				
				{ text : "VER", value: "canView" },
				{ text : "CREAR", value: "canAdd" },
				{ text : "EDITAR", value: "canEdit" },
				{ text : "BORRAR", value: "canDelete" },
				
			],
			infoItem : null,
			loading  : false,
			showField : false,
			msgNoData : "",
			selectionAllRows : false,
			selectionColumn : {canAdd: false, canView: false, canEdit:false, canDelete :false},		
			isShowTable : false,	
		}),
		watch:{
			typeResource(val){
				if (val && val.id && this.isActiveComponent) {					
					if (this.listField && this.listField.length > 0) {
						this.msgNoData = "ESTOS DATOS YA EXISTEN!"
						this.isShowTable=false;						
					}else{
						this.isShowTable=true;
						this.getResourcesById({ module : val.id}, [])
					}
				}else if (val && val.id && !this.isActiveComponent) {
					this.getResourcesById({ module : val.id}, this.listField)
				}else{
					this.isShowTable = false;
					this.list = [];
				}
			}
		},
		computed:{
			listRender(){
				return this.list;
			}
		},
		methods : {
			async selectAllRows() {
		      	try{
		      		this.loading = true;		
		      		if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
				      	this.listRender.forEach(async(item, idx)=>{
							let { canView, canAdd, canEdit, canDelete }= item;			      			
							if ((canView != this.selectionAllRows && canAdd!=this.selectionAllRows && canEdit != this.selectionAllRows && canDelete != this.selectionAllRows)){
								item.canView = this.selectionAllRows;
								item.canAdd = this.selectionAllRows;
								item.canEdit = this.selectionAllRows;
								item.canDelete = this.selectionAllRows;			      				
								
							}							
							if (idx == this.listRender.length -1) {
			      				this.loading = false;
				      			
							}
				      	})
				    }
		      	}catch(error){
		      		this.loading = false;
		      		console.warn("Error updating all permissions ", error)
					this.$EventBus.$emit("notifications", { type : "error" , msg : this.$Helper.renderErrorMessage(error, "Guardando Permisos")});
		      	}
		    },
		   	async selectColumn(column) {		      	
		      	try{
		      		this.loading = true;
		      		if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {

				      	this.listRender.forEach(async(item, idx)=>{
							if (item[column] != this.selectionColumn[column]){
								item[column] = this.selectionColumn[column];
							}
								
							if (idx == this.listRender.length-1) {
			      				this.loading = false;			      		
							}
				      	})
				    }
		      	}catch(error){
		      		this.loading = false;
		      		console.warn("Error updating column permissions ", error)
					this.$EventBus.$emit("notifications", { type : "error" , msg : this.$Helper.renderErrorMessage(error, "Guardando Permisos")});
		      	}
		    },	
			async getResourcesById(params, listField){
				try{
					this.loading = true;
					const service = new ResourceService();
					const res  = await service.getInfo(params);					
					if (res && res.data && res.data.length > 0) {						 						
						let tempList = res.data.map(x=>{							
							return {
								ResourceId : x.id,
								Resource : { name : x.name, TypeResourceId : params.module, TypeResource : { name : this.typeResource.name }},								
								name : x.name,
								canView : false,
								canAdd : false,
								canEdit : false,
								canDelete : false,
							}
						});			
						if (listField && listField.length > 0) {
							tempList = tempList.filter(x=> !listField.some(z=> z.ResourceId == x.ResourceId))
							if (tempList.length > 0) {
								this.isShowTable=true;
							}else{
								this.isShowTable=false;								
							}
						}	
						this.list=tempList; 		
					}else{
						this.list = [];
					}
				}catch(error){
					console.warn("Error get getResource Id " , error)
				}finally{
					this.loading = false;
				}
			},
			async savePemission(params, list){
				try{
					this.loading = true;
					const service = new PermissionsService();
					const res = await service.saveInfo(params);
						
					if (res && res.data) {
						list.push({id: res.data.id, ...params})	
						return res.data;					
					}
				}catch(error){
					console.warn(" Error create permsision ", error)
					return null;
				}finally{
					this.loading = false;
				}

			},
			async addToList(){					
				if (this.infoRoleId) {
					try{
		      			if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
							let tempList = [];	
							const promesas = this.list.map((it)=> this.savePemission({...it, RoleId : this.infoRoleId},tempList))
							Promise.all(promesas).then(() => {
								this.$emit("closeSubPermissions", [...tempList]);							
								this.list = [];
							}).catch(error => {									
								console.error('error create list permissions : ', error);    
								this.$EventBus.$emit("notifications", { type : "error" , msg : this.$Helper.renderErrorMessage(error, "Guardando Permisos")});

	    					});
						}
					}catch(error){
						console.warn("Error add list Permissions ", error)
						this.$EventBus.$emit("notifications", { type : "error" , msg : this.$Helper.renderErrorMessage(error, "Guardando Permisos")});
					}
				}else{

					this.$emit("closeSubPermissions", [...this.list]);
					this.list = [];
				}
			}

		}, // methods
	};
</script>