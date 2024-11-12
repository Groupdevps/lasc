<template>
	<v-autocomplete
	  	clearable
	  	dense
	  	outlined	
	  	:items = "renderList"
	   	v-model="inputField[keyField]"
	  	label="TIPO DE ANALISIS"
        item-text="name"
        item-value="id"
        :return-object = "isReturnObject"
        :loading = "loading"
        @keyup.enter="saveType(searchText)"
        :filter="customFilter"
        :disabled = "isDisabled"
	>
		<template v-slot:item="data">                
            <template >              	
              	<v-list-item-content>
                	<v-list-item-title v-html="data.item.name"></v-list-item-title>
                	<v-list-item-subtitle v-html="data.item.description"></v-list-item-subtitle>
              	</v-list-item-content>
            </template>
        </template>
        <template v-slot:no-data>
        	<v-list-item-content class="primary ">
            	<v-list-item-title class="ml-1" v-html="'No existe tipo de analis, presione Enter para Agregar'"></v-list-item-title>                	
          	</v-list-item-content>
        </template>

	</v-autocomplete>
</template>
<script type="text/javascript">
	import typeAnalysisLaboratoryService from "@/services/TypeAnalysisLaboratoryService.js"
	export default{
		name : "TypeAnalysisMenuComponent",		
		props : ["inputField", "keyField", "isReturnObject", "isDisabled"],
		data : ()=>({
			list:[],
			loading:false,
			searchText : "",
		}),
		mounted(){
			this.getList();
		},
		computed:{
			renderList(){
				return this.list;
			}
		},
		methods:{
			getList(){
				this.loading = true;
				const service = new typeAnalysisLaboratoryService();
				service.getTypeAnalysis().then(res=>{
					if (res && res.data && res.data.length > 0) {
						this.list = res.data;
					}
					this.loading = false;
				}).catch(error =>{
					this.loading = false;
				})
			},
			saveType(item){
				this.loading = true;
				// console.log("check save type ", item)
				const service = new typeAnalysisLaboratoryService();
				service.saveTypeAnalysis({name: item}).then(res => {
					this.loading = false;
					if (res && res.data) {
						this.list.push(res.data);
					}
				}).catch(error =>{
					this.loading = false;
					this.$EventBus.$emit("notifications",{
						type : "error",
						msg : "Creando tipo de analisis"
					})
				})
			},
			customFilter(item, queryText, itemText){			
				const textOne = item.name ? item.name.toLowerCase() : "";
		        // const textTwo = item.description ? item.description.toLowerCase() : "";
		        const searchText = queryText.toLowerCase()
		        this.searchText = queryText;
		        return textOne.indexOf(searchText) > -1 
			}
		}
	}
</script>