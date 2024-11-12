<template>
	<v-data-table
		dense
	    :headers 			 = "headers"
	 	:items 	 			 = "list_render"
	    class 	 			 = "elevation-5"			    
	    :hide-default-footer = "false"
	   	:options.sync 		 = "options"
	   	:server-items-length = "total"
	   	:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [15, 30],
	   		showCurrentPage     : true
	   	}"
	   	loading-text 		= "Cargando... por favor espere"
	    :height 			= "height + 'px'"
	    item-key 			= "index"
	    :loading 			= "loading"
	    fixed-header
	>
		<template v-slot:top >
			<v-toolbar>
				<v-row
					dense
				>
					<template
						v-for = "(item_search, idx_search) of list_search"
					>
						<v-col
							:cols = "item_search.col" 
							v-show = "show[item_search.key]"
						>
							<v-text-field
								dense
								outlined
								hide-details
								v-if 			= "['text'].includes(item_search.type)"
								:type 			= "item_search.type"
								v-model 		= "search[item_search.key]"
								:label 			= "item_search.text"
								:placeholder	= "item_search.placeholder" 
								clearable
							>
								<template
									v-slot:prepend-inner-icon
								>
									<v-icon
										:color = "item_search.color_icon"
									>
										{{ item_search.icon}}
									</v-icon>
								</template>
							</v-text-field>
							<v-text-field
								dense
								outlined
								hide-details
								v-if 			= "['number'].includes(item_search.type)"
								:type 			= "item_search.type"
								v-model.number	= "search[item_search.key]"
								:label 			= "item_search.text"
								:placeholder	= "item_search.placeholder" 
								clearable
							>
								<template
									v-slot:prepend-inner-icon
								>
									<v-icon
										:color = "item_search.color_icon"
									>
										{{ item_search.icon}}
									</v-icon>
								</template>
							</v-text-field>
							<v-select
								dense
								outlined
								hide-details
								v-else-if 		= "['select'].includes(item_search.type)"								
								v-model 		= "search[item_search.key]"
								:items 			= "render_listed(item_search)"
								:item-value 	= "item_search.item_value"
								:item-text 		= "item_search.item_text"
								:label 			= "item_search.text"
								:placeholder	= "item_search.placeholder" 
								@change 		= "actions(item_search)"
								:return-object  = "item_search.return_obj"
								clearable
							>
								<template
									v-slot:prepend-inner-icon
								>
									<v-icon
										:color = "item_search.color_icon"
									>
										{{ item_search.icon}}
									</v-icon>
								</template>
							</v-select>
						
							<dates
								:key 				= "item_search.key + ref"
								v-else-if	 		= "item_search.type == 'date_range'"
								:info_to_component 	= "item_search"
								:info_to_dates 	    = "search[item_search.key]"
								@receive_info 		= "search[item_search.key] = $event"
							></dates>
							<v-btn
								v-else-if  = "item_search.type == 'btn' "
								:color = "item_search.color"
								@click = "actions(item_search)"
							>
								<v-icon>
									{{ item_search.icon }}
								</v-icon>
								{{ item_search.text }}
							</v-btn>
						</v-col>
					</template>
				</v-row>
			</v-toolbar>
		</template>

		<template
			v-for = "(item_opt, idx_opt) of list_options"
			v-slot:[`item.${item_opt.key}`] = "{ item, index}"
		>

			<v-btn-toggle
				mandatory
				v-if = "item_opt && item_opt.options && item_opt.options.length > 0"
				dark
			>
				<template 
					v-for = "(sub_opt, idx_sub) of item_opt.options"
				>				
					<v-tooltip
						bottom
					>
						<template v-slot:activator = "{ on, attrs }" >
							
							<v-btn
								dark
								small
								@click 	= "actions(sub_opt, item, index)"
								:color  = "render_color(sub_opt, item)"
								v-show  = "check_role(sub_opt)"
								v-bind 	= "attrs"
								v-on   	= "on"
								:key 	= "ref + idx_sub + 'btn_options'"
								class  	= "white--text"
							>
								<!-- :outlined = "sub_opt.isOutlined" -->
								<v-icon
									small
									:class = "sub_opt.class_icon"
								>
									{{ sub_opt.icon }}
								</v-icon>
								<span
									v-show = "sub_opt.show_text"
								>
									{{ render_column(item, sub_opt) }}
								</span>

							</v-btn>
						</template>
						<span>
							{{ $t(sub_opt.tooltip) }}
						</span>
					</v-tooltip>
				</template>
			</v-btn-toggle>
		</template>
		<template v-slot:item.CAU = "{ item, index}">
			<v-btn small :color = "item.colorCAU" class ="pa-1 pb-3"> 
				<v-input
					error-count ="2"
					disabled					
					error			
					:error-messages="[item.CAU, item.timeCAU]"	
					> 					
					</v-input>
			</v-btn>
		</template>
		<template v-slot:item.regime = "{item}">
			<span> {{  renderRegime(item)  }}</span>

		</template>
	</v-data-table>
