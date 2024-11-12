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
	import DashboardLayout  	from "@/layouts/DashboardLayout.vue"
	import agendas 				from "@/components/pharmacy/AgendaPharmacyComponent.vue"	
	import inventory  			from "@/components/pharmacy/inventory.vue"
	import Products 			from "@/components/pharmacy/ProductsComponent.vue"
	export default{
		name : "DashboardPharmacyView",
		components : {agendas,  DashboardLayout, inventory, Products},
		data : ()=>({
			list: [				
				{
					key : 'agenda',
					component : "agendas",
					text : 'Agenda',
					isShow 		: true,
					form 		: "AgendaPharmacyComponent",
				},
				{
					key : 'inventory',
					component : "inventory",
					text : 'Inventario',
					isShow 		: true,
					form 		: "InventoryComponent",
				},
				{
					key : 'produtcs',
					component : "Products",
					text : 'Productos',
					isShow 		: true,
					form 		: "ProdutcsComponent",
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