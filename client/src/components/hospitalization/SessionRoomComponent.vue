<template>
    <v-card outlined>
    	<!-- <v-card-title></v-card-title> -->
    	<v-card-text class="pa-1">
    		<v-toolbar height="30">	    			
	    		<v-icon class="mr-1">mdi-home-account</v-icon>
	    		<strong> Habitaciones </strong>	# {{ renderList.length }}     		
	    		<v-spacer></v-spacer>
	    		<v-btn x-small v-show="isEditable" @click="addItem()" :color="isEditing ? 'error' : 'primary'"> {{isEditing ? 'Cancelar': 'Agregar'}}</v-btn>
    		</v-toolbar>
    		<v-row dense
    			:style = "`overflow-y : auto; overflow-x : hidden; max-height:  300px;`"
    		>
    			<v-col cols="12" v-show="isEditing">
    				<SessionFields v-model="info" :fields="fields" reference="FieldRoom" class="mt-2">
    					<template v-slot:field-RoomTypeId="{itemField}">
    						<MenuRoomType :inputField="info" keyField="RoomTypeId" :currentPermission="currentPermission"></MenuRoomType>
    					</template>
    					<template v-slot:col-action>
    						<v-btn x-small color="primary" @click="info.id ? updateArea(): saveArea()">{{ info.id ? $t('update'): $t('save')}}</v-btn>
    					</template>
    				</SessionFields>
    			</v-col>

    			<v-col cols="12">    				
		    		<v-item-group>
					    <v-container fluid>
					    	<v-row dense>
						        <v-col
						          	v-for="item in renderList"
						          	:key="item.id+'_Area'"
						          	cols="12"
						         	:md="selected && selected.id == item.id ? 12 : 4"
						         	:lg="selected && selected.id == item.id ? 10 : 3"

						        >
						          	<v-item v-slot="{ active, toggle }">
							              	
							            <v-card
							              	dark
							              	outlined
							              	:color="active ? 'secondary' : ''"
							              	:height="active ? '100%' : '100%'"							              
							            >
							            	<v-card-title class="pa-1 d-flex justify-center caption">
							            		<strong>{{item.name}} </strong>
							            	</v-card-title>
							            	<v-card-text class="pa-1">							
							            		<v-row no-gutters justify="center"> 
							            			<v-col cols="12">							            			
							            				<span class="caption d-flex justify-center">{{item.description}}  </span>
							            			</v-col>
							            			<v-col cols="8">							            			
							            				<span class="caption justify-end"> TIPO CAMA : <strong> {{ item?.RoomType?.name || ""}}</strong></span>
							            			</v-col>
							            			<v-col cols="12" class="d-flex justify-center"> 
							            				<v-btn  x-small :color="active?'error':'primary'" @click="SelectItem(toggle, active, item)">{{!active? 'Revisar' : 'Cerrar' }} </v-btn>
							            			</v-col>	            			
							            			<v-col cols="12">	
									             		<v-scroll-y-transition>
									                		<SessionBed v-show="active" :isEditable="isEditable" :currentPermission="currentPermission" :infoToComponent="item" :inputField="inputField" :keyField="keyField"></SessionBed>
									              		</v-scroll-y-transition>
									              	</v-col>
							            		</v-row>
							            	</v-card-text>
							            	<v-divider v-show="isEditable"></v-divider>
						              		<v-card-actions class="justify-center">
						              			<v-btn  color="primary" x-small v-show="isEditable && currentPermission.canEdit" @click="confirmEdit(item)"> {{$t('edit')}} </v-btn>

						              			<v-btn color="error" x-small v-show="isEditable && currentPermission.canDelete" @click="confirmDelete(item)"> {{$t('delete')}} </v-btn>

						              		</v-card-actions>
						            	</v-card>
						          	</v-item>
						        </v-col>
						    </v-row>
					    </v-container>
					</v-item-group>    			
    			</v-col>
    		</v-row>
    	</v-card-text>
    </v-card>
