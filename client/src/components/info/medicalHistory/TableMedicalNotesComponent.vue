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
	import MedicalNotesService from "@/services/NoteService.js" // MedicalNotes
	// import emergency_medical_history  	from "@/components/medico/js/emergency_medical_history_params.js"
	import TableHistoryLayout from "@/layouts/TableHistoryLayout.vue"
	import InfoTextField 	from "@/components/info/InfoTextField.vue" 

	export default{
		name : "TableMedicalNotesComponent",
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
				{ text : "EVOLUCION", value : "note" }, // motive / TypeService.name / OBSERVACION
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
					const service=new MedicalNotesService();
					const noteType = this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote("MedicalEvolution"))?.id || undefined;				
					const res=await service.findInfo({ atn : this.attention, type:noteType  }) // AttentionId: this.attention					
					if (res) {
						if (res.data && res.data && res.data.length > 0){ // ObservationEvolutionNotes.
							this.list=res.data; // .ObservationEvolutionNotes							
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
							const noteType = this.$store.getters["listNoteType/getTypeByName"](this.$Helper.renderTypeNote("MedicalEvolution"))?.id || undefined;				
							const service = new MedicalNotesService();
							this.$Helper.openLink(service.linkPdf({atn : this.attention, type : noteType}));// id : this.attention 
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