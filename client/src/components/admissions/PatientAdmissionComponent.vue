<template >
	<v-container fluid >
		<v-card outlined>
			<v-card-title
				:class = "head.class_title"
			>
				<SearcherPatient
					@receiveActions = "actions($event)"
				></SearcherPatient>
			</v-card-title>
			<v-card-text
				v-show = "show.patient"
				:class = "head.class_text"
				:min-heigth = "400"
			>

				<v-card outlined>
					<v-card-text
						class = "pa-0"
					>
						<v-expansion-panels
							multiple
							v-model="panel"
						>
							<v-expansion-panel 
								dark								
								:height 			= "currentHeght" 
								v-for = "(item_tab_i, idx_tab_i) of render_patients"
								:key  = "idx_tab_i"
								class = "mb-1" 
								v-show = "item_tab_i.key != 'family_data'? true : item_tab_i.key == 'family_data' && show.TabRelationships ?  true  : false"
							>
								<v-expansion-panel-header
									dark
									dense
									ripple
								 	color 	= "blue-grey darken-1"
									:class 	= "item_tab_i.class"
									
								>
									{{$t(item_tab_i.text)}}
								</v-expansion-panel-header>
								<v-expansion-panel-content class ="pa-1 pt-3">
									<v-row dense >
										<template
											v-for = "(item_field, idx_field) of item_tab_i.fields"
										>
											<v-col
												:cols = "item_field.cols"
												:offset = "item_field.offset"
												:key  = "idx_field + ref"
												v-show = "!show[item_field.key]"
												class = "text-uppercase"
											>	
												<span
													v-if   = "item_field.subtitle"
													:class = "item_field.class"
												>	
													{{ $t(item_field.subtitle) }}
													<v-divider 
														class = "pa-0 ma-0 primary"
														:inset = "true"
													></v-divider>
												</span>
												<v-text-field
													dense
													outlined													
													:label 				= "$t(item_field.text)"
													v-model 			= "info[item_field.key_main][item_field.key]"
													:type 				= "item_field.type"
													v-else-if 			= "['text','email'].includes(item_field.type)"
													:prepend-inner-icon = "item_field.icon"
													:disabled 			= "item_field.isDisabled"
													@input 		 		= "(v) => info[item_field.key_main][item_field.key] = v.toUpperCase()"
													:rules 				= "item_field.rules ? item_field.rules : []"
													:required  			= "item_field.isRequired"

												></v-text-field>
													<!-- :autofocus 			= "item_field.autofocus" -->
													<!-- @input="v => updateValue(item_field.key, v)" -->
												<v-text-field

													dense
													outlined
													:label 				= "$t(item_field.text)"
													v-model.number 		= "info[item_field.key_main][item_field.key]"
													:type 				= "item_field.type"
													v-else-if			= "['number'].includes(item_field.type)"
													:prepend-inner-icon = "item_field.icon"											
													:required  			= "item_field.isRequired"
													:rules 				= "item_field.rules ? item_field.rules : []"										
													
												></v-text-field>	
												<v-text-field

													dense
													outlined
													:label 				= "$t(item_field.text)"
													v-model.number 		= "info[item_field.key_main][item_field.key]"
													type 				= "number"
													v-else-if			= "['number2'].includes(item_field.type)"
													:prepend-inner-icon = "item_field.icon"											
													:required  			= "item_field.isRequired"
													:rules 				= "item_field.rules ? item_field.rules : []"										
													@input 		 		= "(v) => info[item_field.key_main][item_field.key] = v.toUpperCase()"													
												></v-text-field>
												<MenuStateComponent 
													v-else-if = "item_field.key == 'StateId' && item_field.type == 'component'"
													:inputField="info.Address" 
													keyField="State"
													:isReturnObject="true"
													autoSetInField="StateId"
												></MenuStateComponent>
												<MenuCityComponent 
													v-else-if = "item_field.key == 'CityId' && item_field.type == 'component'"
													:inputField="info.Address" 
													keyField="CityId" 
													:infoState="info.Address.State"
													:isReturnObject="false"
													:isStateObject="true"
													:isRequiredState="true"
													autoSetInField="City"
													itemValue="id"
													valueSetInField="id"
												></MenuCityComponent>
												<MenuDistrics
													v-else-if = "item_field.key == 'DistrictId' && item_field.type == 'component'"
													:inputField="info.Address" 
													keyField="DistrictId" 
													:infoCity="info.Address.City"
													:isReturnObject="false"
													autoSetInField="District"
													valueSetInField="id"
													:isCityObject="true"
												></MenuDistrics>
												<MenuTypeDocumentComponent
													v-else-if = "item_field.key == 'TypeIDId'"
													:inputField="info.person" 
													:keyField="item_field.key" 													
												></MenuTypeDocumentComponent>
												<component
													v-else-if 	= "item_field.type == 'component2'"
													:isReturnObject = "item_field.isReturnObject"
													:autoSetInField = "item_field.key"
													:inputField="info[item_field.key_main]" 
													:keyField="item_field.keyObj ? item_field.keyObj : item_field.key" 									
													:is 				 = "item_field.component"
													:key 				 = "ref + item_field.component + idx_field"
												></component>

												<tableComp
													v-else-if 	  		 = "item_field.type == 'table'"
													:key 				 = "idx_field + ref + item_field.key"
													:info_to_component 	 = "{ ...item_field }"
													:ref_to_component 	 = "ref + item_field.key + idx_field"									
													:update_to_component = "info_comp"
													@receive_info 		 = "info[item_field.key] = $event"
													@receive_selections  = "info[item_field.key_selection] = $event"
													:currentPermission   = "currentPermission"
												></tableComp>
													<!-- :list_to_component 	 = "render_listed(item_field)" -->
												
												<DateAuto
													v-else-if		   = "item_field.type == 'DateAuto'"
													:key 			   = "idx_field + ref + item_field.key"
													:inputField 		= "info[item_field.key_main]"
													:keyField 			= "item_field.key"
												></DateAuto>
												
												<v-btn
													v-else-if 	= "item_field.type == 'btn'"
													:color 	    = "item_field.color"
													@click 		= "actions(item_field)"
													:loading 	= "item_field.isLoading"
												>	
													{{ $t(item_field.text) }}
												</v-btn>
												
												<component
													v-else-if 				 = "item_field.type == 'component'"
													:is 				 = "item_field.component"
													:key 				 = "ref + item_field.component + idx_field"
													:info_to_component   = "item_field"
													:update_to_component = "info_comp" 
													:serviceSelected 	 = "currentService"

													:inputField 		= "info[item_field.key_main]"
													:keyField 			= "item_field.key"
													v-show 				= "item_field.key == 'services' && !currentPermission.canAdd ? false : true" 
													:currentPermission  = "currentPermission"
												></component>
												
											</v-col>
										</template>
									</v-row>
								</v-expansion-panel-content>
									
							</v-expansion-panel>
						</v-expansion-panels>
					</v-card-text>
					
				
				<v-divider></v-divider>
				</v-card>
			</v-card-text>
				
		</v-card>
	</v-container>
