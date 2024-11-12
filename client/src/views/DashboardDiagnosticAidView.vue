<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardDiagnosticAid'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import agendas 						from "@/components/diagnosticAid/AgendaDiagnosticAidComponent.vue"	
	// import TypesDiagnosticAidComponent  from "@/components/diagnosticAid/TypesDiagnosticAidComponent.vue"
	export default{
		name : "DashboardDiagnosticAidView",
		components : {agendas,  DashboardLayout}, // , TypesDiagnosticAidComponent
		data : ()=>({
			list: [
				{
					key : 'agenda',
					component : "agendas",
					text : 'Agenda',
					isShow 		: true,
					form 		: "AgendaDiagnosticAidComponent",
				},
				// {
				// 	key : 'TypesDiagnosticAid',
				// 	component : "TypesDiagnosticAidComponent",
				// 	text : 'Configuraciones de Ayudas Diagnosticas',
				// },
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
		}, // computed
	}
</script>