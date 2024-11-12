<template>
	<v-container fluid>
		<v-card outlined :elevation = "7">
			<v-card-title class  = "body-1 pa-0 white--text text-uppercase">				
				<v-btn					
					tile
					color  = "warning"
					@click  = "$router.go(-1)"
					v-if   = "isActiveGoBack" 
				>
					<v-icon  class="mr-1">mdi-arrow-left</v-icon>
					{{ $t('go_back') }}
				</v-btn>
				<span class="ml-1">
					{{ title }}
				</span>
				<v-divider class="mt-8" v-if="isActiveGoBack"></v-divider>
			</v-card-title>
			<v-card-subtitle class = "body-2 pa-0 ">
				<span> {{ subtitle }} </span>
			</v-card-subtitle>
			<v-form>
				<v-card-text
					class = "pa-1 pt-5"
				>

					<v-row
						dense
						:style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${$vuetify.breakpoint.height-( ReduceSize || 180)}px;`"
						:ref= "'rowFormSession'"
					>

						<template
							v-for = "(item, idxField) of fields"
						>		
						
							<v-col
								:key  = "idxField + reference + 'comp'" 	
								:cols = "item.cols ? item.cols : 4 "
							>
								<slot :name="'field-'+item.key" :itemField="item">
									<span
										v-if  = "item.subtitle"
										class = "text-uppercase font-weight-medium"
									>
										{{ $t(item.subtitle) }}
										<v-divider
											class = "pa-0 ma-0 primary"
											:inset = "true"
										></v-divider>
									</span>
									<v-text-field
										dense
										outlined
										hide-details
										v-else-if		= "['text', 'email'].includes(item.type)"
										:label 			= "$t(item.text)"
										v-model 		= "inputField[item.key]"
										:type 			= "item.type"
										:disabled 		= "item.isDisabled"
										@input 		 	= "(v) => inputField[item.key] = v.toUpperCase()"
										class 			= "text-uppercase"

									></v-text-field>
									<v-text-field
										dense
										outlined
										hide-details
										v-else-if		= "['number'].includes(item.type)"
										:label 			= "$t(item.text)"
										v-model.number	= "inputField[item.key]"
										:type 			= "item.type"
										:disabled 		= "item.isDisabled"
										class 			= "text-uppercase"
										:suffix 		= "item.suffix"
									></v-text-field>
										<!-- @input 		 	= "(v) => {inputField[item.key] = v.toUpperCase()}" -->
										<!-- @blur  			= "item && item.action ? item.action : '' " -->
									
									<v-select
										dense
										outlined
										hide-details
										:label 		= "$t(item.text)"
										v-model 	= "inputField[item.key]"
										:items 		= "renderListed(item)"
										:item-value	= "item.item_value"
										:item-text  = "item.item_text"
										v-else-if 	= "'select' == item.type"
										:disabled 		= "item.isDisabled"										
										class 			= "text-uppercase"
										@change 	= "actions(item)"

									></v-select>
									<MenuGender 
										v-else-if="['GenderId'].includes(item.key)" 
										:inputField="inputField" 
										:keyField="item.key" 
										:isDisabled="item.isDisabled"
									></MenuGender>
									<MenuMaritalStatus 
										v-else-if="['MaritalStatusId'].includes(item.key)" 																				
										:inputField="inputField" 
										:keyField="item.key" 
										:isDisabled="item.isDisabled"
									></MenuMaritalStatus> 
									<MenuCurrentAdministrator 
										v-else-if="['assignedAdministrator'].includes(item.key)" 										
										:inputField="inputField" 
										:keyField="item.key" 
										:isDisabled="item.isDisabled"
									></MenuCurrentAdministrator>
									<v-autocomplete
										dense
										outlined
										clearable
										hide-details
										auto-select-first
										v-else-if = "item.type == 'Autocomplete'"
										:label 		= "$t(item.text)"
										v-model 	= "inputField[item.key]"
										:items 		= "renderListed(item)"
										:item-value	= "item.item_value"
										:item-text  = "item.item_text"
										:disabled 		= "item.isDisabled"
										class 			= "text-uppercase"
									></v-autocomplete>
									<v-textarea
										dense
								        counter
										outlined
								        clearable
										auto-grow          
										hide-details
								        rows 			= "2"
								        row-height 		= "25"
										v-else-if		= "['textarea'].includes(item.type)"
										class 			= "text-uppercase"
										v-model 		= "inputField[item.key]"
										@input 		 	= "(v) => {inputField[item.key] = v.toUpperCase()}"
										:disabled 		= "item.isDisabled"				
										:append-icon 	= "item.appendIcon"	
										
									>
										<!-- :label 			= "" -->
									<!-- :prepend-inner-icon 	= "" -->
										<template v-slot:label>
											<slot :name="'prepend-icon-field-'+item.key" :itemField="item">
												<v-icon class="mr-2">{{item.prependIcon}}</v-icon>
											</slot>
											<span>{{$t(item.text)}}</span>
										</template>
									</v-textarea>
									<table_field
										:key="'table_field_' + item.key"
										v-else-if="item.type == 'table_field'" 
										:headersToComponent="item.headers"
										:fieldsToComponent="item.fields"
										:requestToComponent="item.requests"
										:listToComponent="inputField[item.key]"
										:reference="reference + item.key"										
									></table_field>
										<!-- @receive_info 		 = "actions({action : 'action_table'}, $event)" -->
										<!-- :info_to_component   = "{...item, info_comp : inputField, nameForm : item.field_ref }"
										:update_to_component = "inputField[item.key]"					 -->
									<TableRead
										v-else-if			 = "item.type == 'table-read'" 
										:key 				 = "'tableRead-' + item.key"
										:headersToComponent =  "item.header"
										:reference 			= "'table-read-'+item.key"
										:listToComponent  	= "inputField[item.key]"
									></TableRead>
									
									<!-- <searcher
										v-else-if 	  			= "item.type == 'select_search'"
										:info_to_component 		= "item"
										:list_to_component 		= "renderListed(item)"
										:update_to_component 	= "inputField[item.key]"
										@receive_info 	 		= "actions(item, $event)"
									></searcher> -->
									<dates
										v-else-if		   = "	item.type == 'date_range' 	||
																item.type == 'time_picker'
															"
										:info_to_component = "item"
										:info_to_dates 	   = "inputField[item.key]"
										@receive_info	   = "inputField[item.key] = $event"
									></dates>
									<DateAuto
										v-else-if		   = "	item.type == 'DateAuto'"
										:key 			   = "item.key"
										:inputField 		= "inputField"
										:keyField 			= "item.key"
										:infoToComponent = "{ text : item.text}"
									></DateAuto>
									<!-- <table_field
										v-else-if		= "item.type == 'table_field'" 
										:info_to_comp   = "item"
										:list_to_comp 	= "renderListed(item.list)"
										@receive_info 	= "actions('action_table', id_notification, $event)"
									></table_field> -->
									<v-card outlined
										v-else-if   = "item.type == 'multi-text' "
									>
										<v-card-title
											class = "body-2 info pa-1 white--text text-uppercase"
										>
											<span>
												{{ item.text }}
											</span>
										</v-card-title>
										<v-card-text
											class = "pa-1"
										>
											<v-row
												dense

											>
												<template 
													v-for = "(itemSub, idxSub) of item.sub_fields"
												>
													<v-col
														:key = "idxSub"
													>
														<v-text-field
															dense
															outlined
															hide-details
															:label 		= "itemSub.text"
															v-model 	= "inputField[itemSub.key]"
															:type 		= "itemSub.type"
															v-if 		= "['text', 'number', 'email'].includes(itemSub.type)"
														></v-text-field>
													</v-col>
												</template>
											</v-row>
										</v-card-text>
									</v-card>
								</slot>
							</v-col>					
						</template>
					</v-row>
				</v-card-text>
				<v-divider color="white"></v-divider>							
				<v-card-actions>
					<slot name="buttons"></slot>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-container>
</template>
<script type="text/javascript">
	import dates 			from "@/helpers/dates.vue"
	// import searcher  		from "@/helpers/searcher.vue"
	import table_field  	from "@/components/info/table_field.vue"
	import TableRead 		from "@/components/info/TableReadComponent.vue"
	import DateAuto 		from "@/components/info/DateAutoPlaceholderComponent.vue"
	import MenuGender 		from "@/components/info/MenuGenderComponent.vue"
	import MenuMaritalStatus from "@/components/info/MenuMaritalStatusComponent.vue"
	import MenuCurrentAdministrator from "@/components/info/MenuCurrentAdministratorComponent.vue"


	export default{
		name : "FormSessionLayout",
		props : [ "reference", "title", "subtitle","fields", "inputField", "ReduceSize", "isActiveGoBack", "currentPermission"],
		components:{ dates,  table_field, TableRead, DateAuto, MenuGender, MenuMaritalStatus, MenuCurrentAdministrator}, //searcher,
		/*computed:{
			currentGender(){
				return this.$store.getters["listGender/list"];
			},
			currentMaritalStatus(){
				return this.$store.getters["listMaritalStatus/list"];
			},
			currentCurrentAdministrator(){
				return this.$store.getters["listCurrentAdministrator/list"];
			}

		},*/
		methods : {
			actions(action, item, option ){
				if (action.action == "action_table") {
					if (item && item.key_main) {
						this.inputField[item.key_main] = item.values;
					}
				}
				if (action.action == "setISC") {
					const { weight, size} = this.inputField;
					if (weight && size) {
						this.inputField.isc = Math.sqrt((parseInt(weight)*parseInt(size))/3600).toFixed(2);
					}
					// console.log("SET ISC ", this.info.isc)
				}
			}, // actions			
			renderListed(item){
				if (item) {
					if (item.global_list) {
						/*if (item.global_list == 'genders') {							
							return this.currentGender;
						}else if(item.global_list == "marital-status" ) {
							return this.currentMaritalStatus;							
						}else if(item.global_list == "current-administrator" ) {
							return this.currentCurrentAdministrator;							
						}else if(item.global_list == "" ) {
							return this.$store.getters["listMaritalStatus/list"];							

						}else if(item.global_list == "" ) {
							return this.$store.getters["listMaritalStatus/list"];							

						}else if(item.global_list == "" ) {
							return this.$store.getters["listMaritalStatus/list"];							

						}else if(item.global_list == "" ) {
							return this.$store.getters["listMaritalStatus/list"];							

						}*/
						return this.$ManagerSmith.render_listed(item);
					}
					if (typeof item.list  == "string") {
						return this[item];
					}else{
						return item.list;
					}
				}
				return []
			},
		}, // methods
	}
</script>