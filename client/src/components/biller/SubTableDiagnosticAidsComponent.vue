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
		name: "SubTableDiagnosticAidsComponent",
		props:["listToComponent", "currentPermission"],
		data : ()=>({
			headers:[
				{text: "CUP", value:"CupList.cup" },
				{text: "DESCRIPCION", value:"CupList.description" }
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