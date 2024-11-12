<template>
  <v-container fluid>

    <div class="pdf-viewer">
      <!-- Botón para cargar el PDF -->
      <!-- <v-btn @click="loadAndRenderPDF">Cargar PDF</v-btn> -->
      
      <!-- Contenedor para mostrar el PDF -->
      <div  ref="pdfViewer"></div>
      
      <!-- Botón para descargar el PDF -->
      <!-- <v-btn v-if="showDownloadButton" @click="downloadPDF">Descargar PDF</v-btn> -->
    </div>
  </v-container>
  </template>
  
  <script>
  // import { jsPDF } from 'jspdf'; // no in use
  // import pdfjsLib from 'pdfjs-dist/build/pdf';
  // import 'pdfjs-dist/build/pdf';
  // import 'pdfjs-dist/build/pdf.worker'; 
  // import { PDFDocument,degrees, StandardFonts, rgb } from 'pdf-lib';
  
  export default {
    name : "PdfViewerComponent",
    props : [ "type", "routePdf","parameterToComponent","infoToComponent"],
    data: () =>({
        pdf: null,
        showDownloadButton: false
      
    }),
    methods: {
      async loadPDF() {
      const pdfViewer = this.$refs.pdfViewer;

      try {
        const pdf = await pdfjsLib.getDocument("/anexos/anexo_2.pdf").promise;
        const page = await pdf.getPage(1);
        console.log("NU PAGES ", pdf.numPages)
        const scale = 1.5; // Escala de visualización
        const viewport = page.getViewport({ scale });

        // Crear un elemento canvas para mostrar la página
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Renderizar la página en el canvas
        await page.render({ canvasContext: context, viewport }).promise;

        // Agregar el canvas al visor
        pdfViewer.appendChild(canvas);
      } catch (error) {
        console.error('Error al cargar el PDF:', error);
      }
    },    
    },
    mounted() {
      // pdfjsLib.GlobalWorkerOptions.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js'; // Reemplaza con la ruta real al worker de PDF.js
      // this.loadPDF();
  },
  }
  </script>