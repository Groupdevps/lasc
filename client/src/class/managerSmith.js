// import formats from "./formats.js"
import default_lists 	from "./defaults/lists.js"
import deparments 		from "@/components/admissions/deparments.js"

// import userService  from "@/services/user.service.js"

// class
import sound  			from "@/class/sounds.js"
import connections  	from "@/class/connections_class"

default_lists.states = deparments.departments;
default_lists.cities = deparments.cities;
// import statePatient from "@/class/statePatient"

class manager_smith{
	constructor(info){
		this.api 		 	= info.api;
		this.i18n 		 	= info.i18n;		
		this.helper  		= info.helper;
		this.EventBus 		= info.EventBus;
		this.Axios 			= info.axios;
		this.moment 		= info.moment;
		this.momentz 		= info.momentz;		
		this.router 		= info.router;
		this.center 		= {};
		this.Sound  		= new sound();
		this.lists 			= {
			users 		: [],
			doctors 	: [{ id : 1, name : "medico demo ", username : "MedicoDemo", roleId : "medico"}],
		};
		this.settings 		= {
		     
		};
		//config socket io
		// Connection socket
		this.Connections      = new connections(info);
		// this.loadLists();
	}

	async loadLists(){
		if (this.api) {
			await [
				"genders", 
				// "typeIds", 				
				"current-administrator",  
				// "regimes",  
				// "states", 
				// "cities", 
				"doctors", 
				"status", 
				"typeRelationship", 
				"type-service", 
				"diagnostic-list",
				// "treatment-list", 
				// "medication-list", 
				// "role", 
				// "centers",
				// "tariff-manual", 
				// "cups-list", 
				// "tariff-category",
				"level-triage",
			].forEach(async (it)=>{	
				this.lists[it] = [];	
				if (default_lists && default_lists[it]) {
					this.lists[it] = default_lists[it];
				}		
				await this.Axios.get(`/api/v1/items/${it}`).then(res => {
					
					if (res && res.data && res.data.length > 0) {
						this.lists[it] = res.data;
						if (it == "type-service") {
							this.loadServices(this.lists[it])
						}
					}else{
						if (default_lists && default_lists[it]) {
							this.lists[it] = default_lists[it];
						}else{
							this.lists[it] = [];
						}
					}					
				}).catch(er => {
					console.warn("listsss ", er)
				});
			});
				// "states_processes",
			["socioeconomic_levels",  "moderator_fees", "occupations", "marital-status"] 
			.forEach((it)=>{
				this.lists[it] = [];
				if (default_lists && default_lists[it]) {
					this.lists[it] = default_lists[it];
				}
			})
			await this.Axios.get("/api/v1/centers").then(res=> {
				if (res && res.data && res.data.length > 0) {
					this.lists.centers = res.data;
				}
			})
			await this.Axios.get("/api/v1/zone").then(res=> {
				if (res && res.data && res.data.length > 0) {
					this.lists.zones = res.data;
				}
			})
		}
	}

	// loads 

	loadServices(items){
		if (items && items.length > 0) {			
			let services    	= [];
			let serviceCategory = {};			
			items.forEach((it, index) =>{
				
				services.push(it);
				if (it && it.ServiceCategory) {

					if (it.ServiceCategory.name == "Servicios") {
						if (!this.lists["Servicios"]) {
							this.lists["Servicios"] = [];
						}
						this.lists[it.ServiceCategory.name].push(it);
					}			
					if (it.ServiceCategory.name == "Consulta 1er nivel") {
						if (!this.lists["Consulta 1er nivel"]) {
							this.lists["Consulta 1er nivel"] = [];
						}
						this.lists[it.ServiceCategory.name].push(it);
					}	
					if (it.ServiceCategory.name == "Programas") {
						if (!this.lists["Programas"]) {
							this.lists["Programas"] = [];
						}
						this.lists[it.ServiceCategory.name].push(it);
					}				
				}
					// this.lists[it[0].ServiceCategory.name] = it;
					// this.lists[it.ServiceCategory.name] = it;
					
				// }
				
			});
			// console.log("list services", this.lists)
			this.lists.services = services;
			// console.log("SERVICeS ========================= " , this.lists)
		}
	}
	/* async getUsersByRole(params){
		try {			
			const response = await userService.getUsersByRole(params);
			return response; 
		} catch (error) {
			return [];
			console.log("Error get user by Roles ", error)
		}
	} */
	getMyCenter(){
		this.Axios.get(`/api/v1/center/` + 1,).then(res => {
			if (res && res.data) {
				this.center = res.data;
			}
		}).catch(er=>{
			this.center = {
				
			      name        : 'Demo',
			      nit         : 'demo',
			      email       : 'demo@demo.com',
			      description : 'Description Demo',
			      nit         : 'demo',
			      typeCenter  : 1,
			      
			    
			};

			console.warn("Error load center ", er);
		});
	}

