
	import agendas 		from "../../components/info/agendas.vue"
	import notas 		from "../../components/info/MedicalHistoryComponent.vue"
	export default{
		name : "doctors",
		components : {
			agendas,
			notas,
			
			
		},
		data : () => ({
			title 	: "Doctors",
			tab 	: null,  
			tab_items : [
				{
					key : 'agenda',
					component : "agendas",
					text : 'Agendas',
				},
				{
					key : 'notas',
					component : "notas",
					text : 'Notas',
				},
				/*{
					key : 'agenda',
					// component : "agendas",
					text : 'Agenda pendientes',
				},*/
				
			],
		}),
	};