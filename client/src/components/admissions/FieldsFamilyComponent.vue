<template>
	<v-container fluid>
		<v-row
			dense
		>	

			<v-col cols="5">
				<v-text-field
					dense
					outlined						
					required					
					persistent-hint 
					:label 				= "$t('DocumentRelationship')"
					v-model 			= "info_input['numberId']"
					type 				= "number"							
					@input 		 		= "(v) => info_input['numberId'] = v.toString()"
					:rules 				= "[
						// (value) =>  !!value || 'Requerido.',
						(value) => value.toString().length >= 8  || 'Requerido minimo 8 caracteres'
					]"
					@keyup.enter		= "searchPatient"
					hint 				= "Enter para buscar"

				></v-text-field>

			</v-col>
			<v-col cols="6">
				<v-btn
					dark
					@click 	= "searchPatient"
					color  	= "blue"												
				>						
					{{ $t("search") }}
			
				</v-btn> 
			</v-col>
			<template
				v-for = "(info_field, idx_field) of fields"
			>
				<v-col
					:ref = "idx_field+'fieldsFamily'"
					:cols = "info_field.cols || 'auto'" 
					v-show="showFields"
				>
					<v-text-field
						dense
						outlined						
						persistent-hint 
						:label 				= "$t(info_field.text)"
						v-model 			= "info_input[info_field.key]"
						:type 				= "info_field.type"
						v-if 				= "['text','email'].includes(info_field.type)"
						:prepend-inner-icon = "info_field.icon"
						:disabled 			= "info_field.isDisabled"
						@input 		 		= "(v) => info_input[info_field.key] = v.toUpperCase()"
						:rules 				= "info_field.rules ? info_field.rules : []"
						:required  			= "info_field.isRequired"
						:autofocus 			= "info_field.autofocus"
						:hint 				= "info_field.hint"

					></v-text-field>							
					<MenuTypeRelationshipComponent
						v-else-if = "info_field.key == 'TypeRelationshipId' && info_field.type == 'component'"
						:inputField="info_input" 
						:keyField="info_field.key" 									
					></MenuTypeRelationshipComponent>
					<MenuTypeDocumentComponent
						v-else-if = "info_field.key == 'TypeIDId' && info_field.type == 'component'"
						:inputField="info_input" 
						:keyField="info_field.key" 													
					></MenuTypeDocumentComponent>
					<v-text-field

						dense
						outlined						
						:label 				= "$t(info_field.text)"
						v-model.number 		= "info_input[info_field.key]"
						:type 				= "info_field.type"
						v-else-if			= "['number'].includes(info_field.type)"
						:prepend-inner-icon = "info_field.icon"											
						:required  			= "info_field.isRequired"
						:rules 				= "info_field.rules ? info_field.rules : []"
						:placeholder 		= "info_field.placeholder"										
						
					></v-text-field>
					<v-checkbox
						dense
						outlined
						hide-details						
						v-else-if   = "info_field.type == 'checkbox'"
						v-model 	="info_input[info_field.key]"
						:label  	= "$t(info_field.text)"						
					></v-checkbox>
					
					<v-select
						dense
						outlined
						
						:label 				= "$t(info_field.text)"
						v-model 			= "info_input[info_field.key]"
						:items 				= "render_listed(info_field)"
						:item-value			= "info_field.item_value"
						:item-text  		= "info_field.item_text"
						v-else-if 			= "'select' == info_field.type"
						:prepend-inner-icon = "info_field.icon"
						:required  			= "info_field.isRequired"
						:rules 				= "info_field.rules ? info_field.rules : []"
						@change 			= "info_field.action ? actions(info_field) : ''"
					></v-select> 
					<!-- <searcher
						v-else-if 	  			= "info_field.type == 'select_search'"
						:info_to_component 		= "info_field"
						:update_to_component 	= "info_input[info_field.key]"									
						:list_to_component 		= "render_listed(info_field)"
						@receive 	 			= "actions(info_field, $event)"
					></searcher> -->
					<DateAuto
						:key 				= "idx_field + 'familyFieldsDate' + info_field.key"
						v-else-if		   	= "info_field.type == 'DateAuto'"
						:keyField 			= "info_field.key"
						:inputField 	  	= "info_input"
					></DateAuto>
						<!-- @receiveInfo	   = "actions(info_field, $event)" -->
					
				</v-col>	
			</template>
			<v-col cols="1" >
				<v-btn
					dark
					@click 	= "save"
					color  	= "blue"	
					v-show="showFields"

				>						
					{{ $t("save") }}
			
				</v-btn> 
			</v-col>
		</v-row>
			<v-divider color="white"></v-divider>
	</v-container>


							
