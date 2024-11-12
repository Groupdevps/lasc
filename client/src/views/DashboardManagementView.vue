<template>
	<DashboardLayout :items="renderList" >
		<template v-slot:default="{item, currentHeight}">
			<component	 
				:key = "item.key + 'DasboardManagement'"
				:is  = "item.component"
				:info_to_comp  	= "item.props"
				:currentHeight = "currentHeight"
			></component>
		</template>
	</DashboardLayout> 
</template>
<script type="text/javascript">
	import DashboardLayout  			from "@/layouts/DashboardLayout.vue"
	import CurrentAdministrators 		from "@/components/management/current_administrators.vue"
	import Users 						from "@/components/users/users.vue"
	import Roles 						from "@/components/users/roles.vue"
	import Agreements 					from "@/components/management/agreements.vue"
	import ListsTariffs 				from "@/components/management/ListsTariffsComponent.vue"
	import Schedule 					from "@/components/info/ConstructionNotice.vue" // management/ScheduleComponent.vue
	import Centers 						from "@/components/management/CentersComponent.vue"


	export default{
		name : "DashboardManagementView",
		components : { DashboardLayout, Roles, Users, CurrentAdministrators, Agreements, ListsTariffs, Schedule, Centers},
		data : ()=>({
			list: [
				{
					key 		: 'roles',
					component 	: "Roles",
					text 		: 'Perfiles',
					isShow 		: true,
					form 		: "RolesComponent",
				},
				{
					key 		: 'users',
					component 	: "Users",
					text 		: 'Usuarios',
					isShow 		: true,
					form 		: "UsersComponent",
				},
				{
					key 		: "currentAdministrators",
					component 	: "CurrentAdministrators",
					text 		: "Administradoras vigentes",
					isShow 		: true,
					form 		: "CurrentAdministratorsComponent",
				},
				{
					key 		: "CentersComponent",
					component 	: "Centers",  
					text 		: "Centro",
					isShow 		: true,
					form 		: "CentersComponent",
				},
				{
					key 		: 'agreements',
					component 	: "Agreements",
					text 		: 'Convenios',
					isShow 		: true,
					form 		: "AgreementsComponent",
				},
				// {
				// 	key 		: 'schedule',
				// 	component 	: "Schedule",
				// 	text 		: 'Horarios',
				//  isShow 		: true,
				//  form 		: "",
				// },
				{
					key 		: 'Lists',
					component 	: "ListsTariffs",
					text 		: 'Listados',
					isShow 		: true,
					form 		: "ListsComponent",
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