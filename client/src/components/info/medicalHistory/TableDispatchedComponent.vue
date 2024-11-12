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
				v-if="itemField && itemField.Medicines && itemField.Medicines.length"
				:headersToTable="headersSubTable"
				:infoToTable="itemField.Medicines"				
				heightToTable="80px"			
			></SimpleTable>
			<SimpleTable
				v-else
				:headersToTable="headersSubTableProducts"
				:infoToTable="itemField?.OrderProducts"				
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
	import DispatchService from "@/services/DispatchService.js"
	import TableHistoryLayout from "@/layouts/TableHistoryLayout.vue"
	import SimpleTable from "@/components/info/medicalHistory/SimpleTableComponent.vue"
	// import InfoTextField 	from "@/components/info/InfoTextField.vue" 
	export default{
		name : "TableDispatchedComponent",
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
				{ text : "TIPO DE ORDEN", value : "TypeOrder.name" },						
				{ text : "MEDICO", value : "Doctor.name" }, // motive / TypeService.name
				{ text : "ACCIONES", value : "actions" },
				// { text : "pdf", value : "pdf", align: "end" },

			],
			headersSubTable:[
				{ text: "CODIGO" , value:"MedicationList.atcCode", },
				{ text: "DESCRIPCION" , value:"MedicationList.description" },
				{ text: "Forma Farmaceutica" , value:"MedicationList.pharmaceuticalForm" },
				{ text: "CANTIDAD" , value:"amount" },
				{ text: "DOSIS" , value:"dosage" },
			],
			headersSubTableProducts:[
				{ text: "CODIGO" , value:"Product.code", },
				{ text: "PRODUCTO" , value:"Product.name", },
				{ text: "DESCRIPCION" , value:"Product.description", },
				{ text: "CANTIDAD" , value:"cant", },
				{ text: "PENDIENTE" , value:"pendingCant", },			
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
					const types = [];	
					const tempOrder1= this.$store.getters["listTypesOrder/getTypeOrderByName"]("SOLICITUD SUMINISTROS")
					const tempOrder2= this.$store.getters["listTypesOrder/getTypeOrderByName"]("ORDEN FORMULA MEDICA")
					if (tempOrder1) {
						types.push(tempOrder1.id)
					}
					if (tempOrder2) {
						types.push(tempOrder2.id)
					}
					const service=new OrderService();
					const res=await service.findInfo({
						AttentionId: this.attention,
						type : types, 
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
						if (item.id) {
							const service = new DispatchService();
							this.$Helper.openLink(service.linkPdf({id : item?.id})); 
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