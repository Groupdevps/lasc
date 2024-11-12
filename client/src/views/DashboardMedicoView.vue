<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardMedico'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import agendas 						from "@/components/medico/AgendaMedicoComponent.vue"		
	export default{
		name : "DashboardMedicoView",
		components : {agendas,  DashboardLayout},
		data : ()=>({
			list: [
				{
					key : 'agenda',
					component : "agendas",
					text : 'Agenda',
					isShow 		: true,
					form 		: "AgendaMedicaComponent",
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