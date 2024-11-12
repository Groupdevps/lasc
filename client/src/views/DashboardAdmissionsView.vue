<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardAdmissions'"
				:is  = "item.component"				
				:currentHeight = "currentHeight - (item.key == 'PatientAdmission'? 115 : 0)"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import ingresos 					from "@/components/admissions/PatientAdmissionComponent.vue"	
	import agendas 						from "@/components/admissions/AgendaAdmissionsComponent.vue"		
	export default{
		name : "DashboardAdmissionsView",
		components : {agendas,  DashboardLayout, ingresos}, // , TypesDiagnosticAidComponent
		data : (vm)=>({
			list: [
				{
					key 		: 'PatientAdmission',
					component 	: "ingresos",
					text 		: 'Ingreso Pacientes',
					isShow 		: true,
					form 		: "PatientAdmissionComponent",
				},
				{
					key 		: 'agenda',
					component 	: "agendas",
					text 		: 'Agenda',
					isShow 		: true,
					form 		: "AgendaAdmissionsComponent"
				},
				
			]
		}),		
		computed:{
			renderList(){				
				return this.list.filter(x=> {					
					if (this.$store.getters["auth/getPermission"](x.form).canView) {
						return x
					}
				});
			},
			// currentPermission(){
			// 	return this.$store.getters["auth/getPermission"]("PatientAdmissionComponent") // this.$route.name
			// },
			// currentPermissionAgenda(){
			// 	return this.$store.getters["auth/getPermission"]("AgendaAdmissionsComponent") // this.$route.name
			// },
		},
	}
</script>