</template>
<script type="text/javascript">
	// area - > room -> roomtype , bed / procedure		
	import RoomHospitalizationService from "@/services/RoomHospitalizationService.js"
	import RoomTypeService from "@/services/RoomTypeService.js"
	
	import SessionBed from "@/components/hospitalization/SessionBedComponent.vue" 
	import SessionFields from "@/components/info/SessionFieldsComponent.vue"
	import MenuRoomType from "@/components/hospitalization/MenuRoomTypeComponent.vue"
	export default{
		name : "SessionRoomComponent",
		props : ["currentHeight", "isEditable", "currentPermission", "infoToComponent", "inputField", "keyField" ],
		components : { SessionBed, SessionFields, MenuRoomType },
		data : ()=>({
			search : "",			
			loading : false,
			list : [],
			infoItem : null,
			isEditing : false,
			info : { },
			selected:null,
			list : [],
			fields:[
				{ key: "name" , text : "name", type : "text"},
				{ key: "description" , text : "description", type : "text"},
				{ key: "RoomTypeId" , text : "RoomType", type : "component"},
				// { key: "AreaId" , text : "area", type : "text"},
			],
		}),
		mounted(){
			// this.getList();
		},
		watch:{
			
		},
		computed:{
			renderList(){				
				return this.infoToComponent.Rooms || [];
			},
			
		},
		methods:{
			searchFormula(){

			},
			addItem(){
				if (this.isEditing) {
					this.isEditing=false;
				}else{
					this.isEditing=true;
				}
				this.info={};
			},
			SelectItem(toggle, active, item){
				toggle();
				if (item && !active) {
					this.selected={...item};
				}else{
					this.selected=null;
				}
			},
			confirmEdit(item){
				this.infoItem=item;
				this.info={...item};
				this.isEditing=true;				
			},
			confirmDelete(item){
				this.infoItem = item;
				this.$EventBus.$emit("notifications",{
					type : "confirm_delete",
					ID : "RoomHospitalization",
					action : this.deleteArea,
				})				
			},
			
			async getList(){
				try{
					this.loading = true;
					const service = new RoomHospitalizationService();
					const res = await service.getInfo();
					if (res && res.data && res.data.length > 0) {
						this.list = res.data;
					}					
				}catch(error){
					console.warn("Error get  ", error)
				}finally{
					this.loading = false;
				}
			},
			async saveArea(){
				// name
				// description
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission,"canAdd")) {
						if (this.info && (!this.info.name)) {
							this.$EventBus.$emit("notifications",{ type : "warning", msg: "Se requiere Nombre" })
						}else{							
							const service = new RoomHospitalizationService();
							const res = await service.saveInfo({...this.info, AreaId : this.infoToComponent?.id});
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error creando Habitacion") })
								}else
								if (res.data) {
									this.renderList.push(res.data);
									this.$EventBus.$emit("notifications", {type: "success", msg : "Habitacion Agregada"})
									this.addItem();
								}
							}
						}
					}
				}catch(error){
					console.warn("Error save ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Creando Habitacion") })
				}finally{
					this.loading = false;
				}
			},
			async updateArea(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission,"canEdit")) {
						if (this.info && (!this.info.name)) {
							this.$EventBus.$emit("notifications",{ type : "warning", msg: "Se requiere Nombre" })
						}else{							
							const service = new RoomHospitalizationService();
							const res = await service.updateInfo(this.info);
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error Actualizando Habitacion") })
								}else
								if (res.data) {
									const idx=this.renderList.indexOf(this.infoItem)
									if (idx>=0) {										
										this.renderList.splice(idx, 1 ,this.info);
										this.$EventBus.$emit("notifications", {type: "success", msg : "Habitacion Actualizada"})
										this.addItem();
									}
								}
							}
						}
					}
				}catch(error){
					console.warn("Error update ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Actualizando Habitacion") })
				}finally{
					this.loading = false;
				}
			},
			async deleteArea(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission,"canEdit")) {
						if (this.infoItem && this.infoItem.id) {													
							const service = new RoomHospitalizationService();
							const res = await service.deleteInfo(this.infoItem);
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error Eliminando Habitacion") })
								}else
								if (res.data) {
									const idx=this.renderList.indexOf(this.infoItem)									
									if (idx>=0) {										
										this.renderList.splice(idx,1);									
										this.$EventBus.$emit("notifications", {type: "success", msg : "Habitacion Eliminada"})
									}
								}
							}
						}
					}
				}catch(error){
					console.warn("Error delete ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Eliminando Habitacion") })
				}finally{
					this.loading = false;
				}
			},
			
			
		},
	}
</script>