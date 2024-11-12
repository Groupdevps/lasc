<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardLaboratory'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import agendas 						from "@/components/laboratory/AgendaLaboratoryComponent.vue"	
	import TypesAnalisisComponent  			from "@/components/laboratory/TypesAnalisisComponent.vue"
	export default{
		name : "DashboardLaboratoryView",
		components : {agendas,  DashboardLayout, TypesAnalisisComponent},
		data : ()=>({
			list: [
				{
					key : 'agenda',
					component : "agendas",
					text : 'Agenda',
					isShow 		: true,
					form 		: "AgendaLaboratoryComponent",
				},
				{
					key : 'TypesAnalisis',
					component : "TypesAnalisisComponent",
					text : 'Formatos de Laboratorio',
					isShow 		: true,
					form 		: "LaboratoryFormatsComponent",
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
		}, // computed
	}
</script>