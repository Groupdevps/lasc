<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardBilling'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import Agenda 						from "@/components/biller/AgendaBillingComponent.vue"
	import ConceptsComponent 			from "@/components/biller/ConceptsComponent.vue"
	import RipsComponent 				from "@/components/biller/RipsComponent.vue"


	export default{
		name : "DashboardManagementView",
		components : { DashboardLayout, Agenda, ConceptsComponent, RipsComponent},
		data : ()=>({
			list: [
				{
					key 		: 'Agenda',
					component 	: "Agenda",
					text 		: 'Agenda',
					isShow 		: true,
					form 		: "AgendaBillingComponent",
				},
				{
					key 		: 'ConceptsComponent',
					component 	: "ConceptsComponent",
					text 		: 'Manual Tarifario',
					isShow 		: true,
					form 		: "ConceptsComponent",
				},
				{
					key 		: 'RipsComponent',
					component 	: "RipsComponent",
					text 		: 'RIPS',
					isShow 		: true,
					form 		: "ConceptsComponent",
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