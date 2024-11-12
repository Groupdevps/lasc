<template>
	<DashboardLayout :items="list" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardSurgery'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import agendas 						from "@/components/surgery/AgendaSurgeryComponent.vue"	
	import SettingsSurgeryComponent  			from "@/components/surgery/SettingsSurgeryComponent.vue"
	export default{
		name : "DashboardDiagnosticAidView",
		components : {agendas,  DashboardLayout, SettingsSurgeryComponent},
		data : ()=>({
			list: [
				{
					key : 'agenda',
					component : "agendas",
					text : 'Agenda',
				},
				{
					key : 'TypesDiagnosticAid',
					component : "SettingsSurgeryComponent",
					text : 'Configuraciones de Cirugia',
				},
			]
		}),
	}
</script>