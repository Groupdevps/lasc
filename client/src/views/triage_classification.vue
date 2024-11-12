<template>
	<v-row
		dense
		justify  = "center"
	>
		<v-col
			md   = "12"
			cols = "12"
		>
			<v-card outlined>
				<v-card-title
					class="pa-0 py-1"
				>
				<!-- class = "subtitle-1 pa-0 primary white--text justify-center text-h7 font-weight-medium text-uppercase" -->
					<v-btn 
						v-show="$route.name == 'TriageClassification'" 
						color="warning" 
						@click="$router.go(-1)"
						class="mr-1"
						tile
					> 
						<v-icon class="mr-1"> mdi-arrow-left-circle</v-icon> {{ $t('go_back') }}
					</v-btn>
					<!-- <span>	{{ title }}</span> -->
					<!-- <v-text-field
						dense
						outlined
						v-model 			= "search"
						placeholder 		= "Buscar doc"
						prepend-icon-inner 	= "mdi-magnify"
						type 				= "number"
						@keyup.enter 		= "actions('search_patient')"
					></v-text-field> -->
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text class = "pt-2">
					<v-row
						dense
						:style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${$vuetify.breakpoint.height-(220)}px;`"
					>
						<template
							v-for = "(item_field, idx_field) of render_fields"
						>
							<v-col
								:cols 		= "item_field.cols ? item_field.cols : 4"
								:key 		= "ref + item_field.key"	
								v-show 		= "!show[item_field.key]"						
							>							
								<span
									v-if  = "item_field.subtitle"
									class = "text-uppercase font-weight-medium primary--text"
								>	
									{{ $t(item_field.subtitle) }}
									<v-divider color="white"></v-divider>
								</span>
								<v-text-field
									dense
									outlined
									v-else-if 		= "['text', 'email'].includes(item_field.type)"
									:label 			= "$t(item_field.text)"
									v-model 		= "info[item_field.key]"
									:type 			= "item_field.type"
									class 			= "pa-0 ma-0 text-uppercase"
									@input 		 	= "(v) => info[item_field.key] = v.toUpperCase()"
									:readonly 		= "item_field.isReadOnly"
									:disabled 		= "item_field.isDisabled"
									:suffix  		= "item_field.suffix"
								></v-text-field>
								<v-text-field
									dense
									outlined
									v-else-if 		= "['number'].includes(item_field.type)"
									:label 			= "$t(item_field.text)"
									v-model.number	= "info[item_field.key]"
									:type 			= "item_field.type"
									class 			= "pa-0 ma-0 text-uppercase"
									@input 		 	= "(v) => info[item_field.key] = v.toUpperCase()"					
									:disabled 		= "item_field.isDisabled"
									:readonly 		= "item_field.isReadOnly"
									:suffix  		= "item_field.suffix"
								></v-text-field>
								<v-select
									dense
									outlined									
									:label 		= "$t(item_field.text)"
									v-model 	= "info[item_field.key]"
									:items 		= "render_listed(item_field)"
									:item-value	= "item_field.item_value"
									:item-text  = "item_field.item_text"
									v-else-if 	= "'select' == item_field.type"
									:readonly 		= "item_field.isReadOnly"
									:disabled 		= "item_field.isDisabled"
									:autofocus  = "item_field.autofocus"
									@change 	= "actions(item_field)"
									class = "text-uppercase"

								></v-select>
									<!-- :value 		= "info[item_field.key]=item_field.default" -->
								
								<dates
									v-else-if		   = "	item_field.type == 'date_range' 	||
															item_field.type == 'time_picker'
														"
									:info_to_component = "item_field"
									:info_to_dates 	   = "info[item_field.key]"
									@receive_info	   = "info[item_field.key] = $event"
								></dates>
								<searcher
									v-else-if 	  = "item_field.type == 'select_search'"
									:info_to_comp = "item_field"
									:list_to_comp = "render_listed(item_field.list)"
									@receive 	  = "info[item_field.key] = $event"
								></searcher>
								<v-combobox
									dense
									outlined						
									v-else-if			= "['combobox'].includes(item_field.type)"
									color 				= "primary"
									v-model 			= "info[item_field.key]"
									:label 				= "item_field.text"
									:items 				= "render_listed(item_field)"
									:menu-props 		= "{ offsetY: true, maxHeight: '200px' }"
									:item-text 			= "item_field.item_text"
									:item-value 		= "item_field.item_value"        
									:prepend-inner-icon = "item_field.icon"
									append-icon 		= "mdi-chevron-down"
									@change     		= "actions(item_field, $event)"
									:readonly 		= "item_field.isReadOnly"
									class = "text-uppercase"
								></v-combobox>
								<component
									v-else-if = "item_field.type == 'component'"
									:is = "item_field.component"
									:keyField = "item_field.key"
									:inputField = "info"
									:isDisabled =  "item_field.isReadOnly"
									:valueField = "item_field.item_value"
									:isAutofocus = "item_field.isAutofocus"
								></component>
								<v-card outlined
									v-else-if   = "item_field.type == 'multi-text' "
								>
									<v-card-title
										class = "body-2 info pa-1 white--text"
									>
										<span>
											{{ $t(item_field.text) }}
										</span>
									</v-card-title>
									<v-card-text
										class = "pa-1"
									>
										<v-row
											dense

										>
											<template 
												v-for = "(item_field_sub, idx_sub) of item_field.sub_fields"
											>
												<v-col
													:key = "idx_sub"
												>
													<v-text-field
														dense
														outlined
														hide-details
														:label 		= "$t(item_field_sub.text)"
														v-model 	= "info[item_field_sub.key]"
														:type 		= "item_field_sub.type"
														v-if 		= "['text', 'number', 'email'].includes(item_field_sub.type)"
														@input 		= "(v) => info[item_field.key] = v.toUpperCase()"
														class = "text-uppercase"
													></v-text-field>
												</v-col>
											</template>
										</v-row>
									</v-card-text>
								</v-card>
								<!-- <searcher
									v-else-if 	  = "item_field.type == 'select_search'"
									:info_to_comp = "item_field"
									:list_to_comp = "render_listed(item_field.list)"
									@receive 	  = "info[item_field.key] = $event"
								></searcher> -->
							</v-col>
						</template>
					</v-row>
					<v-divider></v-divider>					
				</v-card-text>
				<v-card-actions>
					
					<v-spacer></v-spacer>
					<v-btn
						
						color  = "primary"
						@click = "actions({action : btn.title})"
					>
						{{ $t(btn.title) }}
					</v-btn>
					<v-spacer></v-spacer>

				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>
<script  type = "text/javascript" >
	// src  = "./js/triage_classification.js"
import classification_fields from "@/views/js/classification.js"
import dates 				 from "@/helpers/dates.vue"
import searcher  			 from "@/helpers/searcher.vue"
import MenuTypeDocumentComponent from "@/components/info/MenuTypeDocumentComponent.vue"
import MenuGenderComponent from "@/components/info/MenuGenderComponent.vue"
import MenuCurrentAdministratorComponent from "@/components/info/MenuCurrentAdministratorComponent.vue"
import MenuLevelTriage from "@/components/info/MenuLevelTriageComponent.vue"


export default{
	name : "TriageClassificationView",
	components : {
		searcher,
		dates,
		MenuTypeDocumentComponent,
		MenuGenderComponent,
		MenuCurrentAdministratorComponent,
		MenuLevelTriage,
	},
	data : () => ({
		title 			: "Clasificación de Pacientes",
		ref 			: "triage",
		search 			: "",
		info 			: {
			age 			: 0,
			level 			: "Urgencia",
			userPosition 	: "", 
			size : null,
			weight : null,
			imc : null,
		},
		info_process   	: {},
		info_attention 	: {},
		info_fields 	: classification_fields,
		check 			: { 
			attention : true 
		},
		btn 			: {
			title : "save" 
		},
		show 	: {
			patient : true,
			triage  : false,
			Obstetrics : false,
			fur : false,
			tg : false,
			fpp : false,
			ho : false,
			pregnancyTime : false,
			cause : false,
			cytology : false,
			result : false,			
		},
		list_eps 		    : [],
		list_administrators : [],
		list_docs 			: [
			"C.C",
			"T.I",
			"R.C",
			"N.V",
			"N.N",
			"P.E",
		],
		requests : {
			create 	: "",
			update 	: "",
			del 	: "",
			get 	: "",
		},
		conditions_genders : [],

	}),	//data

	watch:{
		"info.size" :function(val){			
			this.actions({action : "setISC"})			
		},
		"info.weight": function(val){			
			this.actions({action : "setISC"});			
		},

	}, // watch

	created(){	
		this.getInfoPatient();
	}, 

	computed : {
		render_fields : function(){
			return this.info_fields;
		}, // render fields
		currentPatient(){
			return this.$store.getters["infoPatient/patient"];
		},
		currentPermission(){
			return this.$store.getters["auth/getPermission"]("TriageClassification") 
		}

	}, // computed

	methods: {
		actions(action, item, option){
			if (action) {
				if (action.action == "show_gender") {
					let is_show = false;
					if (this.info.GenderId != 2) {
						is_show = true;
					}					
					this.show.Obstetrics = is_show;
					this.show.fur = is_show;
					this.show.tg = is_show;
					this.show.fpp = is_show;
					this.show.ho = is_show;
					this.show.pregnancyTime = is_show;
					this.show.cause = is_show;
					this.show.cytology = is_show;
					this.show.result = is_show;

				}else
				if (action.action == "save") {
					this.save();
				}else
				if (action.action == "update") {
					this.update();
				}else
				if (action.action == "setISC") {
					const { weight, size} = this.info;
					if (weight && size) {
						this.info.isc = Math.sqrt((parseInt(weight)*parseInt(size))/3600).toFixed(2);
						this.info.imc = (parseInt(weight)/Math.pow(parseFloat(size), 2)).toFixed(2);
					}
					// console.log("SET ISC ", this.info.isc)
				}
			}

		}, // actions

		render_info(){
			this.info_process.numberAttention 	= this.$route.params.id;
			this.info.AttentionId 				= this.$route.params.id;
			// this.info.numberId 				  	= item.numberId;			
			this.info_attention 				= this.currentPatient//this.$Helper.get_local("Attention");
			if (this.currentPatient && this.currentPatient.HistoryPerson) {				
				// this.$ManagerSmith.formatInfoPerson(this.currentPatient, this.info, "basic");
				const {name,lastName,GenderId, age, numberId, TypeIDId, currentAdministratorName, phone, cellphone, address, email } = this.currentPatient.HistoryPerson;
					this.info={
						...this.info,						
						LevelTriageId : "",
						name,
						lastName,
						GenderId,
						age,
						numberId,
						TypeIDId,
						assignedAdministrator : currentAdministratorName,
						phone,
						cellphone,
						address,
						email,
						HistoryPersonId : this.currentPatient?.HistoryPersonId,
					}
				this.info.date 			  		= this.$ManagerSmith.getDateCurrent(this.currentPatient.assignedDate);				
			}else{
				this.info.date 			  		= this.$ManagerSmith.getDateCurrent();								
			}
			this.info.userPosition = this.$store.getters["auth/userAndRoleString"];
			this.info.professionalCardNumber = this.$store.getters["auth/getProfessionalCardNumber"];
			this.info.hour 						= this.$ManagerSmith.getTimeCurrent();
			// console.log("INFO ", this.info, this.currentPatient)
			this.get_info();
		}, // render info

		get_info(){					
			if (this.info_process.numberAttention) {				
				const  api1	= "/api/v1/find/triage";
				this.$Axios.post(api1,{
					AttentionId : parseInt(this.info_process.numberAttention)
				}).then(res => {
					// console.log(" triage get ",res.data)
					if (res && res.data) {
						// this.info 		= { ...this.info, ...res.data };
						// this.$ManagerSmith.formatInfoClassification(res.data, this.info);
						if (res.data.HistoryInfoMedicPerson) {
							this.info = { ...this.info,  ...res.data.HistoryInfoMedicPerson, ...res.data };
							// this.info.HistoryInfoMedicPersonId = res.data.HistoryInfoMedicPerson.id;
							this.info.id = res.data.id;
							// console.log("INFO ", this.info)
						}						
						this.actions({action : "show_gender"});
						this.btn.title 	= "update"; 
					}else{
						this.$EventBus.$emit("notifications",{
							type : "warning",
							msg  : this.$t("no_triage_information_found")
						})
						
					}
				}).catch( er => {
					console.log("Error get info triage : ", er);
				})
			}


		}, // get info
		getInfoPatient(){			
			this.$store.dispatch("infoPatient/getInfo", this.$route.params.id).then(res=>{				
				this.render_info();
			});
		},

		save(){
			if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
				if (!this.info.LevelTriageId || !this.info.motive) {
					this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nivel de triage y Motivo"});
				}else{

					let info_up = this.info;
					const  api 	= "/api/v1/triage"; //"/ConsultaExterna/triage";				
					if (info_up  && info_up.medicalSignature && info_up.medicalSignature.User) {
						info_up.medicalSignature = info_up.medicalSignature.User.name;
					}
					info_up.UserId = this.$store.getters["auth/userId"];					
					this.$EventBus.$emit("notifications",{
						type 	: "primary",
						loading : true,
						msg 	: this.$t("saving_information")
					});
					this.$Axios.post(api, info_up).then(res =>{										
						if (res && res.error) {
							this.$EventBus.$emit('notifications',{
								type 	: 'error',
								msg 	: res.error.response.data.message ||  res.error.response.data || "Realizando Triage de Paciente" 
							});
						}else if (res && res.data) {

							this.btn.title = "update";
							this.$router.go(-1);
							this.$EventBus.$emit('notifications',{
								type 	: 'success',
								msg 	: 'Triage Realizado',
							});
						}

						// this.info = res.data;
					}).catch(er => {
						console.log("Error patient triage", er);
						this.$EventBus.$emit('notifications',{
							type 	: 'error',
							msg 	: er.response.data.message ||  er.response.data || "Realizando Triage de Paciente" 
						});
					});
				}
			}
			
		}, //save

		render_listed(item){
			if (item) {
				// console.log("render_listed ", item,this.$ManagerSmith.render_listed(item))
				if (item.global_list) {
					return this.$ManagerSmith.render_listed(item);
				}else
				if (typeof item.list == "string") {
					return this[item];
				}else if (item.list && item.list.length > 0){
					return item.list;
				}
			}
			return [];
			
		}, // render listed
	
		update(){
			if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {
				if (!this.info.LevelTriageId || !this.info.motive) {
					this.$EventBus.$emit("notifications", { type : "warning" , msg : "Se requiere Nivel de triage y Motivo"});
				}else{
					let info_up = this.info;//this.$Helper.builder(this.builder, this.info);
					if (info_up && info_up.id) {

						const  api 	= "/api/v1/triage/" + this.info.id; //"/ConsultaExterna/triage";								
						if (info_up  && info_up.medicalSignature && info_up.medicalSignature.User) {
							info_up.medicalSignature = info_up.medicalSignature.User.name;
						}
						this.$Axios.put(api, info_up).then( res =>{				
							if (res && res.error) {
								this.$EventBus.$emit('notifications',{
									type 	: 'error',
									msg 	: res.error.response.data.message ||  res.error.response.data || "Realizando Actualizacion de Triage" 
								});
							}else if (res && res.data) {
								this.$EventBus.$emit('notifications',{
									type 	: 'success',
									msg 	: "Clasificacion actualizada",
								});
							}			
							
						}).catch(er => {
							console.log("Error patient ", er);
							this.$EventBus.$emit('notifications',{
								type 	: 'error',
								msg 	: er.response.data.message ||  er.response.data || "Error Actualizando Paciente"
							})
						});
					}else{
						this.$EventBus.$emit("notifications",{
							type : "warning",
							msg  : this.$t("require_id_update")
						})
					}
				}
			}
		},

		del(){

		},


	}, //methods

};// export default
</script>