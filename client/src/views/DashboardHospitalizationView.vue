<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardHospitalization'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import agendas 						from "@/components/hospitalization/AgendaHospitalizationComponent.vue"	
	// import SettingsHopitalizationComponent  from "@/components/hospitalization/SettingsStayHopitalizationComponent.vue"
	export default{
		name : "DashboardHospitalizationView",
		components : {agendas,  DashboardLayout, /*SettingsHopitalizationComponent*/},
		data : ()=>({
			list: [
				{
					key : 'agenda',
					component : "agendas",
					text : 'Agenda',
					isShow 		: true,
					form 		: "AgendaHospitalizacionComponent",
				},
				// {
				// 	key : 'SettingsHospitalization',
				// 	component : "SettingsHopitalizationComponent",
				// 	text : 'Configuraciones de Hospitalizacion',
				// 	isShow 		: true,
				// 	form 		: "",
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