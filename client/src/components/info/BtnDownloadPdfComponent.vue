<template>
    <v-btn        
        color = "error"
        @click = "downloadPDF(infoToComponent)"
        :loading = "loading"
    >
        <v-icon   class = "mr-1">mdi-download-circle</v-icon>
        {{ $t("pdf") }}
    </v-btn>
</template>    
<script>
    import pdfService from "@/services/pdfService.js"
    export default{
        name : "BtnDownloadPdfComponent",
        props : [ "infoToComponent", "typeFormToDownload"],
        data : ()=>({
            loading : false,
        }),
        methods : {
            async downloadPDF(item){
                if(item){
                    this.loading = true;
                    const request = new pdfService();
                    // numberId
                    // AttentionId
                    request.setInfo(item, this.typeFormToDownload);                       
                    const response = await request.getPDF();
                    if(response){
                        if(response.error){
                            //

                        }else{
                            //
                        }
                        this.loading = false;
                    }
                }
            }
        }
    }
</script>
