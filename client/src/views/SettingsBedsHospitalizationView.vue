<template>
	<v-container fluid>
		<v-card outlined elevation = "7">
			<v-card-title class  = "body-1 pa-0 white--text text-uppercase">	
				<v-btn					
					tile
					color  = "warning"
					@click  = "$router.go(-1)"					
				>
					<v-icon  class="mr-1">mdi-arrow-left</v-icon>
					{{ $t('go_back') }}
				</v-btn>
				
				<v-divider class="mt-8"></v-divider>
			</v-card-title>
			<v-card-text class = "pa-1 pt-5">
				<v-row
					dense
					:style = "`overflow-y : auto; overflow-x : hidden; max-height:  ${$vuetify.breakpoint.height-(180)}px;`"
					:ref= "'rowSettingsBed'"
				>
					<v-col>						
						<SettingsHopitalizationComponent :isEditable="true"></SettingsHopitalizationComponent>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-container>
	
</template>
<script type="text/javascript">
	import SettingsHopitalizationComponent  from "@/components/hospitalization/SettingsStayHopitalizationComponent.vue"
	export default{
		name : "SettingsBedsHopitalizationView",
		components : {SettingsHopitalizationComponent},
		data : ()=>({

		}),


	}
</script>