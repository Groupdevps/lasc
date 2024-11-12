<template>
	<v-card
		class = "mb-2"
	>
		
	<v-row
		dense
	>
		<template
			v-for = "(item_field, idx_serv) of fields"
		>
			
			
			<v-col
				:cols 	= "item_field.cols"
				v-show 	= "show[item_field.key]"
				:key 	= "ref + idx_serv + item_field.key"
			>
				<v-text-field
					dense
					outlined
					hide-details
					v-model = "info[item_field.key]"
					:label  = "$t(item_field.text)"
					v-if 	= "['text', 'number'].includes(item_field.type)"
					
				></v-text-field>
				<v-select
					dense
					outlined
					hide-details
					return-object
					:label 				= "$t(item_field.text)"
					v-model 			= "info[item_field.key]"
					:items 				= "render_listeds(item_field)"
					:item-key 			= "item_field.item_value"
					:item-text  		= "item_field.item_text"
					v-else-if 			= "'select' == item_field.type"
					:prepend-inner-icon = "item_field.icon"
					@input 				= "actions(item_field)"
					:disabled 			= "disabled[item_field.key]"
					:key 				= "ref + idx_serv + 'select' + item_field.key"
					
				>
				</v-select>	
				<dates
					:key 				= "'time_picker'+ ref + item_field.key"
					v-else-if		    = "['date_range',
										  'time_picker'].includes(item_field.type)
										"
					:info_to_component  = "item_field"
					:info_to_dates 	    = "info[item_field.key]"
					@receive_info	    = "actions(item_field, $event)"
				></dates>
			</v-col>
		</template>

		<template v-for = "(option, idx_option) of service_options">
			<v-col
				:key  = "ref + 'service' + option.key"
				:cols = "option.cols"
				v-show = "show[option.key]"
			>
				<!-- v-if   = "option.type == 'space'" -->
								
				<v-btn						
					v-if   = "option.type == 'btn'"			
					:color = "option.color"
					@click = "actions(option)"
				>
					{{ $t(option.text) }}
				</v-btn>	
			
			</v-col>

		</template>

		<v-col
			:cols = "12"
		>

			<v-data-table
				dense
			    :headers 			 = "headers"
			 	:items 	 			 = "list_render"
			    class 	 			 = "elevation-5"			    
			    :hide-default-footer = "height_table < 56 ?  true : false"
			   	:options.sync 		 = "options"
			   	:server-items-length = "total"
			   	:footer-props 		 = "{
			   		showFirstLastPage   : true,
			   		itemsPerPageOptions : [15, 30],
			   		showCurrentPage     : true
			   	}"
			   	loading-text 		= "Cargando... Por favor espere"
			    :height 			= "height_table + 'px'"
			    item-key 			= "index"
			    :loading 			= "loading"
			    v-show 				= "show.table"
			    fixed-header
			>
				<template
					v-slot:top
				>
					<v-card>
						<v-card-title
							class = "caption text-uppercase primary--text font-weight-bold"
						>
							<span class = "mx-1">
								{{ $t("recent_services") }}
							</span>
							<v-divider color = "primary"></v-divider>
						</v-card-title>
						<v-card-text
							class = "pa-0"
						>
							<v-row dense>
								<v-col cols = "4">
									<v-select
										dense
										outlined
										hide-details
										return-object
										:label 				= "$t('state')"
										v-model 			= "search['status']"
										:items 				= "render_listeds({ global_list : 'status'})"
										:item-key 			= "'id'"
										:item-text  		= "'name'"
										prepend-inner-icon 	= "mdi-state-machine"
										@input 				= "actions({action : 'filter_recent'})"
										:key 				= "ref  + 'select' + 'status_recent'"
										
									></v-select>
										
										<!-- v-else-if 			= "'select' == item_field.type" -->
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</template>
				<!-- <template
					v-slot:item.actions = "{ item }"
				>
					
					<v-btn-toggle
						mandatory						
						dark
					>
						<v-tooltip
							bottom
						>
							<template v-slot:activator = "{ on, attrs }" >
								
								<v-btn
									small
									@click 	= "continueService(item)"																
									v-bind 	= "attrs"
									v-on   	= "on"
									:key 	= "ref + 'continue_service_btn_option'"
									class  	= "white--text"
									color  = "primary"
									v-show  = "renderValidActionTable(item)"
								>
									
									Continuar Servicio
								</v-btn>
							</template>
							<span>
								Reactivar servicio
							</span>
						</v-tooltip>
				
					</v-btn-toggle>
				</template> -->
			</v-data-table>
		</v-col>


		
	</v-row>
	
	</v-card>
