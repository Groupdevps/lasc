<template>
	<FormSessionLayout
		:fields="fields"
		title=""
		subtitle="Epicrisis"
		reference = "EpicrisisForm"
		:inputField="info"
		:ReduceSize="ReduceSize"
	>
		<template v-slot:buttons>
			<v-progress-linear
				indeterminate
				color="cyan"
				:active="loading"
				absolute
			></v-progress-linear>
			<br>

			<!-- <v-spacer></v-spacer>
				<v-btn
					v-show="!loading"
					small
					color  = "primary"
					@click  = "info.id ? update() : save()"
				>
					{{ info.id ? $t('update') : $t('save') }}
				</v-btn>

				<v-btn        
					small
					color = "error"
					@click = "openPdf()"
					:loading = "loading"
				>
					<v-icon   class = "mr-1">mdi-download-circle</v-icon>
					{{ $t("pdf") }}
				</v-btn>
			<v-spacer></v-spacer> -->
		</template>
		<template v-slot:field-pdfView="{ itemField }">
		    <strong >
		    	{{ msgResponse }}
		    </strong>		
			<pdfViewer 
		        v-if="uriPdf"
		        :urlPdf="uriPdf"                        
		    ></pdfViewer>	
		</template>
	</FormSessionLayout>	
</template>
<script type="text/javascript">
import pdfViewer from "@/components/info/PdfViewer2Component.vue"
import epicrisisService from "@/services/EpicrisisService.js"
import FormSessionLayout from "@/layouts/FormSessionLayout.vue"
export default {
    name: "AnexosComponent",
    props: ["infoToComponent" , "ReduceSize"],
    components:{FormSessionLayout, pdfViewer},
    data : ()=>({
    	uriPdf : null,
    	loading : false,
    	info : {},
    	msgResponse : "",
    	fields : [
    		{
				key : "pdfView",
				text : "",
				type : "pdf",
				enable : true,
				cols 	 : 12,				
			},
    	]
    }),
    mounted(){
    	this.getPdf();
    },
    methods:{
    	async getPdf(){
    		try{
    			this.loading = true;
    		 	const service = new epicrisisService();                        
                const res = await service.downloadEpicrisis({AttentionId: this.$route.params.id});               
             	if(res.data && res.request){                            
                	this.uriPdf = res.request.responseURL;                            
                }else if (res.error) {
    				this.msgResponse = "No se encontro o se ha generado Epicrisis"
                }
    		}catch(error){
    			console.warn("Error get epicrisis pdf ", error )
    			this.msgResponse = "No se encontro o se ha generado Epicrisis"
    		}finally{
    			this.loading = false;
    		}
    	},
    }, // methods
};
	
</script>