	getItem(key){
		if (key && this[key] ) {
			return this[key];
		}else{
			return [];
		}
	}
	getLists(key){		
		if (key && this.lists[key] ) {
			return this.lists[key];
		}else{
			return [];
		}
	}

	get_typeId_string(id){
		if (this.lists && this.lists.typeIds && this.lists.typeIds.length > 0) {			
			const idx = this.lists.typeIds.findIndex(x => (x.id == id ));
			if (idx >= 0) {
				return this.lists.typeIds[idx].name;
			}
		}
		return "N/A";
	}

	get_relationshipId_string(id){
		const idx = this.lists.typeRelationship.findIndex(x => (x.id == id ));
		if (idx >= 0) {
			return this.lists.typeRelationship[idx].name;
		}
		return "N/A";
	}

	getServiceById(ID){
		if(this.lists && this.lists.Servicios && this.lists.Servicios.length > 0){			
			const idx = this.lists.Servicios.findIndex(x => (x.id == ID ));
			if (idx >= 0) {
				return this.lists.Servicios[idx];
			}
		}
		return null	
	}
	getServiceByName(name){
		// console.log("Servicios ", this.lists.Servicios)
		if(this.lists && this.lists.Servicios && this.lists.Servicios.length > 0){			
			const idx = this.lists.Servicios.findIndex(x => (x.name.toLowerCase() == name.toLowerCase() ));
			if (idx >= 0) {
				return this.lists.Servicios[idx];
			}
		}
		return null	
	}
	
	getStatusProcess(id){
		if (this.lists.status && this.lists.status.length > 0) {	
			const idx = this.lists.status.findIndex(x => (x.id == id ));
			if (idx >= 0) {
				return this.lists.status[idx];
			}
		}
		return { name : "N/A" }	
	}

	getZoneById(id){
		const idx = this.lists.zones.findIndex(x => (x.id == id ));
		if (idx >= 0) {
			return this.lists.zones[idx];
		}
		return null;	
	}

	get_redirect_by_process(item){
		if (item) {
			const idx = this.lists.processes.findIndex( x => (x == item.id_process))
			if (idx >= 0 ) {
				const idx1 = this.lists.processes[idx].sub_process.findIndex(x => (x == item.state));
				if (idx1 >= 0 ) {
					return this.lists.processes[idx].sub_process[idx1];
				}

			}
		}
	}

	getColorTriage(ID){
		if(this.lists && this.lists["level-triage"] && this.lists["level-triage"].length > 0){
			const idx = this.lists["level-triage"].findIndex(x => (x && x.id == ID));
			if (idx >= 0) {
				return this.lists["level-triage"][idx].color;
			}
		}
		return "secondary";
	}

	getTriageLevelByName(name){
		if(this.lists && this.lists["level-triage"] && this.lists["level-triage"].length > 0){

			const idx = this.lists["level-triage"].findIndex(x => (x && x.name == name));
			if (idx >= 0) {
				return this.lists["level-triage"][idx];
			}
		}
		return "secondary";
	}
	getNitAdministratorByName(name){
		const idx = this.lists["current-administrator"].findIndex(x => (x && x.name == name));
		if (idx >= 0) {
			return this.lists["current-administrator"][idx].name;
		}
		return "N/A";
	}

	getNameMaritalStatusById(ID){		
		const idx = this.lists["marital-status"].findIndex(x => (x && x.name == name));
		if (idx >= 0) {
			return this.lists["marital-status"][idx].name;
		}
		return "N/A";
		
	}

