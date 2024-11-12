<template>
	<TableHistoryLayout
		:listToTable="list"
		:totalToTable="total"		
		:headersToTable="headers"
		:loadingToTable="loading"
		:optionsToTable="{options}"
		:isExpand="false"
		:isHideDefaultFooter="true"
		heightToTable="200px"
		item-key="id"
		class="elevation-1"				
		:isPdfTop="total"
		:openPdfParentTop="PdfParentTop"		
	>
		<template v-slot:expanded="{ itemField }">
			<!-- [`expanded.${item_opt.key}`] -->
			<!-- <InfoTextField
    			:fieldsToComponent="fields"
    			:infoToField="itemField"
    			titleText="emergencyMedicalHistory"
			></InfoTextField>     -->			
		</template>		
	</TableHistoryLayout>
</template>
<script type="text/javascript">	
	import NursingNotesService from "@/services/NoteService.js"// NursingNotes
	// import emergency_medical_history  	from "@/components/medico/js/emergency_medical_history_params.js"
	import TableHistoryLayout from "@/layouts/TableHistoryLayout.vue"
	import InfoTextField 	from "@/components/info/InfoTextField.vue" 

	export default{
		name : "TableNursingNotesComponent",
		components:{TableHistoryLayout, InfoTextField},
		props:["attention"],
		data : ()=>({
			list : [],
			// fields : emergency_medical_history,
			total : 0,
			options:{itemsPerPage: 30},			
			loading:false,
			headers:[
				{ text : "FECHA", value : "date" },
				{ text : "HORA", value : "time" },		
				{ text : "OBSERVACION", value : "note" }, // motive / TypeService.name
				{ text : "USUARIO", value : "User.name" },
				// { text : "ACCIONES", value : "actions" },
				// { text : "pdf", value : "pdf", align: "end" },

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
					const noteType = this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote("NursingNotes"))?.id || undefined;
					const service=new NursingNotesService();
					const res=await service.findInfo({atn : this.attention, type:noteType  }); // attention: this.attention
					if (res) {
						if (res.data && res.data && res.data.length > 0){// .rows
							this.list=res.data;							
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
			PdfParentTop(item){
				if (item) {						
					try{
						item.loading = true;				
						if (this.attention) {
							const noteType = this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote("NursingNotes"))?.id || undefined;
							const service = new NursingNotesService(); //  atn, ord, type
							this.$Helper.openLink(service.linkPdf({atn : this.attention, type : noteType})); 
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