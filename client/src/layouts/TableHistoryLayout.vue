<template>
	<v-data-table
		dense
	    fixed-header
	    :headers 			 = "headersToTable"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5 my-custom-table"			    	    
	   	:options.sync 		 = "optionsToTable.options"
	   	:server-items-length = "totalToTable"
	   	:footer-props 		 = "{
	   		showFirstLastPage   : true,
	   		itemsPerPageOptions : [30],
	   		showCurrentPage     : true
	   	}"
	   	loading-text 		= "CARGANDO... POR FAVOR ESPERE"
	    :height 			= "heightToTable"
	    item-key 			= "index"
	    :loading 			= "loadingToTable"	    	    	    
		:single-expand 		= "true"
		:expanded.sync 		= "expanded" 
		:show-expand 		= "isExpand"
		:hide-default-footer = "isHideDefaultFooter"
	>
		<template v-slot:top >
			<!-- <v-toolbar dense outlined height="32" v-if="isTop">
				<v-spacer></v-spacer>				

			</v-toolbar> -->
			<div>				
				<v-btn    
					top
					small
					right
					absolute    
					style="z-index: 3;"									
					v-show="isPdfTop"
					color="error"
					@click="openPdfParentTop(btnPdfTop)"
					:loading="btnPdfTop.loading"				
				>
					<v-icon  small class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			</div>
		</template>
		<template v-slot:expanded-item="{ headers, item }">
	      	<td :colspan="headers.length">
	        	<slot name="expanded" :itemField="item" ></slot>
	      	</td>
	    </template>
	    <template v-slot:item.actions="{item}">
	    	<v-btn        
				x-small
				color="error"
				@click="openPdfParentRow(item)"
				:loading="item.loading"
				v-show="isPdfRow"
			>
				<v-icon  small class="mr-1">mdi-download-circle</v-icon>
				{{ $t("pdf") }}
			</v-btn>
	    </template>
	</v-data-table>
</template>
<style scoped="scoped">
	.my-custom-table .v-data-footer {
	  /* height: 100px; Establecer el tamaño deseado */
	   min-height: 30px;
	}
</style>
<script type="text/javascript">
	export default{
		name : "TableHistoryLayout",
		props : ["listToTable", "totalToTable", "optionsToTable", "headersToTable", "loadingToTable", "isExpand", "isHideDefaultFooter","heightToTable", "isTop","isPdfRow", "isPdfTop", "openPdfParentRow", "openPdfParentTop"],
		data : ()=>({
			expanded:[],
			btnPdfTop: { loading : false },			
		}),
		computed:{
			renderList(){
				return this.listToTable;
			}
		},
	}
</script>