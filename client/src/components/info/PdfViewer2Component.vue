<template>
    <div>
      <iframe ref="pdfFrame" width="100%" height="400px"  ></iframe>
      <!-- <canvas id="pdfCanvas" width="800" height="600"></canvas> -->
      <!-- <embed ref="pdfEmbed"  width="100%" height="400px" type = 'application/pdf'/> -->
  
    </div>
  </template>
  <!-- /anexos/anexo_2.pdf -->
  <script>
  
  export default {
    props :["urlPdf"],
    components:{},
    mounted(){
      if(this.urlPdf){
        this.$refs.pdfFrame.src = this.urlPdf;
        this.$nextTick(()=>{
          // this.showPDF(); 
        })
      }

    },
    watch: {
      urlPdf: function(val){
        if(val){          
          // this.$refs.pdfFrame.src = val;
        }
      }
    },
    
  };
  </script>
  
  <style>
  /* Estilos si es necesario */
  </style>
  