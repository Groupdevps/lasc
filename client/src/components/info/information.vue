<template>
	<v-card outlined>
		<v-card-text
			class = "pa-1"
		>
			<v-row
				dense
				no-gutters
			>
				<template
					v-for = "(item_info, idx_info) of  fields"
				>			
					<v-col
						:cols = "item_info.cols"
					>
						<v-card 
							outlined
							:class 	= "item_info.class"
						>
							<v-card-title
								:class = "item_info.class_title"
							>
								{{ $t(item_info.text) }}
							</v-card-title>							
						</v-card>
					</v-col>
					<v-col
						:cols = "item_info.cols"
					>
						<v-card outlined>
							<v-card-text 
								v-show = "info[item_info.key]"
								:class = "item_info.class_text"
							>
								{{ info[item_info.key] }}							
							</v-card-text>
						</v-card>
					</v-col>
				</template>
			</v-row>
		</v-card-text>
	</v-card>
</template>
<script type="text/javascript" >
export default {
	name 	: "information",
	props   : [
		"info_to_component",
		"ref_to_component",
		"update_to_component",
	],
	data : (vm) => ({
		info 	: {},
		fields  : [
			{				
				key  : "info_patient",
				text : "info_patient",
				cols : 12,
				class_title : "justify-center white--text dark text-uppercase purple darken-2 body-2 pa-0 primary",
				class_text  : "pa-0 ma-1", 
				class 		: "pa-0 ma-0",
			},
			{
				text : "authorizationNumber",
				key  : "id",
				cols : 3,
				class_title : "justify-center white--text dark text-uppercase caption pa-0 primary",
				class_text  : "pa-0 ma-1", 
				class 		: "pa-0 ma-0",
			},
			{
				text : "date_birth",
				key  : "birthDate",
				cols : 3,
				class_title : "justify-center text-uppercase caption pa-0 primary white--text dark",
				class_text  : "pa-0 ma-1", 
				class 		: "pa-0 ma-0",
			},
			{
				text : "name",
				key  : "name",
				cols : 3,
				class_title : "justify-center text-uppercase caption pa-0 primary white--text dark",
				class_text  : "pa-0 ma-1", 
				class 		: "pa-0 ma-0", 
			},
			{
				text : "EPS",
				key  : "assignedAdministrator",
				cols : 3,
				class_title : "justify-center text-uppercase caption pa-0 primary white--text dark",
				class_text  : "pa-0 ma-1", 
				class 		: "pa-0 ma-0",
			},
			{
				text : "triage",
				key  : "TriageLevel",
				cols : 3,
				class_title : "justify-center text-uppercase caption pa-0 primary white--text dark",
				class_text  : "pa-0 ma-1", 
				class 		: "pa-0 ma-0",
			},
			{
				text : "address",
				key  : "address",
				cols : 3,
				class_title : "justify-center text-uppercase caption pa-0 primary white--text dark",
				class_text  : "pa-0 ma-1", 
				class 		: "pa-0 ma-0",
			},
			{
				text : "dateAdmission",
				key  : "assignedDate",
				cols : 3,
				class_title : "justify-center text-uppercase caption pa-0 primary white--text dark",
				class_text  : "pa-0 ma-1", 
				class 		: "pa-0 ma-0",
			},

		],
		ref 	: "information",
	}),

	created(){
		if (this.ref_to_component) {
			this.ref += this.ref_to_component;
		}
		/*if (this.info_to_component) {
			this.render_settings(this.info_to_component);
		}*/
		if (this.update_to_component) {
			this.render_info(this.update_to_component);
		}
	}, // created

	watch : {
		update_to_component: function(val){
			if (val) {
				this.render_info(val)
			}
		}, // update to component
	}, // watch

	methods : {
		render_info(item){
			if (item) {
				console.log("CHECK INFO information ", item)
				this.info = { ...item };
			}
		}
	}, // methods
}
</script>