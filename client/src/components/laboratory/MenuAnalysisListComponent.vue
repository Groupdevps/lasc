<template>
	<v-autocomplete
	  	clearable
	  	dense
	  	outlined	
	  	:items = "renderList"
	   	v-model="inputField[keyField]"
	  	label="SELECCION ANALISIS PARA AGREGAR"
        item-text="name"
        item-value="id"
        :return-object = "isReturnObject"
        :loading = "loading"        
        placeholder = "REFERENCIAS DE ANALISIS "
        :disabled = "isDisabled"
	>
		<template v-slot:item="data">                
            <template >              	
              	<v-list-item-content>
                	<v-list-item-title v-html="data.item.name"></v-list-item-title>
                	<v-list-item-subtitle v-html="data.item.referenceValue"></v-list-item-subtitle>
                	<v-list-item-subtitle v-html="data.item.units"></v-list-item-subtitle>
                	<v-list-item-subtitle v-if="data.item.AnalysisType" v-html="data.item.AnalysisType.name"></v-list-item-subtitle>
              	</v-list-item-content>
            </template>
        </template>
	</v-autocomplete>
</template>
<script type="text/javascript">
	import AnalysisService from "@/services/AnalysisOfLaboratoryService.js"
	export default{
		name : "AnalysisListMenuComponent",
		props : ["inputField", "isReturnObject", "keyField", "isDisabled"],
		data : ()=>({
			list:[],
			loading:false,
		}),
		mounted(){
			this.getList();
		},
		computed:{
			renderList(){
				return this.list
			},
		},
		methods:{
			getList(){
				this.loading = true;
				const service = new AnalysisService();
				service.getAnalysis().then(res=>{
					if (res && res.data && res.data.length > 0) {
						this.list = res.data;
					}
					this.loading = false;
				}).catch(error=>{
					this.loading = false;					
				})
			}
		}

	}
</script>