<template>
	<v-data-table
		dense
	    fixed-header
		:headers 			 = "headers"
	 	:items 	 			 = "renderListDispatch"
	    class 	 			 = "elevation-5 ma-2"			 			   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,	   		
	   		itemsPerPageOptions : [100],
	   		showCurrentPage     : false
	   	}"
	   	:loading-text 		= "$t('LoadingPeaseWait')"
	    :height             = "264"			   
	    :loading 			= "loading" 
	></v-data-table>
</template>
<script type="text/javascript">
	export default{
		name : "SubOrdersDispatchComponent",
		props: ["listMedicinesToComponent", "listProductsToComponent", "typeOrderDispatch"],
		data : (vm)=> ({
			loading : false,
			list : [],
			headers :[],
		}),
		// watch:{
		// 	typeOrderDispatch(val){
		// 		this.renderType(val)
		// 	}
		// },
		// mounted(){

		// },
		computed:{
			renderListDispatch(){
				this.headers = this.listMedicinesToComponent && this.listMedicinesToComponent.length > 0 ? [
					{ text : "ATC", value : "MedicationList.atcCode"},
					{ text : "MEDICAMENTO", value : "MedicationList.description"},
					{ text : "CANTIDAD", value : "amount"},
				] : 
				[
					{ text : "PRODUCTO", value : "Product.name"},
					{ text : "CANTIDAD", value : "pendingCant"},
				];
				return this.listMedicinesToComponent && this.listMedicinesToComponent.length > 0 ? this.listMedicinesToComponent : this.listProductsToComponent;
			}
		},
	}
</script>