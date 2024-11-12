const pdfMake = require('pdfmake');
const moment = require('moment')


const drawTable = (tableData, headerMapped, headerPersonalized, isHorizontal = true) => {
  const isArrayData = Array.isArray(tableData) ? tableData : [tableData];

  // Mapeo de los datos según el formato
  const mapItem = (item) => {
    return headerMapped.map(key => {
      const value = key.includes('.') ? key.split('.').reduce((obj, prop) => obj && obj[prop], item) : item[key];
      return value !== undefined && value !== null ? value : '';
    });
  };

  let tableBody;

  if (isHorizontal) {
    // Formato horizontal (filas)
    tableBody = [
      headerPersonalized,
      ...isArrayData.map(item => mapItem(item))
    ];
  } else {
    // Formato vertical (columnas)
    tableBody = [];
    isArrayData.forEach(item => {
      headerMapped.forEach((header, index) => {
        const cellValue = item[header] !== undefined ? item[header] : '';
        // Agrega cada celda como una fila
        tableBody.push([{ text: `${headerPersonalized[index]}: ${cellValue}`, fillColor: undefined, fillOpacity: undefined }]);
      });
      tableBody.push([{ text: '', fillColor: undefined, fillOpacity: undefined }]); // Separador entre items
    });
  }

  const layout = {
    hLineWidth: (i, node) => (i === 0 || i === node.table.body.length) ? 0 : 0.1,
    vLineWidth: (i, node) => 0,
    hLineColor: (i, node) => '#aaa',
    paddingLeft: (i, node) => 5,
    paddingRight: (i, node) => 1,
    paddingTop: (i, node) => 1,
    paddingBottom: (i, node) => 1
  };

  const fontSize = 8;
  return {
    columns: [
        {
            width: '100%', // Asegura que la columna ocupe todo el ancho disponible
            table: {
                headerRows: isHorizontal ? 1 : 0, // Usar encabezados solo en formato horizontal
                widths: isHorizontal ? Array(headerPersonalized.length).fill('*') : ['*'], // Ancho flexible
                body: tableBody
            },
            layout: layout, // Asegura el layout deseado
            fontSize: fontSize,
            
        }
      ]
  };


};







const generatePDF = (data) => {
  const fonts = {
      Roboto: {
          normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
          bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
          italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
          bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf',
      }
  };

  const printer = new pdfMake(fonts);

  const docDefinition = {
      content : [
          {
            columns: [
              {
                  width: '20%',
                  image: `../node/public/img/logoFunconstes.jpg`,
                  fit: [65, 65], // Ajusta la imagen dentro del área
              },
              {
                  width: '55%',
                  text: [
                      { text: `${data.core.title}\n`, style: 'header' },
                      { text: `${data.core.subtitle}\n`, style: 'subtitle' }
                  ],
              },
              {
                  width: '25%',
                  text: [
                      'Fecha de impresión: ' + moment().format('YYYY-MM-DD hh:mm A'),
                      { text: '\n' },
                      'Creado el: ' + moment(data.createdAt).format('YYYY-MM-DD hh:mm A'),
                      { text: '\n\n' }
                  ],
                  style: 'dateheader',
              }
          ]
          }
      ],
      footer: function (currentPage, pageCount) {
        const footerLines = (data.core.footer && Array.isArray(data.core.footer.lines)) ? data.core.footer.lines : ['']; 

        return {
            columns: [
                {
                    text: footerLines.join('\n'),
                    alignment: 'center',
                    fontSize: 9,
                    margin: [0, 10]
                }
            ]
        };
      },
    
      styles: {
          header: {
              fontSize: 12,
              bold: true,
              margin: [10, -15, 0, 0],
              alignment: 'center'
          },
          subtitle: {
              fontSize: 8,
              alignment: 'center',
              margin: [10, -10, 0, 0],
          },
          subheader: {
              fontSize: 10,
              bold: true,
              margin: [0, 0, 0, 0],
          },
          default: {
              fontSize: 8
          },
          dateheader: {
              fontSize: 8,
              bold: false,
              alignment: 'right'
          },
      },
      pageMargins: [40, 60, 40, 60]
  };

  // Procesar los subjects
  data.core.subject.forEach(subject => {
    if (subject.subtitle) {
      docDefinition.content.push({
        columns: [
          { width: '100%', text: `${subject.subtitle}`, style: 'subheader' },
        ]
      });
    }
  
    const isHorizontal = subject.isHorizontal !== undefined ? subject.isHorizontal : true; 
    docDefinition.content.push(
        drawTable(subject.data, subject.header, subject.title, isHorizontal)
    );
  });
  
  return printer.createPdfKitDocument(docDefinition);
};




const sendPDFResponse = (res, pdfDoc) => {
  res.setHeader('Content-Disposition', 'inline; filename=archivo.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  pdfDoc.pipe(res);
  pdfDoc.end();
};


const downloadPDF = (req, res) => {
  try {
      const pdfDoc = generatePDF();
      sendPDFResponse(res, pdfDoc);
  } catch (error) {
      console.error('Error al generar el PDF:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  drawTable,
  generatePDF,
  sendPDFResponse,
  downloadPDF
}
//propiedades faltantes
/* result.core = {
                title : 'Formula Medica',
                subtitle : 'Procedimientos :',
                subject : {
                    header: [ 'CupsList.code', 'CupsList.description'],
                    title: ['Codigo','Descripcion'],
                    data : result.SubTreatment ,
                }
            }; */
