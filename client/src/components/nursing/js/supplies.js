import supplies_params  from "../../nursing/js/supplies_params.js"
import dates 			from "../../../helpers/dates.vue"

export default {
	name : "supplies",
	components : {
		dates
	}, //components
	data : () => ({
		info 		 : {},
		info_patient : {},
		head   : {
			title : "Hoja  de Suministros",
			subtitle : "",
		},
		button : {
			title  : "Registrar", 
			color  : "primary",
			action : "save"
		},
		info_fields : supplies_params,
	}), // data

	created(){

	}, // created

	methods : {
		render_listed(item){
			if (this[item]) {
				return thi[item];
			}
		}, // render listed
	}, // methods
};