</template>
<script>
// import searcher  		from "@/helpers/searcher.vue"
// import dates 			from "@/helpers/dates.vue"
import FamilyParentService from "@/services/FamilyParentService.js" 
import PatientService 	from "@/services/PatientService.js"
import DateAuto 		from "@/components/info/DateAutoPlaceholderComponent.vue"
import MenuTypeDocumentComponent from "@/components/info/MenuTypeDocumentComponent.vue"
import MenuTypeRelationshipComponent from "@/components/info/MenuTypeRelationshipComponent.vue"


export default {

    name  : "fieldsFamilyComponent",
	props: ["infoToComponent", "updateInfoPatient", "currentPermission"],
	components:{  DateAuto, MenuTypeDocumentComponent, MenuTypeRelationshipComponent}, // dates / searcher,
    data :(vm) =>({
		list : [],
		info_input : {},
		showFields : false,
        fields: [
			// {
			// 	key 		: "numberId",
			// 	text 		: "document",
			// 	type   		: "number",
			// 	keyShow 	: "fields",
			// 	cols 		: 2,	
			// 	placeholder : "PRESIONAR ENTER PARA BUSCAR",
			// 	action 		: "searchPatient",
			// 	rules 	  : [
			// 		(value) =>  !!value || 'Requerido.',
			// 		(value) => value.toString().length >= 8  || 'Requerido minimo 8 caracteres'
			// 	],		
			// 	hint 		: "Enter para buscar",
			// },
			{
				key 		: "TypeIDId",
				text 		: "type_document",
				type   		: "component",
				keyShow 	: "fields",
				item_text  	: "name",
				item_value 	: "id",	
				list 		: "list_type_documents",		
				global_list : "typeIds",
				isSync  	: true,				
				cols 		: 2,			
			},
        	{
				key 		: "TypeRelationshipId",
				text 		: "relationship",
				type   		: "component",
				keyShow 	: "fields",
				item_text  	: "name",
				item_value 	: "id",					
				global_list : "typeRelationship",						
				isSync  	: true,				
				cols 		: 2,			
				show_texts    	: ['name'],
			},
			{
				key 		: "name",
				text 		: "name",
				type   		: "text",
				keyShow 	: "fields",
				cols 		: 2,			
			},
			{
				key 		: "lastName",
				text 		: "lastname",
				type   		: "text",
				keyShow 	: "fields",
				cols 		: 2,			
			},
			{
				key 		: "cellphone",
				text 		: "cell_phone",
				type 		: "number",
				enable 		: true,
				icon 		: "mdi-cellphone", 
				keyShow 	: "fields",
				cols 		: 2,
				rules 	  : [
					(value) =>  !!value || 'Required.',
					(value) => (value && value.toString().length >= 10)  || 'Requerido minimo 10 caracteres'
				],
			},
			{
				key 	: "Adult",				
				text 	: "Adult",
				type 	: "checkbox",
				enable 	: true,
				// action 	: "calculate_age",
				icon 	: "mdi-account", 
				cols 	: 1,
				isRequired : true,

			},
			
			// {
			// 	type: "btn",
			// 	text : "save",
			// 	action : "save",				
			// }
        ]
		// requestss :{
		// 				edit 	: "/api/v1/relationship/",
		// 				create 	: "/api/v1/relationship",
		// 				delete 	: "/api/v1/relationship/",
		// 				get  	: "/api/v1/relationship",
		// 				action 	: "create",
		// 				action_key : "content",

		// 			},
    }), // data

	created(){
		this.clearInputs();
	},
	watch:{
		infoToComponent: function(val){
			if(val){
				this.info_input = { ...this.info_input, ...val };
			}
		},
		"info_input.TypeIDId"(val){
			if (val) {
				if ([1, 3, 7, 9].includes(val)) {
					this.info_input.Adult = true;
				}else{
					this.info_input.Adult = false;					
				}				
			}
		},		
	}, // watch
	methods:{
		clearInputs(){
			this.showFields=false;
			this.info_input = {
				TypeRelationshipId : "",
				name: "",
				lastName : "",
				TypeIDId : "",
				numberId : "",
				birthDate : "",
				cellphone : "",
				Adult : false,
			};
		},
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
		},
		async save(){
			this.$emit("receiveLoading",true);
			if(this.info_input.numberId && this.info_input.cellphone && this.info_input.TypeRelationshipId ){
				const FamilyService = new FamilyParentService();
				if (this.info_input && this.info_input.id) { // update
					if (this.$Helper.isPermission(this.currentPermission, "canEdit")) {	
						const patient = this.renderPatientInfo();
						if (patient ) {
							if (patient.patient == this.info_input.numberId) {
								this.$EventBus.$emit("notifications",{ type : "warning", msg  : "Familiar y paciente no pueden tener el mismo documento "})
								return 
							}
						}
						const data = await FamilyService.sendUpdate({...this.info_input, ...patient});					
						if(data){
							this.$emit("receiveInfoFieldsFamily",{
								action : "add",
								item   :  {...this.info_input},
							})
							this.clearInputs();
						}					
					}
				}else{					// save
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {	
						const patient = this.renderPatientInfo();
						if (patient ) {
							if (patient.patient == this.info_input.numberId) {
								this.$EventBus.$emit("notifications",{ type : "warning", msg  : "Familiar y paciente no pueden tener el mismo documento "})
								return 
							}
						}
						const data = await FamilyService.saveFamily({...this.info_input, ...patient});						
						this.$emit("receiveInfoFieldsFamily",{
							action : "add",
							item   :  {...this.info_input, ...data},
						})
						this.clearInputs();
					}
				}
			}else{
				this.$EventBus.$emit("notifications",{ type : "warning", msg  : "Requerido numero de identificion, Celular , Parentesco"})
			}
			this.$emit("receiveLoading",false);

		},
		renderPatientInfo(){
			const patient = {}			
			if (this.updateInfoPatient && this.updateInfoPatient.person){
				try{
					const {id, numberId } = this.updateInfoPatient.person;
					patient.patient = numberId;
					patient.PatientId = id;
				}catch(error){
					console.warn("Error Set info of family ", error);
				}
			}
			return patient;
		}, 
		async searchPatient(){
			try {
				this.$emit("receiveLoading",true);				
				const service = new PatientService();											
				const res = await service.fetchByParams({numberId : this.info_input.numberId });				
				if (res && res.error) {
					this.$EventBus.$emit("notifications",{ type : "warning", msg  :  res.error.response.data.message || res.error.response.data || "No se encontro datos de la persona o familiar"})
				}else
				if(res && res.data){
					delete res.data.id;
					this.info_input = {...this.info_input , ...res.data};
				}else{
					this.$EventBus.$emit("notifications",{ type : "warning", msg  : "No se encontro datos de la persona o familiar"})
					const tempNumber = this.info_input.numberId;
					this.clearInputs();
					this.info_input.numberId = tempNumber;
				}
			} catch (error) {
				console.log("Error service patient ", error)
			}finally{
				this.showFields=true;
				this.$emit("receiveLoading",false);

			}

		},
	}, // methods
}
</script>