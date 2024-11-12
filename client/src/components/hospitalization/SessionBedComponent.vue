<template>
	<v-card outlined>
    	<!-- <v-card-title></v-card-title> -->
    	<v-card-text class="pa-1">
    		<v-toolbar height="30">	    			
	    		<v-icon class="mr-1">mdi-bed-empty</v-icon>
	    		<strong> Camas </strong>	# {{ renderList.length }}     		
	    		<v-spacer></v-spacer>
	    		<v-btn x-small v-show="isEditable" @click="addItem()" :color="isEditing ? 'error' : 'primary'"> {{isEditing ? 'Cancelar': 'Agregar'}}</v-btn>
    		</v-toolbar>
    		<v-row dense
    			:style = "`overflow-y : auto; overflow-x : hidden; max-height:  300px;`"
    		>
    			<v-col cols="12" v-show="isEditing">
    				<SessionFields v-model="info" :fields="fields" reference="FieldBed" class="mt-2">    					
    					<template v-slot:col-action>
    						<v-btn x-small color="primary" @click="info.id ? update(info): save()">{{ info.id ? $t('update'): $t('save')}}</v-btn>
    					</template>
    				</SessionFields>
    			</v-col>

    			<v-col cols="12">    			
	    			<v-item-group>
						<v-container fluid>	
							<v-row dense>
								<v-col
							      	v-for="(item,index) in renderList"
							      	:key="index"
							      	cols="12"
							      	md="5"
							    >
								    <v-item v-slot="{ active, toggle }">
								        <v-card
											outlined
											:color="active ? 'primary' : ''"											
											dark
											height="100%"											
								        >
								        	<v-card-title class="pa-1 justify-center caption">
							            		<strong>{{item.name}} - {{item.code}}  </strong>
							            	</v-card-title>
							            	<v-card-text class="pa-1">							
							            		<v-row no-gutters> 
							            			<v-col cols="12">							            			
							            				<span class="caption d-flex justify-center">{{item.description}} </span>
							            			</v-col>
							            			<v-col cols="12" class="d-flex justify-center"> 
							            				<v-btn  x-small :color="active?'error':'primary'" @click="SelectItem(toggle, active, item)">{{!active? 'Seleccionar' : 'Deseleccionar' }} </v-btn>
							            			</v-col>	
							            			<v-col cols="12">            		
											          	<v-scroll-y-transition>
												            <div			                  
												              class="body-1 flex-grow-1 text-center"
												            >
											            		<p>
												            		<!-- item.numberInUse == 0 ? 'success' : item.numberInUse == item.numberOcuppiedBed ? 'error': 'warning' -->
												              		<v-icon  
												              			:color="!item.available ? 'error': 'success'"
												              		>mdi-bed</v-icon><br>
												            		{{ item.available ? 'DISPONIBLE' : 'NO DISPONIBLE' }}
												            		<!-- {{ item.numberInUse}}/{{item.numberOcuppiedBed}} -->
											            		</p>
											            	</div>
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
	import BedHospitalizationService from "@/services/BedHospitalizationService.js"
	import SessionFields from "@/components/info/SessionFieldsComponent.vue"
	export default{
		name : "SessionBedComponent",
		props : ["currentHeight", "isEditable", "currentPermission", "infoToComponent", "inputField", "keyField" ],
		components : { SessionFields },
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
				// { key: "bed" , text : "bed", type : "text", cols: 12},
				{ key: "code" , text : "code", type : "text", cols: 12},
				{ key: "name" , text : "name", type : "text", cols: 12},
				{ key: "description" , text : "description", type : "text", cols: 12},							
				// { key: "available" , text : "available", type : "checkbox", cols: 12},
				// 		
				// RoomId
			],
		}),
		mounted(){
			// this.getList();
		},

		computed:{
			renderList(){				
				return this.infoToComponent.Beds || [];
			},
			currentPatient(){
				return this.$store.getters["infoPatient/patient"];
			}
			
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
				this.infoItem=null;
			},
			SelectItem(toggle, active, item){
				toggle();
				if (item && !active) {
					if (item.available) {						
						this.selected={...item};						
						if (this.currentPatient) {						
							this.$EventBus.$emit("notifications",{
								type:"confirm_action",
								ID : "confirmSelectionBed",
								action : this.selectBedPatient
							})
						}
					}else{
						this.$EventBus.$emit("notifications", { type : "warning", msg: "Esta Cama no se encuentra disponible"})
						toggle()
						this.selected=null;					
					}
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
					ID : "BedHospitalization",
					action : this.deleteArea,
				})				
			},
			
			async getList(){
				try{
					this.loading = true;
					const service = new BedHospitalizationService();
					const res = await service.getInfo();
					if (res && res.data && res.data.length > 0) {
						this.renderList = res.data;
					}					
				}catch(error){
					console.warn("Error get  ", error)
				}finally{
					this.loading = false;
				}
			},
			async selectBedPatient(){
				try{
					this.loading = true;	
					if (this.currentPatient) {
						if (this.inputField && this.keyField) {
							this.inputField[this.keyField]=this.selected?.id;
							this.info=this.selected;
							this.inputField.actionBed=this.updateStateBed;
						}
					}					
				}catch(error){
					console.warn("Error select ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Seleccionando Cama a paciente") })
				}finally{
					this.loading = false;
				}
			},
			async updateStateBed(bedId, isAvailable){				
				try{
					const params= this.renderList.find(x=> x.id == bedId) 
					params.available=isAvailable
					console.log("PARAMS BED ", params)
					this.update(params)
				}catch(error){
					console.log("error update bed ", error)
				}

			},
			async save(){
				// name
				// description
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission,"canAdd")) {
						if (this.info && (!this.info.name)) {
							this.$EventBus.$emit("notifications",{ type : "warning", msg: "Se requiere Nombre" })
						}else{							
							const service = new BedHospitalizationService();
							const res = await service.saveInfo({...this.info, RoomId: this.infoToComponent?.id});
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error creando Cama") })
								}else
								if (res.data) {
									this.renderList.push(res.data);
									this.$EventBus.$emit("notifications", {type: "success", msg : "Cama Agregada"})
									this.addItem();
								}
							}
						}
					}
				}catch(error){
					console.warn("Error save ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Creando Cama") })
				}finally{
					this.loading = false;
				}
			},
			async update(params){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission,"canEdit")) {
						if (params && (!params.name)) {
							this.$EventBus.$emit("notifications",{ type : "warning", msg: "Se requiere Nombre" })
						}else{							
							const service = new BedHospitalizationService();
							const res = await service.updateInfo(params);
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error Actualizando Cama") })
								}else
								if (res.data) {
									const idx=this.renderList.findIndex(x=> x.id == params.id)
									console.log("check  update bed ", idx)
									if (idx>=0) {										
										this.renderList.splice(idx, 1 ,{...params});
										this.$EventBus.$emit("notifications", {type: "success", msg : "Cama Actualizada"})
										this.isEditing=false;										
										this.info={};
										this.infoItem=null;
									}

								}
							}
						}
					}
				}catch(error){
					console.warn("Error update ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Actualizando Cama") })
				}finally{
					this.loading = false;
				}
			},
			async deleteArea(){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission,"canEdit")) {
						if (this.infoItem && this.infoItem.id) {													
							const service = new BedHospitalizationService();
							const res = await service.deleteInfo(this.infoItem);
							if (res) {
								if (res.error) {
									this.$EventBus.$emit("notifications",{ type : "warning", msg: this.$Helper.renderErrorMessage(res.error, "Error Eliminando Cama") })
								}else
								if (res.data) {
									const idx=this.renderList.indexOf(this.infoItem)
									if (idx>=0) {										
										this.renderList.splice(idx, 1);									
										this.$EventBus.$emit("notifications", {type: "success", msg : "Cama Eliminada"})
									}
								}
							}
						}
					}
				}catch(error){
					console.warn("Error delete ", error)
					this.$EventBus.$emit("notifications",{ type : "error", msg: this.$Helper.renderErrorMessage(error, "Eliminando Cama") })
				}finally{
					this.loading = false;
				}
			},
				
		},
	}
</script>
