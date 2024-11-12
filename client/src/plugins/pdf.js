// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import epicrisis from "@/plugins/pdfFormats/epicrisisFormat.js"
import header from "@/plugins/pdfFormats/headerFormat.js"


export default class pdfClass{
    constructor(){

    }
    async PdfUrlBlob(item, typeForm){
        console.log("GENERAR PDF ", item)
        // Crear un documento jsPDF
        var doc = new jsPDF({  
            precision: 6,  // Ajusta la precisión de los números decimales
            putOnlyUsedFonts: true,
        });
        // Agregar contenido al documento
        await this.formatDoc(doc, item, typeForm) 
        
        
        // Obtener los datos en formato Uint8Array        
        const pdfData = doc.output("bloburl");        
        // Crear un Blob a partir de los datos
        // doc.save();
        return pdfData
        
        
        
        // var blob = new Blob([pdfData], { type: 'application/pdf' });
        // var blobURL = await URL.createObjectURL(blob)
        /* var embed = document.createElement('embed');
        embed.src = blobURL;
        embed.type = 'application/pdf';
        embed.width = '100%';
        embed.height = '600px';

        // Agregar el objeto embed al cuerpo del documento
        document.body.appendChild(embed); */
        // Abrir la URL en una nueva pestaña
        // window.open(blobURL, '_blank');
        // Crear una URL para el Blob
        // return blobURL ;
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
  
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
  
        return btoa(binary);
      }
    async addImageToPDF(doc, {value , ext='JPEG' , x ,y, w=50, h=50}) {
        await doc.addImage(value, ext, x, y, w, h);            
        return
    }
    addTableToPDF(doc, { y=30, header=['Nombre', 'Apellido', 'Edad'], tableData = []}){
        // Crear datos de la tabla
        // const tableData = [
            // ['John', 'Doe', 30],
            // ['Jane', 'Doe', 28],
            // ['Bob', 'Smith', 35],
        // ];
        
        // Configurar opciones de la tabla
        const options = {
            startY: y, //30, // Posición vertical inicial de la tabla
        };

        // Agregar la tabla al documento
        doc.autoTable({
            head: [header], // Encabezado de la tabla
            body: tableData, // Cuerpo de la tabla (excluyendo el encabezado)
            startY: options.startY,
        });
    }
    formatDoc(doc, item, type){
        if(type == "epicrisis" ){            
            doc.setFont('times'); // Puedes cambiar 'times' por otro tipo de letra válido
             // Puedes cambiar 12 por otro tamaño de fuente
            // doc.text('Hola, este es un documento PDF de ejemplo. ' + item, 10, 10);
            // Agregar título
            // doc.text('Ejemplo de Tabla en PDF', 180, 5);
            // add header       
            doc.setFontSize(20);
            doc.setFont("helvetica", "bold");
            doc.text("EPICRISIS", 90, 15)   
            doc.setFontSize(10);
            doc.setFont('times', "normal");

            header.forEach(async (it)=>{
                if(it.type == "img"){                    
                    await this.addImageToPDF(doc, it);
                }else if(it.type == "text"){
                    doc.text(it.text, it.x, it.y)
                }

            });
            epicrisis.forEach((it)=>{
                const {x,y,w,h} = it;
                if(it.type == "rect"){
                    doc.rect(x,y,w,h);
                }else if(it.type == "text"){
                    doc.text(it.text, x, y)
                }
            })
            // this.addTableToPDF(doc,{y: 50})
            

        }

    }
}