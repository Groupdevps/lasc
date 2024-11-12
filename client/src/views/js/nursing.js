
	import agendas 		from "../../components/info/agendas.vue"
	import notas 		from "../../components/info/MedicalHistoryComponent.vue"
	export default{
		name : "nursing",
		components : {
			agendas,
			notas,
			
			
		},
		data : () => ({
			title 	: "Nursing",
			tab 	: null,  
			tab_items : [],
		}),
	};