	// FILTERS
	filterCityByState(id){
		return this.Axios.get("/api/v1/find/city/by-state/"+id).then(res=>{
				if (res && res.data && res.data.length > 0) {
					// this.lists.cities = [];
					// this.lists.cities = [res.data]
					return Promise.resolve(res.data);
				}
			}).catch(er => {
				return Promise.reject(null);
				console.warn("Error get filters ", er)
			})
		
	}

	// RENDERS =======================
	render_listed(item, vm){	
		if (item) {									
			// console.log("global_list ", item.global_list, this.lists[item.global_list])
			if (item.global_list && this.lists[item.global_list] && this.lists[item.global_list].length > 0) {
				return this.lists[item.global_list];
			}else{					
				if(vm && typeof item.list == "string"){
					return vm[item.list]
				}				
				if (item.list && item.list.length > 0 && Array.isArray(item.list)) {
					return item.list;
				}
			}
		}
		return [];
	}

	renderColorStatus(item){
		if (item) {
			if (item.Status) {
				const { id, name } = item.Status;
				if (item.HistoryPerson) {
					const {  TriageLevel } 	= item.HistoryPerson;
					const triage 			= this.getColorTriage(parseInt(TriageLevel));								
					if (triage) {
						return triage;
					}	

				}		
				if (name == "Triage") {
					return "yellow darken-3"
				}
			}
			return "blue-grey darken-3"
		}
	}
	renderColorTriage(item){
		if (item) {
			if (item.triage) {
				const { id, name } = item.Status;
				if (item.HistoryPerson) {
					const {  TriageLevel } 	= item.HistoryPerson;
					const triage 			= this.getColorTriage(parseInt(TriageLevel));								
					if (triage) {
						return triage;
					}	

				}		
				if (name == "Triage") {
					return "yellow darken-3"
				}
			}
			return "blue-grey darken-3"
		}
	}

	getAge(item){
		let diff 		= 0;
		let a 			= this.moment(this.moment.now());//fecha  mayo
        let b 			= this.moment(item);//fecha menor
        let edadmoment 	= diff = a.diff(b, 'months')
        let edad 		= null;
        let result 		= "";			  
        
        if(edadmoment == 0){
            edad 	= a.diff(b, 'days')
            result 	= edad += ' ' + 'Dias';                  	
            if (parseInt(edad) === 0) {
            	edad 	= a.diff(b, 'hours')
            	result 	= edad += ' ' + 'Horas';      
            } 
        }else if (edadmoment < 13) {
            edad = a.diff(b, 'months') // 1
            result = edad += ' ' + 'Meses';
        }
        else{
            edad = a.diff(b, 'years') // 1
            result = edad += ' ' + 'Años';
        }
        return result
	}

	// forms ========================================================================================
	format_date(item, parse_format = 'timestamp', formate = 'll, LTS'){ // 
		let date_format = null;
		if (item) {

			if (parse_format == 'timestamp') {
				let len = 10;
				if (typeof item == "string") {
					len = item.length;
				}else{
					len = (''+ item).length
				}
				if (len == 16) {
					item = Math.floor(item/1000.0)
				}
				// console.log("***** Len ", len, item)

				date_format = this.momentz(parseInt(item)).format(formate);
			} // timestamp
			else if (parse_format == 'createdAt')
			{
				date_format = this.momentz(item).format(formate);
			}// createdAt
			
		} // item
		return date_format;
	} // format date

