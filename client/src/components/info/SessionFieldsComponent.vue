<template>
	<v-row dense>
		<template v-for = "(field, idxField) of fields">
			<v-col
				:key  = "idxField + reference + '_field'" 	
				:cols = "field.cols ? field.cols : 4 "
			>
				<slot :name="'field-'+field.key" :itemField="field">
					<v-text-field
						dense
						outlined
						hide-details
						v-if		= "['text', 'email'].includes(field.type)"
						:label 			= "$t(field.text)"
						v-model 		= "value[field.key]"
						:type 			= "field.type"
						:disabled 		= "field.isDisabled"
						@input 		 	= "(v) => value[field.key] = v.toUpperCase()"
						class 			= "text-uppercase"
					></v-text-field>
					<v-text-field
						dense
						outlined
						hide-details
						v-else-if		= "['number'].includes(field.type)"
						:label 			= "$t(field.text)"
						v-model.number	= "value[field.key]"
						:type 			= "field.type"
						:disabled 		= "field.isDisabled"
						class 			= "text-uppercase"
						:suffix 		= "field.suffix"
					></v-text-field>	
					<v-checkbox
						dense
						outlined
						hide-details
						v-else-if = "'checkbox' == field.type"
						:label 			= "$t(field.text)"
						:disabled 		= "field.isDisabled"
						class 			= "text-uppercase"
						v-model 		= "value[field.key]"
					></v-checkbox>
				</slot>
			</v-col>
		</template>
		<v-col>
			<slot name="col-action"></slot>
		</v-col>
	</v-row>
</template>
<script type="text/javascript">
	export default{
		name : "SessionFieldsComponent",
		props : {
			reference : String,
			fields : { type: Array, required: true, default: [] }, 
			value : { type : Object, required:true,},
		},
		data:(vm)=>({
			inputInfo: {},
		})
	}
</script>