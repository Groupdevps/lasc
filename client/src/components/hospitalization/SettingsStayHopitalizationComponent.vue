<template>
    <v-card outlined :loading="loading">
    	<!-- <v-card-title></v-card-title> -->
    	<v-card-text class="pa-1">
    		<v-toolbar height="30">	    			
	    		<v-icon class="mr-1">mdi-map-marker-path</v-icon>
	    		<strong> AREAS</strong> # {{ renderAreas.length }}    
	    		<v-breadcrumbs :items="itemLinks">
			    <template v-slot:item="{ item }">
			      	<v-breadcrumbs-item
			        	:disabled="item.disabled"
			      	>
			        	<!-- :href="item.href" -->
			        	{{ item.text.toUpperCase() }}
			      </v-breadcrumbs-item>
			    </template>
			  </v-breadcrumbs>
	    		<v-spacer></v-spacer>
	    		<v-btn x-small @click="getList()" class="mr-2" color="success"> <v-icon x-small >mdi-refresh</v-icon>REFRESCAR</v-btn>
	    		<v-btn x-small v-show="isEditable" @click="addArea()" :color="isEditingArea ? 'error' : 'primary'"> {{isEditingArea ? 'Cancelar': 'Agregar Area'}}</v-btn>
    		</v-toolbar>
    		<v-row dense
    			:style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${$vuetify.breakpoint.height-(180)}px;`"
    		>
    			<v-col cols="12" v-show="isEditingArea">
    				<SessionFields v-model="infoArea" :fields="areaFields" reference="FieldArea" class="mt-2">
    					<template v-slot:col-action>
    						<v-btn color="primary" @click="infoArea.id ? updateArea(): saveArea()">{{ infoArea.id ? $t('update'): $t('save')}}</v-btn>
    					</template>
    				</SessionFields>
    			</v-col>

    			<v-col cols="12">    				
		    		<v-item-group>
					    <v-container fluid>
					    	<v-row dense>
						        <v-col
						          	v-for="itemArea in renderAreas"
						          	:key="itemArea.id+'_Area'"
						          	cols="12"
						         	:md="selectedArea && selectedArea.id == itemArea.id ? 6 : 4"
						         	:lg="selectedArea && selectedArea.id == itemArea.id ? 5 : 3"

						        >
						          	<v-item v-slot="{ active, toggle }">
							              	
							            <v-card
							              	dark
							              	outlined
							              	:color="active ? 'primary' : ''"
							              	:height="active ? '100%' : '150'"
							              	
							            >
							            	<v-card-title class="pa-1 d-flex justify-center">
							            		<strong>{{itemArea.name}} </strong>
							            		<span class="ml-3 caption d-flex justify-center">{{itemArea.description}}</span>
							            	</v-card-title>
							            	<v-card-text class="pa-1" >
							            		<v-row dense> 
							            			
							            			<v-col cols="12" class="d-flex justify-center"> 
							            				<v-btn  x-small :color="active?'error':'primary'" @click="SelectArea(toggle, active, itemArea)">{{!active? 'Revisar' : 'Cerrar' }} </v-btn>
							            			</v-col>	            			
							            			<v-col cols="12">	
									             		<v-scroll-y-transition>
									                		<SessionRoom  v-show="active" :isEditable="isEditable" :currentPermission="currentPermission" :infoToComponent="itemArea" :inputField="inputField" :keyField="keyField"></SessionRoom>
									              		</v-scroll-y-transition>
							            			</v-col>
							            		</v-row>
							            	</v-card-text>
						              		<v-card-actions class="justify-center">
						              			<v-btn  color="primary" x-small v-show="isEditable && currentPermission.canEdit" @click="confirmEdit(itemArea)"> {{$t('edit')}} </v-btn>

						              			<v-btn color="error" x-small v-show="isEditable && currentPermission.canDelete" @click="confirmDelete(itemArea)"> {{$t('delete')}} </v-btn>

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
	import SettingsHospitalizationService from "@/services/SettingsHospitalizationService.js"
	import AreaHospitalizationService from "@/services/AreaHospitalizationService.js"
	
	import RoomTypeService from "@/services/RoomTypeService.js"
	import BedHospitalizationService from "@/services/BedHospitalizationService.js"
	import SessionRoom from "@/components/hospitalization/SessionRoomComponent.vue"	
	import SessionFields from "@/components/info/SessionFieldsComponent.vue"
	export default{
		name : "SettingsStayHospitalizationComponent",
		props : ["currentHeight", "isEditable", "inputField", "keyField" ],
		components : { SessionRoom, SessionFields },
		data : ()=>({
			search : "",			
			loading : false,
			list : [],
			infoItem : null,
			isEditingArea : false,
			infoArea : { },
			selectedArea:null,
			areaFields:[
				{ key: "name" , text : "name", type : "text"},
				{ key: "description" , text : "description", type : "text"}
			],
			headers : [
				{ text : "Disponibilidad", value : "bedEnables" },				
				{ text : "Tipo de cuarto", value : "type" },
				{ text : "Numero de camas", value : "bedNumber" },
				{ text : "Cantidad de camas", value : "roomsNumber" },
				{ text : "Descripcion", value : "description" },
				{ text : "Acciones", value : "actions" },
			],
			itemLinks : [
		        // {
		        //   text: 'Dashboard',
		        //   disabled: false,
		        //   href: 'breadcrumbs_dashboard',
		        // }
        	],
			listAreas : []
		}),
		mounted(){
			this.getList();
		},
		watch:{
			
		},
		computed:{
			renderAreas(){				
				return this.listAreas;
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("Hospitalization") 
			}
		},
		methods:{
			searchFormula(){

			},
			addArea(){
				if (this.isEditingArea) {
					this.isEditingArea=false;
				}else{
					this.isEditingArea=true;
				}
				this.infoArea={};
			},
			SelectArea(toggle, active, item){
				toggle();
				if (item && !active) {
					this.selectedArea={...item};
				}else{
					this.selectedArea=null;

				}
			},
			confirmEdit(item){
				this.infoItem=item;
				this.infoArea={...item};
				this.isEditingArea=true;				
			},
			confirmDelete(item){
				this.infoItem = item;
				this.$EventBus.$emit("notifications",{
					type : "confirm_delete",
					ID : "AreaHospitalization",
					action : this.deleteArea,
				})				
			},
			redirectToNew(){
				this.$router.push({ 
					name 	: "DashboardSettingsHospitalization",					
					params 	: {										
						id : 0,
						option 	 : "new"		
					}
				});
			},
			redirect(item){
				this.$router.push({ 
					name 	: "DashboardSettingsAnalisis",
					params 	: {
						id 		 : item.CupsList.id,				
						option 	 : "update"		
					}
				});			
			},
			async getList(){
				try{
					this.loading = true;
					this.listAreas=[];
					const service = new AreaHospitalizationService();
					const res = await service.getInfo();
					if (res && res.data && res.data.length > 0) {
						this.listAreas = res.data;
					}					
				}catch(error){
					console.warn("Error get analysis laboratory ", error)
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
						if (this.infoArea && (!this.infoArea.name)) {
							this.$EventBus.$emit("notifications",{ type : "warning", msg: "Se requiere Nombre" })
						}else{							
							const service = new AreaHospitalizationService();
							const res = await service.saveInfo(this.infoArea);
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error creando area") })
								}else
								if (res.data) {
									this.listAreas.push(res.data);
									this.$EventBus.$emit("notifications", {type: "success", msg : "Area Agregado"})
									this.addArea();
								}
							}
						}
					}
				}catch(error){
					console.warn("Error save ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Creando area") })
				}finally{
					this.loading = false;
				}
			},
			async updateArea(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission,"canEdit")) {
						if (this.infoArea && (!this.infoArea.name)) {
							this.$EventBus.$emit("notifications",{ type : "warning", msg: "Se requiere Nombre" })
						}else{							
							const service = new AreaHospitalizationService();
							const res = await service.updateInfo(this.infoArea);
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error Actualizando area") })
								}else
								if (res.data) {
									const idx=this.listAreas.indexOf(this.infoItem)
									if (idx>=0) {										
										this.listAreas.splice(idx, 1 ,this.infoArea);
										this.$EventBus.$emit("notifications", {type: "success", msg : "Area Actualizado"})
										this.addArea();
									}
								}
							}
						}
					}
				}catch(error){
					console.warn("Error update ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Actualizando area") })
				}finally{
					this.loading = false;
				}
			},
			async deleteArea(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission,"canEdit")) {
						if (this.infoItem && this.infoItem.id) {													
							const service = new AreaHospitalizationService();
							const res = await service.deleteInfo(this.infoItem);							
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error Eliminando area") })
								}else
								if (res.data) {
									const idx=this.listAreas.indexOf(this.infoItem)
									if (idx>=0) {										
										this.listAreas.splice(idx, 1);									
										this.$EventBus.$emit("notifications", {type: "success", msg : "Area Eliminado"})
									}
								}
							}
						}
					}
				}catch(error){
					console.warn("Error delete ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Eliminando area") })
				}finally{
					this.loading = false;
				}
			},			
		},
	}
</script>