	format_date_picker(dates = [], guess = true){
		let date1 = guess && this.time_guess ?  
						this.momentz(this.momentz.now()).tz(this.time_guess).format('YYYY-MM-DD') : 
						this.momentz(this.momentz.now()).format('YYYY-MM-DD'); // L / YYYY/MM/DD
    		// date2 = date1;
    		// console.log("check format dete picker : ", date1)
    	if (dates && dates.length > 0) {
    		if (dates[0] == 'Invalid date') {
    			dates[0] = date1; //this.momentz(date1).format('YYYY-MM-DD');
    		}else{
    			dates[0] = this.momentz(dates[0]).format('YYYY-MM-DD');
    		}

    		if (dates[1] == 'Invalid date') {
    			dates[1] = dates[0]; //this.momentz(dates[0]).format('YYYY-MM-DD');	
    		}else{
				dates[1] = this.momentz(dates[1]).format('YYYY-MM-DD');
    		}
    	}else{
    		// console.log("GUESS ; ", this.time_guess, date1)
			dates 	 = [];
			dates[0] = date1;//this.momentz(date1).format('YYYY-MM-DD');
			dates[1] = dates[0]
		}
		return dates;

	}
	format_price(price){
		return (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}

	formatFormId(item){
		if (item) {
			switch(item){
				case "clinic_history":
					return "HistoryClinicId"
				break;
				case "diagnostic_help":
					return "DiagnosticHelpId"

				break;
				case "emergency_medical_history":
					return "EmergencyMedicalHistoryId"

				break;
				case "medical_formulas":
					return "MedicalFormulaId"

				break;
				case "laboratory_order":
					return "MedicalOrderId"

				break;
				case "outpatient_orders":
					return "OutpatientOrderId"

				break;
				case "medical_orders":
					return "MedicalOrderId"

				break;
				default:
					return "id"
				break;
			}
		}
	}


	formatCurrency(item){
		if (item) {			
			return new Intl.NumberFormat('en-US', {
		      style: 'currency',
		      currency: 'USD',
		      minimumFractionDigits: 2
		    }).format(item);
		}
		return "0.0"
	}





	export_excel(list){
		let date 	   = this.format_date(new Date(), "createdAt", "YYYY-MM-DD HH:mm ss");
		if (date) {
			date = date.split(" ").join("_");						
		}
		let data 	   = XLSX.utils.json_to_sheet(list)//dataToExport
      	const workbook = XLSX.utils.book_new()
      	const filename = date; //devschile-admins //  +  // 'Reports'
      	XLSX.utils.book_append_sheet(workbook, data, filename)
      	XLSX.writeFile(workbook, `${filename}.xlsx`)
	}

	// requests
	updateStatusPatient(req){
		if (req) {
			this.Axios.put("/api/v1/attention/" + req.id, { ...req.body } ).then(res => {					
				if (res && res.data) {			
					if (req.notification) {
						this.EventBus.$emit("notifications",{
							type 	: req.type_notification,
							msg 	: req.notification,
						})
					}
					if (req.redirect_back) {
						this.router.go(-1);
					}
				}
			}).catch(er => {	
									
				console.log("Error request info ", er);
				if (req.error_notification) {
						this.EventBus.$emit("notifications",{
							type 	: "error",
							msg 	: req.error_notification,
						})
					}
			})
		}
	}

	updateHistoryPerson(req){
		
		if (req) {
			this.Axios.put("/api/v1/history-person/" + req.id, { ...req.body } ).then(res => {					
				if (res && res.data) {			
					if (req.notification) {
						this.EventBus.$emit("notifications",{
							type 	: req.type_notification,
							msg 	: req.notification,
						})
					}
					if (req.redirect_back) {
						// this.router.go(-1);
					}
				}
			}).catch(er => {	
									
				console.log("Error request info ", er);
				if (req.error_notification) {
						this.EventBus.$emit("notifications",{
							type 	: "error",
							msg 	: req.error_notification,
						})
					}
			})
		}
	}


	// getters
	getDateCurrent(item){
		return (item) ? this.moment(item).format("YYYY-MM-DD")  : this.moment().format("YYYY-MM-DD");
	}
	getDateCurrentHour(item){
		return (item) ? this.moment(item).format("YYYY-MM-DD HH:mm")  : this.moment().format("YYYY-MM-DD HH:mm");
	}
	getTimeCurrent(item){
		return (item) ? this.moment(item).format("HH:mm:ss") : this.moment().format("HH:mm:ss");
	}
	getTimeCurrentHS(item){
		return (item) ? this.moment(item).format("HH:mm") : this.moment().format("HH:mm");
	}

	getMyCenterId(){
		return this.center && this.center.id ? this.center.id : null;
	}

	getStatusNameProcess(ID){	
		if (this.lists && this.lists.status && this.lists.status.length > 0 ){
			const idx = this.lists.status.findIndex(x => x.id == ID);
			if (idx >= 0) {
				return this.lists.status[idx].name;
			}
		}
		return false
	}

	getNameRegimenById(ID){
		if(this.lists && this.lists.regimes && this.lists.regimes.length > 0){
			const idx = this.lists.regimes.findIndex(x => (x && x.id  == ID));
			if (idx >= 0) {
				return this.lists.regimes[idx].name;
			}
		}
		return "";
	}

	// FORMATS ==================================================

	formatInfoPerson(item, setPerson = {}, properties = 0){		
		if (properties == 0) {					
			if (item) {
				setPerson.person = {...item, age : ""}; 
				if (setPerson.person && setPerson.person.birthDate) {
					// console.log("edad DATE CALCULATED ", setPerson.person.age, setPerson.person.birthDate);
					setPerson.person.age = this.getAge(setPerson.person.birthDate);
				}
				/*this.$nextTick(()=>{
					this.actions({action : "calculate_age"}, );
				})*/
			}
			if (item.Address) {
				setPerson.Address 	= item.Address;				
			}
			if (item.ServiceProvider) {
				setPerson.ServiceProvider 	= item.ServiceProvider;				
				setPerson.CenterName  		= item.ServiceProvider.name;
				setPerson.CenterNit  		= item.ServiceProvider.nit;
				if(item.ServiceProvider.administrator){
					const {nit, name} =item.ServiceProvider.administrator;
					setPerson.ServiceProvider.assignedAdministrator = name;
					setPerson.ServiceProvider.nit = nit;

				}
			}
			if (item.Relationships && item.Relationships) {
				setPerson.Relationships 	= this.formatRelationships(item.Relationships);				
			}
		}else if (properties == "basic") {

			// console.log("ITEMMMM ", item)

			const list = [
				{ main : "HistoryPerson",	key  : "TypeIDId", },
				{ main : "HistoryPerson", key  	 : "numberId", },
				{ main : "HistoryPerson", key  	 : "name", },
				{ main : "HistoryPerson", key  	 : "fullName", },
				{ main : "HistoryPerson", key  	 : "lastName", },
				{ main : "HistoryPerson", key  	 : "GenderId", },
				{ main : "HistoryPerson", key  	 : "cellphone", },
				{ main : "HistoryPerson", key  	 : "phone", },
				{ main : "HistoryPerson", key  	 : "email", },				
				{ main : "HistoryPerson", key  	 : "birthDate", },				
				{ main : "HistoryPerson", key  	 : "address", },
				{ main : "HistoryPerson", key : "TriageLevel", },		
				{ main : "HistoryPerson", key : "currentAdministratorName", },		
				{ main : "HistoryPerson", key : "companionName", },		
				{ main : "HistoryPerson", key : "occupation", },		
				{ main : "HistoryPerson", key : "TypeRelationshipName", },		
				{ main : "HistoryPerson", key : "MaritalStatusId", },		
				
				// { main : "HistoryPerson", key : "id", },								
				// { main : "HistoryPerson", sub 	 : "Address", key  	 : "address", },
				// { main : "HistoryPerson", sub 	 : "ServiceProvider", key  	 : "assignedCenter",},
				// { main : "HistoryPerson", sub 	 : "ServiceProvider", key  	 : "ServiceProvider", isObject : true },
				// { main : "Relationships", key  	 : "Relationships", format : "formatRelationships"},
				{ main : "", key  	 : "AttentionId", parse : "parseInt"},	
				{ main : "", key  	 : "HistoryPersonId", },
				{ main : "", key  	 : "assignedDate", },
				
			];
			list.forEach((it)=>{
				if (item) {
					if (item[it.main] && item[it.main][it.key]) {

						setPerson[it.key] = item[it.main][it.key];
						if (it.key == "birthDate") {
							setPerson["age"] = this.getAge(item[it.main][it.key]);
						}else if (it.key == "currentAdministratorName") {
							setPerson["assignedAdministrator"] = item[it.main][it.key];
						}
					}else if (it.format && item[it.main]){
						setPerson[it.key] = this[it.format](item[it.main]);
					}
					else if (it.sub && item[it.main] && item[it.main][it.sub] && item[it.main][it.sub][it.key]) {
						// set object
						if (it.otherKey && item[it.main][it.sub] && item[it.main][it.sub][it.otherKey]) {
							setPerson[it.key] = item[it.main][it.sub][it.otherKey];							
						}else{
							setPerson[it.key] = item[it.main][it.sub][it.key];
						}

					}else if (it.sub && item[it.main] && item[it.main][it.sub] && it.isObject) {
						setPerson[it.key] = item[it.main][it.sub];						
					}else if (it.key == "fullName") {
						const arrayFullName = [];
						if(item[it.main]){
							const {name,secondName, lastName, secondSurname} = item[it.main]
							if(name) arrayFullName.push(name)
							if(secondName) arrayFullName.push(secondName)
							if(lastName) arrayFullName.push(lastName)
							if(secondSurname) arrayFullName.push(secondSurname)
							

						}
						// console.log("FULL NAME ", item, arrayFullName)
						setPerson[it.key] = arrayFullName.join(" ").split(null).join(" ");
					}else if (!it.main && item[it.key]){
						if (it.parse) {						
							setPerson[it.key] = parseInt(item[it.key]);
						}else{
							setPerson[it.key] = item[it.key];
						}
					}
				}
				// setPerson.
			})
			// console.log("PERSON SET ========= ", setPerson)
		}
		
	} // return setPerson;

	formatFormInfo(item, setInfo, field){
		/*clinic_history
		diagnostic_help
		emergency_medical_history
		medical_formulas
		laboratory_order
		outpatient_orders
		medical_orders
		supplies*/
		if (item) {
			const { HistoryInfoMedicPerson, SubDiagnoseLists , HistoryPerson, id} = item;
			let HistoryPersonFormat = {};
			if (HistoryInfoMedicPerson) {
				HistoryInfoMedicPerson.HistoryInfoMedicPersonId = HistoryInfoMedicPerson.id;
				delete HistoryInfoMedicPerson.id;
			}
			if (HistoryPerson) {
				delete HistoryPerson.id;
				this.formatInfoPerson(item, HistoryPersonFormat,"basic")
			}
			if (SubDiagnoseLists && SubDiagnoseLists.length > 0) {				
				setInfo.SubDiagnoseLists 	= this.formatDiagnoses(SubDiagnoseLists, id);
				// delete item.SubDiagnoseLists;
			}
			setInfo = { ...setInfo, ...item, ...HistoryPersonFormat, ...HistoryInfoMedicPerson }

			return { ...setInfo };
		}
	}

	formatListTable(items, format, key){
		if (items && items.length > 0 ) {
				console.log("FORMAT ", items, format, key)
			let newList = [];
			if (format == "EvolutionNotes") {
				items.forEach((it)=>{
					if (it && it[key]) {
						newList = newList.concat(it[key]);
					}
				})
				console.log("newList ", newList)
				return newList;
			}
		}
		return items;
	}	

	formatRelationships(items){
		if (items && items.length > 0) {
			let temp = [];
			items.forEach((it)=>{
				if (it) {
					let TypeRelationshipId = it.TypeRelationshipId;
					let name, lastName, TypeIDId, numberId, cellphone, id;
					id 			= it.id;
					if (it.Person) {
						name 		= it.Person.name;
						lastName 	= it.Person.lastName; 
						TypeIDId 	= it.Person.TypeIDId;
						numberId 	= it.Person.numberId; 
						cellphone 	= it.Person.cellphone; 
					}

					temp.push({
						id,
						TypeRelationshipId,
						name,
						lastName,
						TypeIDId,
						numberId,
						cellphone,
					})
				}
			})
			return temp;
		}
	}
	formatDiagnoses(items, AttentionId){
		if (items && items.length > 0) {
			items.forEach((it)=>{
				if (it.SubDiagnose) {
					if (it.id) {
						it.SubDiagnoseId = it.id
					}
					if (AttentionId) {
						it.AttentionId = AttentionId;
					}
					if (it.SubDiagnose.code) {
						it.code = it.SubDiagnose.code;
					}					
					if (it.SubDiagnose.name) {
						it.diagnosis   = it.SubDiagnose.name;
						it.description = it.SubDiagnose.name;
					}
				}
			})
			return [...items];
		}
		return [];
	}

	formatInfoClassification(item, setInfo = {}){
		if (item) {
			if (item.HistoryInfoMedicPerson) {
				// console.log("SET INFO ")
				setInfo = {...item.HistoryInfoMedicPerson };
			}
		}
	}

}

export default manager_smith;