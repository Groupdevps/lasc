const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
function renderArrayBoxes({item, element, fontPdf, page, height}){ // for type boxes
  if(typeof item=="string"){    
    if (element.isSplitDateForm1) {
      const date = item.split("-");
      item = date[2]+date[1]+date[0];
    }
    if (element.isSplitHourForm1) {
      item = item.split(":").join("");      
    }
    let arrayValue = item.split("");
    if(element.isText){
      page.drawText(`${item}`, { x: element.x, y: (height - element.y), font: fontPdf , size: element.size || 7});    
    }else if(element.isInverted){
      arrayValue = arrayValue.reverse();
      for(let i=arrayValue.length; i >= 0; i-- ){                          
        if(arrayValue && arrayValue[i]){
          page.drawText(`${arrayValue[i]}`, { x:  element.x - (i*element.space), y: (height - element.y), font: fontPdf , size: element.size || 7});              
        }
      }
    } else{
      // if(item == "demo"){ console.log("item demp  ",item, element)}
      for(let i=0; i <= arrayValue.length && (i <=  element.len); i ++ ){                  
        if(arrayValue && arrayValue[i]){
          page.drawText(`${arrayValue[i]}`, { x:  element.x + (i*element.space), y: (height - element.y), font: fontPdf , size: element.size || 7});              
        }
      }
    }
  }
}
const printXY = (width,height, page, fontPdf)=>{
 // console.log("WIDTH ", width, " heigth ", height)
  const x1 = 60, x2 = 100;
  const y1 = 60, y2 = 121;
  // for(let k = 0; k <= 500; k=k+10){
    
    for(let j=1; j <= height; j=j+3){      
      if(y1 >= j <= y2){
        page.drawText(`y ${j}`, { x: 305, y: (height - j ), font: fontPdf , size: 3});
      }
    }
    for(let i=1; i <= width; i=i+15){      
      if ( x1 >= i <= x2) {          
        page.drawText(`x ${i}`, { x: i, y: (height - (150) ), font: fontPdf , size: 5});
        page.drawText(`x ${i}`, { x: i, y: (height - (200) ), font: fontPdf , size: 5});
        page.drawText(`x ${i}`, { x: i, y: (height - (400) ), font: fontPdf , size: 5});
        page.drawText(`x ${i}`, { x: i, y: (height - (550) ), font: fontPdf , size: 5});
        page.drawText(`x ${i}`, { x: i, y: (height - (700) ), font: fontPdf , size: 5});

      }
    }
  // }
}
const  divideText = (texto, longitudParte)=> {
  const partes = [];
  let inicio = 0;

  while (inicio < texto.length) {
    partes.push(texto.substring(inicio, inicio + longitudParte));
    inicio += longitudParte;
  }
  return partes;
}
async function editarPDF(pdfPath, jsonData, fields, outputPath) {
  try {
    // Leer el PDF existente
    const existingPdfBytes = await fs.promises.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    let page = pdfDoc.getPages()[0];
    const fontPdf = await pdfDoc.embedFont(StandardFonts.Helvetica)
    
    const form = pdfDoc.getForm()

    
    let { width, height } = page.getSize()

    // Agregar texto desde el JSON a la página
    //printXY(width,height, page, fontPdf);

    
    if(jsonData && fields && fields.length > 0){
      fields.forEach(async element => {
        // if(element.key == "certificateMedicalCareVictimTreatingProfessionalMedicalRecordNumber" )jsonData[element.key] = "123456789012"//jsonData[element.key] + " calle asda as 23";
        console.log("element.key ", element.type, element.key, jsonData[element.key], typeof jsonData[element.key])
        if(element.keyPage >= 0){ // next page pdf
          page = pdfDoc.getPages()[element.keyPage];
          width =  page.getSize().width;
          height = page.getSize().height;
          //printXY(width,height, page, fontPdf);

        }else
        if(jsonData[element.key]){
          if(element.type == "select"){
            if(element.option){
              // console.log("Select : ",element.option[jsonData[element.key]])
              if(element.option[jsonData[element.key]]){
                let {x, y, w, h, size, isText, text} = element.option[jsonData[element.key]];
                if (isText) {
                  page.drawText(`${text}`, { x: x, y: (height - y), font: fontPdf , size: size || 7});
                }else{

                  const checkbox = form.createCheckBox('select_'+element.key)
                  checkbox.addToPage(page, { x: x, y: height - y, width :w, height: h,
                    borderColor: rgb(1, 1, 1),
                    borderWidth: 1, 
                  })
                  checkbox.check();
                  checkbox.enableReadOnly();
                }
                // page.drawText(`✔`, { x: x, y: (height - y), font: fontPdf , size: element.size || 7});
              }
            }

          }else if(element.type=="text" ){
            page.drawText(`${jsonData[element.key]}`, { x: element.x, y: (height - element.y), font: fontPdf , size: element.size || 7});              
          }else if(element.type=="boxes"){
            renderArrayBoxes({item: jsonData[element.key], element, fontPdf, page, height});
            
          }else if(element.type == 'condition'){
            if(element.option){
              if(jsonData[element.keyCondition] && element.option[jsonData[element.keyCondition]]){      
                let itemElement = element.option[jsonData[element.keyCondition]]                
                renderArrayBoxes({item: jsonData[element.key], element : itemElement, fontPdf, page, height});
              }
            }
          }else if (element.type == 'textarea'){            
            const arrayText = divideText(jsonData[element.key],element.limitText);
            if (arrayText.length > 0) {
              arrayText.forEach((txt, idx )=>{
                if (idx <= element.limitLines) {
                  page.drawText(`${txt}`, { x: element.x, y: (height - (element.y + (idx * element.interline)) ), font: fontPdf , size: element.size || 7});              
                }                
              })
            }

          }else if(element.type == 'list'){
            if (jsonData[element.key].length > 0 && element.fields) {
              jsonData[element.key].forEach((it, idxList)=>{
                for( let iter in element.fields){
                  if( it && it[iter] && element.fields[iter]){
                    if (element.fields[iter].type == 'boxes') {
                      element.fields[iter].y = element.fields[iter].y + (idxList === 0 ? 0 : element.interline); 
                      renderArrayBoxes({item: it[iter], element: element.fields[iter], fontPdf, page, height});        
                    }else if(element.fields[iter].type == 'text'){
                      element.fields[iter].y = element.fields[iter].y + (idxList === 0 ? 0 : element.interline); 
                      page.drawText(`${it[iter]}`, { x: element.fields[iter].x, y: (height - element.fields[iter].y), font: fontPdf , size: element.fields[iter].size || 7}); 
                    }
                  }
                }
              })
              
            }
            
          }else if(element.type == 'fieldText'){
            const textField = form.createTextField(`field.${element.key}`)
            textField.setText(jsonData[element.key])
            textField.enableReadOnly();
            textField.addToPage(page, { x: element.x, y: height - element.y,  font: fontPdf , width: element.w, height: element.h })
          }
        }
      });
    }
    


    const modifiedPdfBytes = await pdfDoc.save();
    await setTimeout(() => {
        
    }, 2000);
    console.log(`PDF editado `);
     // Devolver el contenido del PDF editado
     return modifiedPdfBytes;
  } catch (error) {
    console.error('Error al editar el PDF:', error);
  }
}

module.exports = editarPDF