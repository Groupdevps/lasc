<template>
	<v-card outlined>
		<v-card-title class ="primary subtitle-2 white--text pa-0">
			<v-btn                  
                small
                color  = "warning"
                @click  = "$router.go(-1)"
                tile
            >
                <v-icon small class="mr-1">mdi-arrow-left</v-icon>
                {{ $t('go_back') }}
            </v-btn>
            <v-spacer></v-spacer>
			<span> REGISTRO FORMATOS DE ANALISIS</span>	
            <v-spacer></v-spacer>
		</v-card-title>
		<v-card-text class="pa-1 pt-2">
			<v-row dense justify="start">					
				<v-col cols="5">							
					<MenuCupsListComponent
						:inputField = "info"
						keyField = "CupList"
						:isReturnObject = "true"
						labelToMenu = "SELECCIONAR FORMATO A REALIZAR"
						ref = "fieldCupList"
						autoSelectBy = "code"
					></MenuCupsListComponent>			
				</v-col>
				<v-col>
					<v-divider class="mt-10"></v-divider>
				</v-col>

				<v-col cols="12">							
					<SubTypesAnalisis  
						:infoToComponent="info" 							
						:currentHeight="currentHeight"
						ref="AnalysisLaboratory"
						:currentPermission="currentPermission"
					></SubTypesAnalisis>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>			
</template>
<script type="text/javascript">
	import typeAnalysisLaboratoryService from "@/services/TypeAnalysisLaboratoryService.js"

	import SubTypesAnalisis from "@/components/laboratory/SubTypesAnalisisComponent.vue"
	import MenuCupsListComponent from "@/components/info/MenuCupsListComponent.vue"

	export default{
		name : "TypesAnalisisView",
		components : { SubTypesAnalisis, MenuCupsListComponent },
		data: ()=>({			
			info : {CupList: null},			
			loading : false,			
			fields : [
				{ key : "CupList", text : "Cup", type: "cupList"},
				{ key : "AnalysisList", text : "Analisis", type : "analysisList", },
				
			]
		}),
		watch:{
			"info.CupList": function(val){				
				if (val) {
					if (this.$refs && this.$refs.AnalysisLaboratory) {
						const comp = this.$refs.AnalysisLaboratory;
						comp.getListParams({cup : val.code})
					}
				}
			}
		},
		
		mounted(){
			this.$nextTick(()=>{
				this.getInfo();
			})
		},
		computed : {
			currentHeight(){
				return this.$vuetify.breakpoint.height;
			},
			currentPermission(){
				return this.$store.getters["auth/getPermission"]("LaboratoryFormats") // this.$route.name
			},
		},
		methods:{
			actions(actionn, item){
				const {action} = actionn;
				
			},
			async getInfo(){
				try{
					this.loading = true;
					if (this.$route && this.$route.params && this.$route.params.id && this.$route.params.option == 'update') {						
						this.info = { CupList : {id : this.$route.params.id}};						
					}

				}catch(error){
					console.warn("Error get info type analysis ", error)
				}
				this.loading = false;
			},
			async saveOrUpdate(item){
				try{
					this.loading = true;
					if (this.$Helper.isPermission(this.currentPermission, "canAdd")) {
						// console.log("SAVE Analisis ", item)
						if (this.$refs && this.$refs.AnalysisLaboratory) {
							const comp = this.$refs.AnalysisLaboratory;
							if (item.AnalysisList && item.CupList) {
								// CupList
								//AnalysisList
								comp.saveWithComponent(item)
							}else{
								this.$EventBus.$emit("notifications",{
									type : "warning",
									msg : "Requiere Analisis y cup"
								})
							}
						} 
					}
				}catch(error){
					console.warn("Error save/update type laboratory ", error)
					this.$EventBus.$emit("notifications",{
						type: "error",
						msg : "En Guardar  analisis"
					})
				}
				this.loading = false;
			},
		},	
		
	}
</script>