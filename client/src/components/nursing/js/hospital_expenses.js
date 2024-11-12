import host_exp_params  from "../../nursing/js/hospitalizacion_expenses_params.js"
import dates 			from "../../../helpers/dates.vue"

export default {
	name : "hospital_expenses",
	components : {
		dates
	}, //components
	data : () => ({
		info 		 : {},
		info_patient : {},
		head   : {
			title : "Gasto de Hospitalizacion",
			subtitle : "",
		},
		button : {
			title  : "Registrar", 
			color  : "primary",
			action : "save"
		},
		info_fields : host_exp_params,
	}), // data

	created(){

	}, // created

	methods : {
		render_listed(item){
			if (this[item]) {
				return this[item];
			}
		}, // render listed
	}, // methods
};