</template>		
<script  type = "text/javascript">
 	// src  = "./js/servicesJS.js"
	import calendar from "@/components/info/calendar.vue"
	import dates 	from "@/helpers/dates.vue"
	import AttentionService from "@/services/AttentionService";
	import serviceFields from "@/models/fields/ServiceFields"
export default{
	name 		: "services",
	props 		: [
		"info_to_component", 
		"ref_to_component",
		"update_to_component",		
		"reference_form",
		"route",
		"serviceSelected",

	],
	components 	: {
		calendar,
		dates
	}, // components
	data 		: (vm)=>({
		ref 			: "services",
		info 			: {},
		info_item 		: null,		
		info_patient 	:  null,
		info_attention  : null,
		show 			: {
			calendar 		: false,
			doctor 			: false,
			assignedDate 	: false,
			hour 			: false,
			service 		: true,
			space 			: true,
			status 			: false,
			table 			: false,
			keep_service 	: false,
			generate 		: false,
			moderating_fee_value : false,
			sub_service  		 : false,
			program  			 : false,
			update_status 		 : false,
			spacer   				: true,
			spacer1 				: true,
		}, 
		list 		: [],
		headers 	: [
			{ text : vm.$t("date"), value : "assignedDate", },
			{ text : vm.$t("hour"), value : "hour", },			
			{ text : vm.$t("timeElapsed"), value : "timeElapsed", },						
			{ text : vm.$t("service"), value : "TypeService.name", },
			{ text : vm.$t("state"), value : "Status.name" },			
			// { text : vm.$t("actions"), value : "actions", }
		],
		options 	 	: { itemsPerPage : 30 },
		total 		 	: 0,
		height_table 	: 150,				
		loading 	 	: false,
		turns 			: [{ id : 1 , time : "06:20", medicoId : 1 }],
		disabled 		: {
			service: false,
		},
		fields 		 	: serviceFields,
		service_options 		: [
			{
				key  : "spacer",
				type : "spacer",
			},
			{
				key 	: "generate",
				color 	: "success",
				type 	: "btn",
				icon 	: "mdi-",
				tooltip : "",
				text 	: "generate_attention",
				action  : "generate_attention",
				cols 	: 2,
			},
			{
				key 	: "update_status",
				type 	: "btn",
				color 	: "success",
				icon 	: "mdi-",
				tooltip : "",
				text 	: "update_status",
				action  : "update_status",
				cols 	: 2,
			},
			{
				key  : "spacer1",
				type : "spacer",
			}	

			
		],
		search 			: {},
		list_actions 	: [
			// {
			// 	key 	: "continue_service",
			// 	color 	: "primary",
			// 	icon 	: "mdi-",
			// 	text 	: "continue_service",
			// 	tooltip : "continue_service_msg",
			// 	text 	: "re_enter",
			// 	action  : "continue_service",
			// 	show 	: false,				

			// },
		],
		isRoute 		: false,
		intervalService : null,
	}), // data

	watch : {
		update_to_component: function(val){
			if (val) {				
				this.render_info(val);
			}
		}, //

		options : {
			handler(val){			 
				this.searchInfoPatient(val);
			}, deep : true
		}, // options

		serviceSelected: function(val){			
			if(val){
				this.renderService();
			}
		}


	}, // watch

	created(){
		if (this.update_to_component) {
			this.render_info(this.update_to_component);
			this.renderService();			
		}
		if (this.info_to_component) {
			this.render_info_service(this.info_to_component);
		}		
		if(this.serviceSelected){ // admissions
			this.renderService()
		}
	}, // created

	computed : {
		list_render : function(){
			return this.list;
		},
		
	}, // computed

	methods : {
		actions(action, item, option){
			if (action) {
				// console.log("ACtion ", action, " item ", item, " option ", option);
				if (action.action == "set_service") {
					// console.log("set_service ", this.info.service);
					// this.show.status = false;
					this.info.program 			= "";
					this.info.sub_service		= "";
					this.info.hour 				= "";
					this.info.assignedDate 		= "";
					this.show.program 			= false;
					this.show.doctor 			= false;
					this.show.assignedDate  	= false;
					this.show.hour 				= false;
					this.show.sub_service 		= false;

					this.show.status 			= true;
					// console.log("service ", this.info.service.name)
					if (this.info.service.name == "Urgencia" ) {						
						this.info.status 			= this.$ManagerSmith.getStatusProcess(1);
						this.show.generate			= true;
						
					}else
					if (this.info.service.name == "Uci") {
												
					}else
					if (this.info.service.name == "consulta externa 1er Nivel"){
						this.show.sub_service 		= true;
						this.show.status 			= false;

					}
					if(this.info_patient){

						const { ServiceProvider } = this.info_patient;					
						this.request({
							url  		: "/api/v1/moderator",
							type 	 	: "post",
							key_main 	: "info",
							key 	 	: "moderating_fee_value",
							body 		: {...ServiceProvider},
							
						});
					}
				}else if(action.action == "set_sub_service"){
					// console.log("this.info.sub_service", this.info.sub_service)
					if (this.info && this.info.sub_service) {
							this.show.generate 			= false;
							this.show.doctor 			= false;
							this.show.assignedDate  	= false;
							this.show.hour 				= false;	
							this.info.hour 				= "";
							this.info.assignedDate 		= null;
							this.info.doctor 			= null;		
							this.info.program 			= "";		
							this.show.program 			= false;
							this.show.status 			= false;

							// nutricion && psicologia



						if (["Odontologia", "Medicina general"].includes(this.info.sub_service.name)) {
							this.info.program 			= "";
							this.show.doctor 			= true;
							this.show.assignedDate  	= true;
							this.info.status 			= this.$ManagerSmith.getStatusProcess(11);
						}else if (["Programas"].includes(this.info.sub_service.name)) {
							this.show.program 			= true;

						}
					}
				}else
				if (action.action == "set_program") {
					this.show.status 			= true;
					this.info.status 			= this.$ManagerSmith.getStatusProcess(11);
					this.show.generate 			= true;

				}
				else
				if (action.action == "get_times") {
					this.show.generate			= true;


				}else
				if (action.action == "assigned_date") {					
					if (this.show.assignedDate) {						
						this.info.assignedDate 		= item;
						// console.log("assignedDate ", this.info.assignedDate.length)
						let info_up = { ...this.info };
						
						if (this.info.assignedDate && this.info.assignedDate.length > 8) {
							this.show.hour 				= true;

							this.request({
								url 			 	: "/api/v1/find/turns",
								type 				: "post",
								body 				: { ...info_up },
								action 				: "set_turns",
								// notification 		: "attention_generated",
								// type_notification  	: "success",
								// error_notification 	: "error_generate_attention"
							});
							this.generate_turns();
						}
					}
				}else
				if (action.action == "set_status") {
					const { serviceAso } = this.info.service; 
					if (!this.isRoute) {

						if (serviceAso != 9) {
							this.show.generate			= true;					
						}else if (this.info.hour) {
							this.show.generate			= true;					
						}
					}
					// if (this.isRoute) {
						// this.show.generate			= false;		
					// }
				}else
				if (action.action == "generate_attention") {
					this.saveAttention();
				}else if (action.action == "update_status") {
					const { id } = this.info.status;
					if (this.info_attention && this.info_attention.id)  {

						this.$ManagerSmith.updateStatusPatient({
							id 		: this.info_attention.id,
							body 	: {
								StatusId : id
							},
							redirect_back : true,
							notification : this.$t("patient_status_changed")
						});
					}
				}
				else if (action.action == "continue_service") {
					if (item && item.Status && item.Status.name == "Cita Medica" && false) {
						item.Status 	= this.$ManagerSmith.getStatusProcess(12);
						item.StatusId 	= 12; 

					}else{

						item.Status 	= this.$ManagerSmith.getStatusProcess(1);
						item.StatusId 	= 1; 
					}

					// this.$ManagerSmith.updateStatusPatient({
					// 	id 		: item.id,
					// 	body 	: {
					// 		StatusId : 1
					// 	},
					// 	notification : "patient_status_changed"
					// });

				}else if(action.action == "filter_recent"){
					if(this.search &&  this.search.status){
						this.search.StatusId = this.search.status.id;
					}
					this.searchInfoPatient();
				}

			}
		}, // actions

		render_info(item){
				
			if (item && !this.isRoute) {
				// console.log("check request patient ", item)
				this.info_patient = { ...item }; 
				this.show.table   = true;
				if (item.person && item.person.numberId) {
					this.search = { ...this.search, patient : item.person.numberId };
					// console.log("options page ", this.options)
					if (this.options && this.options.page) {
						this.searchInfoPatient();
					}
				}
				
			}
		}, // render info 
		renderService(){
			if(this.serviceSelected){
				let serviceId = 1;
				let statusId = 1;
				let serviceText = "Urgencia";
				let serviceObj = {};
				if(this.serviceSelected == "urgency"){
					serviceText = "Urgencia";				
					serviceObj = {
						"id": 1,
						"name": "Urgencia",
						"state": true,
						"description": null,
						"ServiceCategoryId": 1,
						"createdAt": "2024-01-16T06:14:00.288Z",
						"updatedAt": "2024-01-16T06:14:00.288Z",
						"ServiceCategory": {
							"id": 1,
							"name": "Servicios",
							"active": true,
							"TypeServiceId": null,
							"createdAt": "2024-01-16T06:14:00.288Z",
							"updatedAt": "2024-01-16T06:14:00.288Z"
						}
					}
				}else if(this.serviceSelected == "externalConsultation"){					
					serviceText = "consulta externa 1er Nivel"
					serviceObj = {
						"id": 5,
						"name": "consulta externa 1er Nivel",
						"state": true,
						"description": null,
						"ServiceCategoryId": 1,
						"createdAt": "2024-01-16T06:14:00.288Z",
						"updatedAt": "2024-01-16T06:14:00.288Z",
						"ServiceCategory": {
							"id": 1,
							"name": "Servicios",
							"active": true,
							"TypeServiceId": null,
							"createdAt": "2024-01-16T06:14:00.288Z",
							"updatedAt": "2024-01-16T06:14:00.288Z"
						}
					}
				}
				const val = this.$ManagerSmith.getServiceByName(serviceText);

				if(val){
					serviceId = val.id;
					clearInterval(this.intervalService);
					serviceObj = {...val}
					this.intervalService = null;
				}else{
					if(!this.intervalService){
						this.intervalService  = setInterval(()=>{
							this.renderService();
							clearInterval(this.intervalService)
						},2500)
					}
				}
				if(serviceId){
					this.disabled.service 	= true;
					this.disabled.status 	= true;
					this.show.status 		= true;
					this.show.generate			= true;		
					
					this.info.service = {...serviceObj};														
					const statusManager = this.$ManagerSmith.getStatusProcess(statusId);
					if(statusManager){
						this.info.status  = statusManager;;
					}						
					this.actions({action:"set_service"})
				}
				// console.log("SERVICE ", this.serviceSelected , val, serviceText)
				
			}
		}, 
		async saveAttention(){
			try {
				const { status, hour, doctor, service, sub_service, program, assignedDate } = this.info;
				const { person, Relationships, Companion, Address , ServiceProvider} = this.info_patient;
				// console.log(" generar servicio ", this.info_patient, this.info);
				if (person.id) {
					let doctorId  	= null;
					let companion 	= null;
					let serviceId 	= null;	
					let statusId   	= 1;
					let statusName 	= null;
					if (Relationships &&  Relationships.length > 0 && Relationships[0]) {
						companion 					= Relationships[0].numberId;
						// person.companionName 		= Relationships[0].name + " " + Relationships[0].lastName;
						// person.TypeRelationshipName = this.$ManagerSmith.get_relationshipId_string(Relationships[0].TypeRelationshipId);
						person.CompanionId			= Relationships[0].id;
					}

					if (Companion && Companion.length > 0 && Companion[0]) {
						companion 					= Companion[0].numberId;
						// person.companionName 		= Companion[0].name + " " + Companion[0].lastName;
						// person.TypeRelationshipName = this.$ManagerSmith.get_relationshipId_string(Companion[0].TypeRelationshipId);
						person.CompanionId			= Companion[0].id;							
					}
					/*
					if (person.MaritalStatusId) {
						person.MaritalStatusString = this.$ManagerSmith.getNameMaritalStatusById(person.MaritalStatusId);
					}
					if (Address) {
						person.city 	= Address.cityString;
						person.district = Address.district;
						person.state 	= Address.stateString;
						person.address 	= Address.address;
						const zone_temp = this.$ManagerSmith.getZoneById(Address.zone);	
						person.zone 	= zone_temp && zone_temp.name ? zone_temp.name  : null;
					}

					if (ServiceProvider) {						
						// console.log("SERVICE PROVIder ", ServiceProvider)
						let regimeTemp = "";
						
						if(ServiceProvider.regime){
							regimeTemp = this.$ManagerSmith.getNameRegimenById(ServiceProvider.regime)
						}	
						person.currentAdministratorNit  = ServiceProvider.nit || (ServiceProvider && ServiceProvider.administrator ? ServiceProvider.administrator.nit : "") || "N/A"; //this.$ManagerSmith.getNitAdministratorByName(ServiceProvider.assignedAdministrator);
						person.currentAdministratorName = ServiceProvider.assignedAdministrator || (ServiceProvider && ServiceProvider.administrator ? ServiceProvider.administrator.name : "") || "N/A";	
						person.regime			 = regimeTemp;
					}*/

					if (service && service.id) {
						serviceId = service.id
					}
					if (sub_service){
						serviceId = sub_service.id;
					}
					if (program){
						serviceId = program.id;
					}
					if (status) {
						statusId  	= status.id; 
						statusName  = status.name;
					}
					if (doctor && doctor.User && doctor.User.id) {
						doctorId 	=  doctor.User.id;
					}
					if (serviceId) {

						let info_up = {							
							TypeServiceId 	 : serviceId,
							StatusId 		 : statusId,
							stateString  	 : statusName,
							assignedDate 	 : assignedDate ? assignedDate : this.$ManagerSmith.getDateCurrent(),
							hour 		 	 : hour ? (hour.hour + ':00') : this.$ManagerSmith.getTimeCurrent(),
							patient 	 	 : parseInt(person.numberId),
							PersonId 	 	 : person.id,
							// Person  		 : person,
							companion 	 	 : companion,
							doctorId,
							CenterId 		 : this.$store.getters["infoCenter/getCenterId"],//this.$ManagerSmith.getMyCenterId(),
							UserId 		 	 : this.$store.getters["auth/userId"],

						};
						
						// delete info_up.id; 
						
						const service = new AttentionService();
						const res = await service.saveAttention({...info_up});	
						if (res && res.error) {
							this.$EventBus.$emit("notifications",{ type : "warning", msg  : res.error.response.data.message || res.error.response.data || "Generando Servicio"})							
						}else				
						if(res && res.data){						
							this.$EventBus.$emit("notifications",{ type : "success", msg  : this.$t("service_generated")})
							this.searchInfoPatient();
						}
					}else{
						this.$EventBus.$emit("notifications",{
							type 	: "warning",
							msg 	: this.$t("error_loading_service_reload_page"),
						})
					}
				}else{
					this.$EventBus.$emit("notifications",{
						type 	: "warning",
						msg 	: this.$t("patient_info_required"),
					})
				}
			} catch (error) {
				console.warn("Error save attention ", error)
				this.$EventBus.$emit("notifications",{
					type : "warning",
					msg  : error.response?.data?.message || error.response?.data || "Generando Servicio", 
				})

			}
		},
		render_info_service(item){
			if (item) {				
				if (this.route) {
						this.isRoute 		 	= true;
						this.disabled.service 	= true;
						this.show.status 	  	= true;
						this.show.table   		= false;					
						if (item.info_attention) {
							this.info_attention     = item.info_attention;
							const { TypeService, Status } = item.info_attention;
							this.info.service = TypeService.name; 
							this.info.status  = Status.name;
						}					
					if (this.route == "DashboardMedico") {
						this.show.update_status = true;
					}else if (this.route == "DashboardNursing"){
						this.show.update_status = true;
						
					}
				}

			}
		}, // render_info_service

		render_listeds(item){
			if (item) {
				if (item.global_list || typeof item.list === "object") {
					return this.$ManagerSmith.render_listed(item)
				}else if (typeof item.list === "string" && this[item.list] && this[item.list].length > 0) {
					return this[item.list];
				}
			}		
			return [];

		}, // render_listeds

		request(req){
			if (req) {
				this.loading = true;
				this.$Axios[req.type](req.url, { ...req.body } ).then(res => {
					this.loading = false;
					if (res && res.data) {
						if (req.key && req.key_main) {
							this[req.key_main][req.key] = res.data;
						}else
						if (req.key && req.key != "list") {
							this[req.key] = res.data; 
						}
						if (req.key == "list") {
							this.list = this.formatList(res.data.rows);
							if (res.data.count) {
								this.total = res.data.count;
							}else{
								this.total = this.list.length ;
							}
						}
						if (req.action) {
							this.actions({action : req.action}, res.data);
						}
						if (req.notification) {
							this.$EventBus.$emit("notifications",{
								type 	: req.type_notification,
								msg 	: this.$t(req.notification),
							})
						}
						if (req.update_recent) {
							this.searchInfoPatient();
						}
					}
				}).catch(er => {	
					this.loading = false;					
					console.warn("Error request info ", er);
					if (req.notification) {
							this.$EventBus.$emit("notifications",{
								type 	: "error",
								msg 	: this.$t(req.error_notification),
							})
						}
				})
			}
		}, // get info

		async searchInfoPatient(){
			try{
				this.loading = true;
				const {page , itemsPerPage} = this.options;
				const service = new AttentionService();
				const res = await service.searchAttentionsByParams({...this.search},{page, itemsPerPage});			
				if (res && res.data) {
					this.list = this.formatList(res.data.rows);
					if (res.data.count) {
						this.total = res.data.count;
					}else{
						this.total = this.list.length ;
					} 
				}
				
			}catch(error){
				console.warn("Error get info patient ", error)				
			}finally{
				this.loading = false;				
			}
			
		}, // searchInfoPatient

		generate_turns(){
			let start_hour  = 6;
			let end_hour  	= 17;
			let interval    = 20;			
			let iter  		= 0;
			let temp 		= [];
			while (start_hour <= end_hour){
				let min = iter < 10 ? '0'+iter : iter;
				temp.push({
					hour : `${start_hour}:${min}`,
				})
				iter += interval;
				if (iter >= 60 ) {
					start_hour++;
					iter = 0;
				}

			}
			this.turns = temp;
		}, // generate turns

		formatList(items){
			if (items && items.length > 0) {
				items.forEach((it)=>{
					if (it.assignedDate && it.hour) {
						const {assignedDate , hour } = it; 
						const time_elapsed = this.$ManagerSmith.getAge(`${assignedDate} ${hour}`);
						it.timeElapsed = time_elapsed;
					}
				})
			}
			return items
		}, // formatList

		renderValidActionTable(item){
			if (item.timeElapsed) {				
				if (item.timeElapsed.includes('Horas') && parseInt(item.timeElapsed) <= 24 && item.Status && item.Status.name != "EN ESPERA") {
					return true;
				}
			}
			return false;
		}, // renderValidActionTable
		async continueService(item){
			
			try{
				this.loading = true;
				const {page , itemsPerPage} = this.options;
				const service = new AttentionService();
				const res = await service.updateAttention({id : item.id, StatusId:1});			
				if (res && res.data) {
				
				}
			}catch(error){
				console.warn("Error update status patient ", error)				
			}finally{
				this.loading = false;				
			}
		},

		
	}, // methods
};
</script>