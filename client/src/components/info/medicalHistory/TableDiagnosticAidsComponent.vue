<template>
	<TableHistoryLayout
		:listToTable="list"
		:totalToTable="total"		
		:headersToTable="headers"
		:loadingToTable="loading"
		:optionsToTable="{options}"
		:isExpand="true"
		:isHideDefaultFooter="true"
		heightToTable="200px"
		item-key="id"
		class="elevation-1"						
		:isPdfRow="true"
		:openPdfParentRow="PdfParentRow"
	>
		<template v-slot:expanded="{ itemField }">
			<!-- [`expanded.${item_opt.key}`] -->
			<SimpleTable
				:headersToTable="headersSubTable"
				:infoToTable="itemField?.OrderCupsLists"				
				heightToTable="80px"			
			></SimpleTable>
			<!-- <InfoTextField
    			:fieldsToComponent="fields"
    			:infoToField="itemField"
    			titleText="emergencyMedicalHistory"
			></InfoTextField>     -->			
		</template>		
	</TableHistoryLayout>
</template>
<script type="text/javascript">	
	import OrderService from "@/services/OrderService.js"
    import DiagnosticAidService from "@/services/DiagnosticAidService.js"

	import TableHistoryLayout from "@/layouts/TableHistoryLayout.vue"
	import SimpleTable from "@/components/info/medicalHistory/SimpleTableComponent.vue"
	// import InfoTextField 	from "@/components/info/InfoTextField.vue" 
	export default{
		name : "TableDiagnosticAidsComponent",
		components:{TableHistoryLayout, SimpleTable,/*InfoTextField*/},
		props:["attention"],
		data : ()=>({
			list : [],
			// fields : emergency_medical_history,
			total : 0,
			options:{itemsPerPage: 30},			
			loading:false,
			headers:[
				{ text : "FECHA", value : "dateTime" },
				// { text : "HORA", value : "hour" },		
				{ text : "ESTADO", value : "Status.name" },		
				{ text : "MEDICO", value : "Doctor.name" }, // motive / TypeService.name
				{ text : "ACCIONES", value : "actions" },
				// { text : "pdf", value : "pdf", align: "end" },

			],
			headersSubTable:[
				{ text: "CODIGO" , value:"CupsList.code", },
				{ text: "DESCRIPCION" , value:"CupsList.description" },
			]
			
		}),
		watch:{
			attention(val){
				if (val) {
					this.getList();
				}
			}
		},
		mounted(){
			this.getList();			
		},
		methods:{
			async getList(){
				try{
					this.loading=true;
					const typeOrder = this.$store.getters["listTypesOrder/getTypeOrderByName"]("ORDEN AYUDA DIAGNOSTICA");	
					const service=new OrderService();
					const res=await service.findInfo({
						AttentionId: this.attention,
						type : [typeOrder?.id || undefined], 
					});					
					if (res) {
						if (res.data && res.data && res.data.orders.length > 0){
							this.list=res.data.orders.map(x=>{
								x.dateTime = this.$ManagerSmith.getDateCurrentHour(x.createdAt)
								return x
							});
							this.total=this.list.length;
						}else{
							this.list=[];
							this.total=0;
						} 
					}
				}catch(error){
					console.warn("error ", error)

				}finally{
					this.loading=false;
				}
			},
			
			PdfParentRow(item){
				if (item) {						
					try{
						item.loading = true;				
						if (item.orderNumber) {
							const service = new DiagnosticAidService();
							this.$Helper.openLink(service.linkPdf({id : item?.orderNumber})); 
						}
					}catch(error){
						console.warn("Error open pdf ", error )
					}finally{
						item.loading=false;
					}
				}
			}
		}// methods
	};
</script>