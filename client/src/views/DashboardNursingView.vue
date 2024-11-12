<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardNursing'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import agendas 						from "@/components/nursing/AgendaNursingComponent.vue"		
	import CensusComponent  			from "@/components/nursing/CensusComponent.vue"
	export default{
		name : "DashboardLaboratoryView",
		components : {agendas,  DashboardLayout, CensusComponent},
		data : ()=>({
			list: [
				{
					key : 'agenda',
					component : "agendas",
					text : 'Agenda',
					isShow 		: true,
					form 		: "AgendaNursingComponent",
				},
				{
					key : 'census',
					component : "CensusComponent",
					text : 'Censo',
					isShow 		: true,
					form 		: "AgendaNursingComponent",
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
		},
	}
</script>