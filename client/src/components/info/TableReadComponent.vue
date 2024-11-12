<template>
	<v-data-table
		dense
	    fixed-header
		:headers 			 = "headersToComponent"
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
		name : "TableReadComponent",
		props : ["listToComponent", "reference", "headersToComponent"],
		data : ()=>({
			loading: false
		}),
		computed:{
			renderList(){
				return this.listToComponent;
			}
		},
	};
</script>