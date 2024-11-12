<template>
    <v-file-input
        dense        
        outlined
        show-size
        accept="image/*"
        :multiple = "isMultiple"      
        :loading = "loading || isLoading"   
        :label  = "textComponent"
        v-model = "file"
        @change = "convertFile(file)"
    ></v-file-input>
</template>    
<script>
    export default{
        name: "UploadFileComponent",
        props : ["typeBack", "typeFile", "textComponent", "isMultiple", "isLoading", "isReturnFile"],
        data : ()=>({
            file : null,
            loading : false,            
        }),
        methods:{
            convertFile(file){
                if (file) {
                    this.loading = true;
                    try{

                        if (file && file.length > 0) {
        						
        					let tempFiles = []
        					file.forEach(async (fil, idxFile)=> {						
        						if (fil) {
        							this.$Helper.fileToB64(fil).then(b64 => {        								
        								if (b64) {
        									tempFiles.push({
        										url    : b64,
        										key    : "imgb64" + idxfile + 1
        									})
        								}
        							})
        						}
        					}) 
        				}else{
                            if (this.isReturnFile) {
                                this.$emit("FileConverted",file);
                            }else{
                                this.$Helper.fileToB64(file).then(b64 => {
                                    if(b64){
                                        this.$emit("FileConverted",b64);
                                    }
                                })
                            }
                        }
                    }catch(error){
                        console.warn("Error convert file ", error)
                    }finally{
                        this.loading = false;
                    }
                }
            }
        }
    };
</script>