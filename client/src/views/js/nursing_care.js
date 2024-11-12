
	import notas 				from "../../components/info/notes.vue"
	import supplies 			from "../../components/nursing/supplies.vue"
	import hospital_expenses 	from "../../components/nursing/hospital_expenses.vue"

	export default{
		name : "nursing",
		components : {
			notas,
			supplies,
			hospital_expenses,
			
		},
		data : () => ({
			title 	: "Nursing",
			tab 	: null,  
			tab_items : [
				{
					key : 'notas',
					component : "notas",
					text : 'Notas de enfermeria',
				},
				{
					key : 'supplies',
					component : "supplies",
					text : 'Suministros',
				},
				{
					key : 'hospital_expenses',
					component : "hospital_expenses",
					text : 'Gastos Hopitalarios',
				},
				
			],
		}),
	};