</template>
<style scoped>
.small-pannel{
	min-height: 20px;
}
</style>
<script type="text/javascript" >
	//src="./js/PatientAdmissionJS.js"
	import patient_fields 	from "@/components/info/js/patients.js"
	import PatientService 	from "@/services/PatientService.js"

	// import searcher  		from "@/helpers/searcher.vue"
	// import dates 			from "@/helpers/dates.vue"
	import tableComp 		from "@/components/admissions/FamilyTableComponent.vue"
	import services 		from "@/components/info/ServicesComponent.vue"
	import DateAuto 		from "@/components/info/DateAutoPlaceholderComponent.vue"
	import SearcherPatient 	from "@/components/admissions/SearcherPatientComponent.vue"
	import MenuDistrics 	from "@/components/info/MenuDistricsComponent.vue" 
	import MenuCityComponent from "@/components/info/MenuCityComponent.vue"
	import MenuStateComponent from "@/components/info/MenuStateComponent.vue"
	import MenuTypeDocumentComponent from "@/components/info/MenuTypeDocumentComponent.vue"
	import MenuGenderComponent from "@/components/info/MenuGenderComponent.vue"
	import MenuMaritalStatusComponent from "@/components/info/MenuMaritalStatusComponent.vue"
	import MenuCurrentAdministratorComponent from "@/components/info/MenuCurrentAdministratorComponent.vue"
	import MenuRegimeComponent from "@/components/info/MenuRegimeComponent.vue"
	import MenuSocioeconomicLevelComponent from "@/components/info/MenuSocioeconomicLevelComponent.vue"
	import MenuZoneComponent from "@/components/info/MenuZoneComponent.vue"
	import MenuModeratorFeeComponent from "@/components/info/MenuModeratorFeeComponent.vue"

	// import FieldSearch 		from "@/components/info/FieldSearchSelectComponent.vue"
	export default {
		name 		: "PatientAdmissions",
		props : ["currentHeight"],
		components	: {
			// searcher,
			// dates,
			tableComp,
			services,
			DateAuto,
			SearcherPatient,
			MenuDistrics,
			MenuCityComponent, MenuStateComponent, MenuTypeDocumentComponent,
			MenuGenderComponent, MenuMaritalStatusComponent, MenuCurrentAdministratorComponent,
			MenuRegimeComponent, MenuSocioeconomicLevelComponent, MenuZoneComponent,
			MenuModeratorFeeComponent
			// FieldSearch,
		},
		data : (vm) => ({
			ref 		: "PatientAdmissions",
			info_fields 	: patient_fields,
			panel 		: [0,1,2],
			head 		: {
				class_title : "body-1 pa-1",
				class_text	: "pa-1 pb-0",
				title 		: "Ingreso Pacientes",
			},
			search 			: "",
			info 			: {
				age : "",
				assignedAdministrator: { id : 1 },
			},						
			info_comp 		: null,			
			show 			: {
				patient : false,
				triage  : false,
				moderatorFee : true,
				TabRelationships : false,
			},			
			tab 				: null,			
		}),	//data
		watch : {
			"info.Companion": function(val){				
				if (val) {
					this.info_comp = { ...this.info_comp, ...this.info };
				}
			},
				
			"info.person.birthDate" : function(val){				
				if (val) {
					this.info.person.age = this.$ManagerSmith.getAge(val);
				}else{
					this.info.person.age = "";
				}
			},
			"info.ServiceProvider.Regime"(val){
				if (val) {					
					this.info.ServiceProvider.regime = val.id;
					if (val.name && val.name.includes("Contributivo")) {						
						this.show.moderatorFee = false; 
					}else{						
						this.show.moderatorFee = true; 								
					}
				}
			},
			"info.ServiceProvider.administrator"(val){
				if (val) {
					if (this.info.ServiceProvider) {

						this.info.ServiceProvider.assignedAdministratorId = val.id;
						this.info.ServiceProvider.assignedAdministrator = val.name;
						this.info.ServiceProvider.nit = val.nit;					
						if (val.name && val.name.includes("PARTICULAR")) {
							this.info.ServiceProvider.Regime = { id : val.RegimeId, name : val.regime}; 
						}
					}					
				}
			},
			"info.person.id"(val){
				if (val) {
					this.show.TabRelationships = true;
				}else{
					this.show.TabRelationships = false;					
				}
			},
			"info.ServiceProvider.moderatorFee"(val){
				if (val) {
					let cuot 	= val; // info. cuota_moderadora;
			        let regimen = this.info?.ServiceProvider?.Regime?.name || null; // contrato;
			        if (regimen == 'Subsidiado') {
			            this.info.moderating_fee_value =  '$0';
			        }else if (regimen == 'Particular') {
			             this.info.moderating_fee_value = '$10.000';
			        }
			        else if(cuot <= 2 && regimen !== 'Subsidiado') {
			             this.info.moderating_fee_value = '$3.000';
			        } 
			        else if ( cuot > 2  && cuot <= 5 && regimen !== 'Subsidiado') {
			             this.info.moderating_fee_value = '$12.000';
			        } 
			        else if (cuot > 5  && regimen !== 'Subsidiado') {
			            this.info.moderating_fee_value = '$31.600';
			        }				
				}
			}

		}, // watch

		created(){
			// this.get_centers('eps');
			this.set_default();

		}, // created

		computed : {
			render_patients: function(){
				return this.info_fields;
			},
			currentHeght: function(){
				return this.currentHeight - 30 + 'px';
			},
			currentService: function(){
				return this.$route && this.$route.params ? this.$route.params.option : "urgency"
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("PatientAdmissionComponent") // this.$route.name
			}
			
		}, //  computed

		methods : {
			actions(action, item, option){
				// console.log("Action Patient ", action , item)
				if (action) {					
			        if (action.action == 'searchPatient') {		
						if(action.params){
							this.getPatient(action.params);						
						}				
			        }else
					if(action.action == "setPatientByName"){
						if(action.params){
							this.$ManagerSmith.formatInfoPerson(action.params, this.info);
							// this.actions({action: "set_regimen"});
							this.info_comp = { ...this.info };
							this.show.patient 	= true;
						}

					}else
			        if (action.action == 'save') {						
			        	if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
				        	if (this.info && this.info.person && this.info.fullName) {
				        		delete this.info.fullName;
				        	}
				        	this.save();
			        	}
			        }else			        					
					// if (action.action == 'cuota') {
					// 
					// }				
					if (action.action == "tab_before") {
						this.tab--;
					}else if (action.action == "tab_next") {
						this.tab++;
					}
				} // action
			}, // actions

			set_default(){
				this.info = {
					person 			: { age 	: "", numberId : "", birthDate : "" , GenderId: null},
					Address 		: { City : null,  District: null, CityId:null},
					ServiceProvider : { Regime : {}, administrator : {}},
					Relationships  	: [],
					Companion   	: null,
				};				
			}, // set default
			
			async getPatient(params){
				//"/ConsultaExterna/info_patient/find";				
				this.$EventBus.$emit('notifications',{					
					msg 	: this.$t('searching_patient'),
					loading : true,
				});
				try {
					const service = new PatientService();
					const res = await service.fetchByParams(params)										
					if (res && res.error) {
						this.$EventBus.$emit('notifications',{
							type 	: 'warning',
							msg 	: res.error.response.data.message || res.error.response.data || "Error obteniendo informacion de paciente",
						});
						this.set_default();										
						this.info.person  	= {...this.info.person, ...params};
						if (this.info.person && this.info.person.birthDate) {
							this.info.person.Adult = this.$Helper.checkIsAdult(this.info.person.birthDate);
						} 	
					}else
					if (res && res.data) {						
						this.$EventBus.$emit('notifications',{
							type 	: 'success',
							msg 	: this.$t('found_patient_information'),
						});						
						this.set_default();
						this.info.person  	= {...this.info.person, ...params};						
						let infoPatient = res.data;

						this.$ManagerSmith.formatInfoPerson(infoPatient, this.info);
						// console.log("CHECK PATIENT INFO ",this.info)
						// this.actions({action: "set_regimen"});
						if (infoPatient.ServiceProvider) {
							if (infoPatient.ServiceProvider.regime) {								
								const {name} = this.$store.getters["listRegime/getById"](infoPatient.ServiceProvider.regime);
								this.info.ServiceProvider.Regime = { id : infoPatient.ServiceProvider.regime, name };
							}
							if (infoPatient.ServiceProvider.administrator) {
								this.info.ServiceProvider.administrator = {...infoPatient.ServiceProvider.administrator, id: infoPatient.ServiceProvider.assignedAdministratorId};
								this.info.ServiceProvider.assignedAdministrator = infoPatient.ServiceProvider.assignedAdministrator;
								this.info.ServiceProvider.assignedAdministratorId = infoPatient.ServiceProvider.assignedAdministratorId;
							}
						}						
						if (infoPatient.GenderId) {							
							this.info.person.GenderId = infoPatient.GenderId;
						}
						
					}else{
						this.$EventBus.$emit('notifications',{
							type 	: 'warning',
							msg 	: this.$t('no_patient_information_found'),
						});
						this.set_default();										
						this.info.person  	= {...this.info.person, ...params};
						if (this.info.person && this.info.person.birthDate) {
							this.info.person.Adult = this.$Helper.checkIsAdult(this.info.person.birthDate);
						} 
					}
					this.info_comp = { ...this.info };
				}catch (er) {
					
					this.set_default();				
					this.info_comp = null;
					console.warn("Error patient ", er);
					this.$EventBus.$emit('notifications',{
						type 	: 'error',
						msg 	: er.response.data.message || er.response.data || "Encontrando paciente"  
					})
				}finally{
					this.show.patient 	= true;
				};

			}, // get patient

			async save(){
				if(this.info && this.info.person){
					this.info.person.Adult = this.$Helper.checkIsAdult(this.info.person.birthDate);
					// console.log("PERSON adult ", this.info)
					let info_up = { ...this.info.person } ;
					if(info_up && info_up.id){ // update		
						this.update();				
					}else if(info_up){ // save
						//"/ConsultaExterna/info_patient";
						const service = new PatientService();
						info_up.Address 		= {...this.info.Address};
						info_up.Relationships 	= [...this.info.Relationships];
						info_up.ServiceProvider	= {...this.info.ServiceProvider};
						// info_up.Adult = 
						if(!info_up.cellphone || !info_up.numberId || (info_up.ServiceProvider && !info_up.ServiceProvider.administrator)){
							this.$EventBus.$emit('notifications',{
								type 	: 'warning',
								msg 	: "Se requiere campos de : Documento, Celular, EPS"
							});
							return 
						}
						this.$EventBus.$emit('notifications',{
							type 	: 'primary',
							loading : true,
							msg 	: 'Registrando paciente',
						});
						const res = await service.savePatient(info_up)						
						if (res && res.data) {
							this.info.person = { ...res.data };
							this.info_comp = { ...this.info };					
							this.$EventBus.$emit('notifications',{
								type 	: 'success',
								msg 	: 'Paciente registrado',
							});							
						}else{
							this.info_comp = null;							
							if (res && res.response) {
								this.$EventBus.$emit('notifications',{
									type 	: 'warning',
									msg 	: res.response.data.error || res.message || "Creando paciente",
								})
							}else{

								this.$EventBus.$emit('notifications',{
									type 	: 'warning',
									msg 	: "Creando paciente : " + res && res.error ? res.error.message : "",
								})
							}
						}
					}
				}
				
			}, //save

			async update(){
				try{
			       	if (this.$Helper.isPermission(this.currentPermission, "canEdit")){			       		
						if(this.info && this.info.person){
							let info_up 			= { ...this.info.person };							
							if(!info_up.cellphone || !info_up.numberId || (info_up.ServiceProvider && !info_up.ServiceProvider.administrator)){
								this.$EventBus.$emit('notifications',{ type 	: 'warning', msg 	: "Se requiere campos de : Documento , Celular, EPS"});
								return 
							}
							info_up.Address 		= this.info.Address;					
							info_up.ServiceProvider	= this.info.ServiceProvider;
							info_up.Adult = this.$Helper.checkIsAdult(this.info.birthDate)
							if (info_up.fullName) {
								delete info_up.fullName;
							}
							//"/ConsultaExterna/info_patient";
							const service = new PatientService();
							const res = await service.updatePatient(info_up.id, info_up);
							// console.warn("RES updatePatient ", res)		
							if (res && res.data){
								this.$EventBus.$emit('notifications',{
									type 	: 'success',
									msg 	: 'informaction de Paciente actualizado',
								});						
							}else{				
								this.$EventBus.$emit('notifications',{
									type 	: 'error',
									msg 	: res.response.data.message || res.message || "Error actualizando paciente" 
								});
							}
						}
			       	} 
				}catch(error){
					console.warn("Error 2 update paciente ", error)
				}
				
			}, //update
			
			render_listed(item){
				if (item) {
					let temp = []
					if (item.global_list) {;
						temp = this.$ManagerSmith.render_listed(item);
					}
					if (temp && temp.length === 0 && typeof item.list  == "string") {
						temp = this[item.list];
					}
					if (!temp && typeof item.list  == "string") {
						temp = this[item.list];						
					}					
					return temp;
				}
				return [];
				
			}, // render listed
		}, // methods
	};// export

</script>