</template>
<script type="text/javascript" >
	// src = "./js/agendas.js"
	import dates from "@/helpers/dates.vue"
import AttentionService from "@/services/AttentionService.js";
import laboratoryService from "@/services/LaboratoryResultService.js"
import agendaFields from "@/models/fields/AgendaFields.js"
export default {
	name 		: "agendas",
	components 	: {
		dates,
	}, // components
	data 		: (vm) => ({
		ref 		: "",
		info 		: {},
		info_item 	: {},
		user 		: {
			role : "admin",
		},
		list 		: [
		/*{
			id 			: 1,
			n_a 		: 0,
			date 		: new Date(),
			center 		: 2,
			numberId 	: 123,
			patient 	: "John Doe",
			state 		: "En espera",
			TypeService : {name  	: "Urgencia"},

		}*/
		],
		headers 	: [],
		height 		: 400,
		options 	: { itemsPerPage : 30 },
		total 		: 1,
		loading 	: false,
		search 		: {
			StatusId : "",
		},
		list_search 	: agendaFields,
		list_states 		: [],
		show 				: {
			TriageId : true,
			status  : true,
			numberId : true,
			date	: true, 
			btn 	: true,
		},
		list_options 		: [
			{
				key 	: "actions",
				options : [
					/*{
						key  		: "info_patient",
						action  	: "info_patient",						
						icon 		: "mdi-folder-information-outline",
						show_in 	: ["*"],
						tooltip 	: "info_patient"

					},*/
					{
						key  		: "admissions",
						action  	: "redirectl",
						icon 		: "mdi-hospital-building",
						redirect_to : "AuthorizationService", // dashboard_admission
						show_in 	: ["admissionist", "admin", "manager"],			
						showInRoute : ["admissions"],			
						tooltip 	: "admission_module",
						/*conditions  : [
							{ status : "En espera", redirect_to : "/triage_classification/"},
							{ status : "Revision Enfermaria", redirect_to : "/dashboard_nursing/"},
						],*/
					},
					{
						key  		: "nurse",
						action  	: "redirectl",
						icon 		: "mdi-medical-cotton-swab",
						redirect_to : "DashboardNursing",
						show_in 	: ["nurser", "admin", "manager"],						
						showInRoute : ["nursing"],
						tooltip 	: "nursing_module",
						conditions  : [
							{ status : "En espera", redirect_to : "TriageClassification"},
							{ status : "Revision Enfermaria", redirect_to : "DashboardNursing"},
						],
					},
					{
						key  		: "medico",
						action  	: "redirectl",
						icon 		: "mdi-stethoscope", // doctor
						redirect_to : "DashboardMedico",
						show_in 	: ["medico", "admin", "manager"],
						showInRoute : ["medico"],
						tooltip 	: "medical_module",
						conditions  : [
							{ status : "Revision Medica", redirect_to : "DashboardMedico"},
							// { status : "Triage", redirect_to : "/dashboard_nursing/"},
						],

					},
					{
						key  		: "billing",
						action  	: "redirectl",
						icon 		: "mdi-cash-register",
						redirect_to : "Invoice",
						show_in 	: ["invoicer", "admin", "manager"],
						showInRoute : ["billing"],
						tooltip 	: "billing_module",
						conditions  : [
							{ status : "Alta medica", redirect_to : "Invoice"},
							{ status : "Alta Enfermeria", redirect_to : "Invoice"},


						],
					},
					{
						key  		: "pharmacy",
						action 	 	: "redirectl",
						icon 		: "mdi-pill-multiple",
						redirect_to : "Dispatch",
						show_in 	: ["pharmacy", "invoicer", "admin", "manager"],
						showInRoute : ["pharmacy"],
						tooltip 	: "pharmacy_module",
						conditions  : [
							{ status : "Suplementos", redirect_to : "Dispatch"},
						],
					},
					{
						key  		: "laboratory",
						action 	 	: "redirectl",
						icon 		: "mdi-file-document-edit",
						redirect_to : "DashboardLaboratory",
						show_in 	: ["admin", "manager", "laboratory"],
						showInRoute : ["laboratory"],
						tooltip 	: "laboratory_module",
						conditions  : [
							{ status : "*", redirect_to : "DashboardLaboratory"},
						],
					}
				]
			},
			{
				key 	: "Status",
				options : [
					{
						key  		: "name",
						key_main   	: "Status", 
						action  	: "show_progress",
						icon 		: "mdi-progress-question",
						show_text 	: true,
						class_icon 	: "mr-1",
						show_in 	: ["*"],
						tooltip     : "process_status",
						// isDisabled  : true, 
						isOutlined  : true

					}
				], 
			},
			{
				key 	: "Triage",
				options : [
					{
						key  		: "LevelTriage",
						key_main   	: "Triage", 
						action  	: "show_progress",
						icon 		: "mdi-triangle",
						show_text 	: true,
						class_icon 	: "mr-1",
						show_in 	: ["*"],
						tooltip     : "triage_classification",
						// isDisabled  : true, 
						isOutlined  : true

					}
				], 
			}
		],
		
	}), // data

	created(){
		if (this.currentRoute) {
			this.render_search(this.currentRoute);
			this.renderHeaders(this.currentRoute);
		}

	}, // created

	watch : {
		options : {
			handler(){
				if (this.search && (this.search.status || this.search.numberId || this.search.date)) {
					this.get_search();					
					// this.get_list();
				}else{
					this.get_list();
				}
			}, deep : true,
		}
	}, // watch
	
	computed : {
		list_render : function(){			
			let listTemp = this.list;
			if(this.currentOptionService == 'urgency'){
				// 1
				listTemp = listTemp.filter(x => x && x.TypeServiceId && x.TypeServiceId == 1 );
			}else if(this.currentOptionService == 'externalConsultation'){
				// 5
				listTemp = listTemp.filter(x => x && x.TypeServiceId && x.TypeServiceId == 5 );
			}
			return listTemp;
		}, // list_render

		render_ref: function(){
			return this.ref = this.currentRoute + "Agendas";
		}, // render ref

		currentRoute :function(){
			return this.$route && this.$route.name ? this.$route.name : 'Agenda';
		},
		currentOptionService :function(){
			return this.$route && this.$route.params ? this.$route.params.option : 'urgency';
		}  


	}, // computed

	methods : {
		actions(action, item, option, index){
			// console.log("action ", action, item, option, index)
			if (action) {			
				if (action.action == "get_search") {
					this.get_search();
					// this.renderFilter();
				}else 
				if (action.action == "show_progress") {

				}else
				if (action == "redirectl" || action.action == "redirectl" ) {

					if (item) {
						let numberId;

						if (item.Person && item.Person.numberId) {
							numberId = item.Person.numberId
						}
						else
						if (item.patient) {
							numberId = item.patient;
						}
						if (action.redirect_to) {
							this.$Helper.set_local("Attention", item);
							let redirect = action.redirect_to; 
							if (action.conditions && action.conditions.length > 0 ) {
								action.conditions.some(x => {
									if (this.$ManagerSmith.getStatusNameProcess(item.StatusId) == x.status) {
										redirect = x.redirect_to;
										return true;
									}
								})							
							}							
							this.$router.push({ 
								name 	: redirect,
								params 	: {
									id 		 : item.id,
									numberId : numberId,
									option : this.$route.params.option
								}
							});							
						}
					}
				}else
				if (action.action == "redirect") {
					if (item.redirect_to) {
						window.open(item.redirect_to, "_blank");
					}
				}/*else
				if (action.action == "set_status") {
					if (this.search && this.search.status) {
						this.search.StatusId = this.search.status.id
					}
				}*/
			}
		}, //actions
		renderHeaders(route){
			// console.log("ROUTE ", route)
			let vm = this;
			if(route == "billing"){
				this.headers = [
					{ text : vm.$t("date"), value : "assignedDate" },
					{ text : vm.$t("hour"), value : "hour" },
					{ text : vm.$t("triage"), value : "Triage"},
					{ text : vm.$t("state"), value : "Status" },
					{ text : vm.$t("service"), value : "TypeService.name" },
					{ text : vm.$t("timeElapsed"), value : "timeElapsed" },
					{ text : vm.$t("eps"), value : "HistoryPerson.currentAdministratorName" },			
					{ text : vm.$t("regime"), value : "regime" },			
					{ text : vm.$t("document"), value : "HistoryPerson.numberId" },			
					{ text : vm.$t("patient"), value : "fullName" },
					{ text : vm.$t("CAU"), value : "CAU" },
					{ text : vm.$t("actions"), value : "actions" },
					// { text : vm.$t("numberId"), value : "numberId" },
					// { text : vm.$t("campus"), value : "Center.name" },
				];
				this.show.TriageId = true;
			}else if(route == "laboratory"){
				this.headers = [
					{ text : vm.$t("date"), value : "assignedDate" },
					{ text : vm.$t("laboratory"), value : "typeAnalysis"},
					{ text : vm.$t("state"), value : "Status" },
					{ text : vm.$t("document"), value : "HistoryPerson.numberId" },	
					{ text : vm.$t("patient"), value : "fullName" },
					{ text : vm.$t("actions"), value : "actions" },
				];
				this.show.TriageId = false;
			}else{
				this.show.TriageId = true;
				this.headers = [
					{ text : vm.$t("triage"), value : "Triage"},
					{ text : vm.$t("state"), value : "Status" },
					{ text : vm.$t("service"), value : "TypeService.name" },
					{ text : vm.$t("timeElapsed"), value : "timeElapsed" },
					{ text : vm.$t("date"), value : "assignedDate" },
					{ text : vm.$t("hour"), value : "hour" },
					// { text : vm.$t("regime"), value : "regime" },	
					{ text : vm.$t("eps"), value : "HistoryPerson.currentAdministratorName" },			
					{ text : vm.$t("document"), value : "HistoryPerson.numberId" },			
					{ text : vm.$t("patient"), value : "fullName" },
					{ text : vm.$t("CAU"), value : "CAU" },
					{ text : vm.$t("actions"), value : "actions" },
					// { text : vm.$t("numberId"), value : "numberId" },
					// { text : vm.$t("campus"), value : "Center.name" },
				]
			}
		}, // renderHeaders

		async get_list(){
			const { page, itemsPerPage} = this.options;
			let listTemp = [];
			if (this.currentRoute == "laboratory") {
				const service = new laboratoryService();
				const res = await service.getLaboratories({page, itemsPerPage});
				if (res && res.data) {				
					if (res.data.rows && res.data.rows.length > 0) {
						listTemp = res.data.rows;
						this.total  = res.data.count || this.list.length;
					}
				}
			}else{

				const service = new AttentionService();
				const res = await service.getAttentions({page, itemsPerPage})
				if (res && res.data) {				
					if (res.data.rows && res.data.rows.length > 0) {
						listTemp = res.data.rows.map(x => service.formatAttentionAgenda(x));
						this.total  = res.data.count || this.list.length;
					}
				}
			}
			listTemp = this.sortTable(listTemp);
			this.list 	= listTemp;
			
		}, // get list

		async get_search(){
			const { page, itemsPerPage }  = this.options;
			this.loading 	= true;			
			let info 		= this.formatSearch();
			let listTemp 	= [];
			if (this.currentRoute == "laboratory") {
				const service = new laboratoryService();
				// console.log("CHECK INFO LABORATORY SEARCH ", info)
				const res = await service.searchLaboratories({page, itemsPerPage, ...info});
				if (res && res.data && res.data.rows) {				
					listTemp = res.data.rows;
					this.total  = res.data.count || this.list.length;
				}			
			}else{
				const service 	= new AttentionService();
				// agendas/search/${name}
				const res = await service.searchAttentionsByParams(info, {page, itemsPerPage});			
				if (res && res.data && res.data.rows) {				
					listTemp = res.data.rows.map(x => service.formatAttentionAgenda(x));;					
					this.total  = res.data.count || this.list.length;
				}
			}
			listTemp = this.sortTable(listTemp);
			this.list 	= listTemp;
			this.loading = false;			
		}, // get search

		

		check_role(item){
			if (item) {				
				if (item.show_in && item.show_in.length > 0) {
					
					if (item.show_in.includes(this.user.role)) {						
						return this.checkBtnRoute(item);
					}else if (item.show_in.includes("*")){
						return true;
					}
				}
			}
			return false;
		}, // check role

		checkBtnRoute(item){
			if(item){	
				if(!item.showInRoute.includes(this.currentRoute)){
					return false;
				}
			}
			return true
		},

		renderFilter(){
			let temp = [];
			if (this.search && (this.search.status || this.search.numberId || this.search.date)) {
				let it = this.formatSearch(); 
				temp = this.list.filter(x => {
					return x && x.StatusId == it.StatusId || x.patient == it.patient || x.date == it.assignedDate
				})				
				return temp
			}
		}, // renderFilter

		formatSearch(){
			return {
				StatusId 	 : this.search.status && this.search.status.id ? this.search.status.id : null,
				patient  	 : this.search.numberId,
				assignedDate : this.search.date,
				TriageId 		 : this.search.TriageId, 
			}
		}, // formatSearch

		

		render_listed(item){
			if (item) {				
				if (item.global_list) {
					return this.$ManagerSmith.render_listed(item);
				}else
				if (typeof item.list == "string") {
					return this[item];
				}
			}
			return [];
		}, // render listed

		render_column(item, opt){
			if (item && opt) {
				if (opt.key_main && item[opt.key_main]) {
					
					if (opt.key_main == "Triage" && item[opt.key_main] && item[opt.key_main][opt.key]){
						return item[opt.key_main][opt.key].description;
					}
					return item[opt.key_main][opt.key]

				}else if (item[opt.key]) {
					return item[opt.key]					
				}
			}
			return ""
		}, // render_column

		render_color(option, item){
			if (option) {				
				if (item && item.Status && option.key_main == "Status") {
					return this.$ManagerSmith.renderColorStatus(item, option);
				}
				if (item && item.Triage && option.key_main == "Triage") {
					let color = "";
					if(item.Triage && item.Triage.LevelTriage && item.Triage.LevelTriage.color) color = item.Triage.LevelTriage.color;
					return color ||  this.$ManagerSmith.renderColorTriage(item, option) || "";

				}

				if (option && option.key == "admissions"){
					// console.log("options admissions", option, item , !item.authorizationCode)
					return !item.authorizationCode ? "error" : "success";
				}
				if (option.color) {
					return option.color
				}
			}
		}, // renderColor

		render_search(route){
			if (route == "admissions") {
				this.search.date 	= [this.$ManagerSmith.getDateCurrent(), this.$ManagerSmith.getDateCurrent()];
				this.search.status 	= this.$ManagerSmith.getStatusProcess(1);
			}
		}, // render search

		renderRegime(item){
			if(item && item.regime){
				return item.regime;
				/* const regime = this.$ManagerSmith.getNameRegimenById(item.regime);
				if(regime){
					return regime;	
				} */
			}
			return "Sin Regimen"
		},
		sortTable(items){

			const { sortBy, sortDesc, page, itemsPerPage } = this.options;			
			if (sortBy.length === 1 && sortDesc.length === 1) {
				items = items.sort((a, b) => {
				  const sortA = a[sortBy[0]]
				  const sortB = b[sortBy[0]]				  
				  if (sortDesc[0]) {
					if (sortA < sortB) return 1
					if (sortA > sortB) return -1
					return 0
				  } else {
					if (sortA < sortB) return -1
					if (sortA > sortB) return 1
					return 0
				  }
				})
			}
			if (itemsPerPage > 0) {
				items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
			  }
			return items;
		}, 
	}, // methods

	mounted(){

	}, // mounted
};
</script>