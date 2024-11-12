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
			<InfoTextField
    			:fieldsToComponent="fields"
    			:infoToField="itemField"
    			titleText="emergencyMedicalHistory"
			></InfoTextField>    			
		</template>		
	</TableHistoryLayout>
</template>
<script type="text/javascript">
	import EmergencyMedicalHistoryService from "@/services/EmergencyMedicalHistoryService.js"
	import emergency_medical_history  	from "@/components/medico/js/emergency_medical_history_params.js"
	import TableHistoryLayout from "@/layouts/TableHistoryLayout.vue"
	import InfoTextField 	from "@/components/info/InfoTextField.vue" 

	export default{
		name : "ClinicHistoryTableComponent",
		components:{TableHistoryLayout, InfoTextField},
		props:["attention", "patient"],
		data : ()=>({
			list : [],
			fields : emergency_medical_history,
			total : 0,
			options:{itemsPerPage: 30},			
			loading:false,
			headers:[
				{ text : "FECHA", value : "assignedDate" },
				{ text : "HORA", value : "hour" },		
				{ text : "MOTIVO", value : "HistoryInfoMedicPerson.motive" }, // motive / TypeService.name
				{ text : "ACCIONES", value : "actions" },
			],
			
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
					const service=new EmergencyMedicalHistoryService();					
					const res=await service.getListInfo({patient: this.patient}) // patient: this.$route.params.numberId
					if (res) {
						if (res.data && res.data.length > 0){
							this.list=res.data;							
							this.total=this.list.length;
						}else if (res.error) {
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
							const service = new EmergencyMedicalHistoryService();
							this.$Helper.openLink(service.linkPdf({id : item.id})); // AttentionId : this.$route.params.id / this.$route.params.id
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