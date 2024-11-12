<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardAudits'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import Agenda 						from "@/components/audit/AgendaAuditsComponent.vue"
	


	export default{
		name : "DashboardAuditsView",
		components : { DashboardLayout, Agenda},
		data : ()=>({
			list: [
				{
					key 		: 'Agenda',
					component 	: "Agenda",
					text 		: 'Agenda',
					isShow 		: true,
					form 		: "AgendaAuditsComponent",
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