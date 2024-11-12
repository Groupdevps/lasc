<template>
	<v-data-table
		dense
	    fixed-header
		:headers 			 = "headers"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5"			 			   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,
	   		itemsPerPageOptions : [100],
	   		showCurrentPage     : false
	   	}"
	   	:loading-text 		= "$t('LoadingPeaseWait')"
	    :height 			= "135"
	    :loading  			= "loading"
	    			
	></v-data-table>
</template>
<script type="text/javascript">
	export default{
		name: "SubTableSuppliesComponent",
		props:["listToComponent", "currentPermission"],
		data : ()=>({
			headers:[
				{text: "TIPO INSUMO", value:"TypeSupply" },
				{text: "DESCRIPCION", value:"description" },
				{text: "CANTIDAD", value:"cant" },

			],
			loading:false,

		}),
		computed:{
			renderList(){
				return this.listToComponent;
			}
		}
	}
</script>