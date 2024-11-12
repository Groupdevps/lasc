<template>
    <v-data-table
        dense
	    fixed-header
		:headers 			 = "headers"
	 	:items 	 			 = "renderList"
	    class 	 			 = "elevation-5 ma-2"			 			   
	   	:footer-props 		 = "{
	   		showFirstLastPage   : false,	   		
	   		itemsPerPageOptions : [100],
	   		showCurrentPage     : false
	   	}"
	   	:loading-text 		= "$t('LoadingPeaseWait')"
        :height             = "200+'px'"
	    :loading  			= "loading"
        :show-select  		= "false"
        :single-select 		= "false"
        v-model 			= "selections"
        :item-key 			= "'id'"        
	    			
    >
        
        <template v-slot:item.download>
            <v-btn small color = "error">
                <v-icon   @click ="downloadMenu(itemMenu)">mdi-download</v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>
<script>

export default{
    name: "InstitutionalReportInvoiceComponent",
    props: ["infoToComponent"],
    data : ()=>({
        loading : false,
        list : [
            { id : 1, typeReport : "patientDocument",  text : "Documento Paciente" },
            { id : 2, typeReport : "anexo2",  text : "Anexo 2" },
            { id : 3, typeReport : "anexo3",  text : "Anexo 3" },
            { id : 4, typeReport : "anexo9",  text : "Anexo 9" },
            { id : 5, typeReport : "furip",  text : "FURIP" },
            { id : 6, typeReport : "furtran",  text : "FURTRAN" },
            { id : 7, typeReport : "in-hospital",  text : "Intra-Hospitalario" },
            { id : 8, typeReport : "traffic accident declaration",  text : "Formato declaracion de Accidente de Transito" },            
            { id : 9, typeReport : "proof of satisfaction",  text : "Comprobante de Satisfaccion" },
        ],
        selections : [],
        infoInput : { CAU : "sdasdasdsa"},
        headers : [
            { text : "Tipo de Reporte Institutional", value : "text", align: 'center',},
            { text : "Descargar", value : "download"},
           
        ]
    }), // data
    created(){
        if(this.infoToComponent){
            if(this.infoToComponent.AttentionId){
                this.getInfo({AttentionId : this.infoToComponent.AttentionId});
            }
        }
    }, // created
    watch:{
        infoToComponent: function(val){
            
            if(val){
                if(val.AttentionId){
                    this.getInfo({AttentionId : val.AttentionId})
                }
            }
        }
    }, // watch
    computed:{
        renderList: function(){
            return this.list;
        }
    }, // computed
    methods: {
        async getInfo(params){
            /* const service = new InvoiceDetailsService();
            const res = await service.getDetails(params);
            console.log("reports", res)
            if(res && res.data){
                
            } */
            
        },
        downloadMenu(item){

        }, 
    }, // methods
}
</script>
