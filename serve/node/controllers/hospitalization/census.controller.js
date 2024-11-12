// controllers/censusController.js


const pdfMake = require('pdfmake');
const { generatePDF, sendPDFResponse } = require('../downloadControllers/pdfDownload.controller');
const { Bed, StayOrder, Room, Area,Person, RoomType } = require('../../models');

const generateCensusData = async () => {
  const beds = await Bed.findAll({
    include: [
      {
        model: StayOrder,
        required: false, // Permite incluir camas que no tienen órdenes de estancia
        include: [Person],
        where: {
          isActive: true
        }
      },
      {
        model: Room,
        include: [
          { model: Area },
          { model: RoomType }
        ]
      }
    ]
  });

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(bed => bed.StayOrders.length > 0).length;
  const unoccupiedBeds = totalBeds - occupiedBeds;

  const census = beds.map(bed => ({
    id: bed.id,
    code: bed.code,
    name: bed.name,
    description: bed.description,
    room: {
      id: bed.Room?.id,
      name: bed.Room?.name,
      description: bed.Room?.description,
      area: {
        id: bed.Room?.Area?.id,
        name: bed.Room?.Area?.name,
        description: bed.Room?.Area?.description
      },
      roomType: {
        id: bed.Room?.RoomType?.id,
        name: bed.Room?.RoomType?.name,
        description: bed.Room?.RoomType?.description
      }
    },
    available: bed.available,
    isActive: bed.isActive,
    stayOrder: bed.StayOrders.length > 0 ? bed.StayOrders[0] : null
  }));

  return { totalBeds, occupiedBeds, unoccupiedBeds, census };
};

// Controlador para obtener el censo en JSON
const getCensus = async (req, res) => {
  try {
    const censusData = await generateCensusData();
    res.status(200).json(censusData);
  } catch (error) {
    console.log("error en census: ", error);
    res.status(500).json({ message: 'Error al generar el censo de camas' });
  }
};


const processData = (censusData) => {
  console.log('censusData', censusData)
  const data = {
    core: {
      title: 'CENSO',
      subtitle: 'Hospitalización',
      subject: [
        ...(censusData.census && censusData.census.length > 0 ? [{
          subtitle: 'Listado de hospitalizados',
          header: ['room.area.name', 'room.name', 'stayOrder.Person.numberId', 'stayOrder.Person.fullName'],
          title: ['Área', 'Habitación', 'ID Paciente', 'Nombre Paciente'],
          data : censusData.census,
          isHorizontal: true
        }] : []),
       
      ]
    }
  };

  return data;
};



const generateAndSendPDF = (res, data) => {
    const pdfDoc = generatePDF(data);
    sendPDFResponse(res, pdfDoc);
};

const censusDownload = async (req, res) => {
    try {
        const info = await generateCensusData();

        if (info) {
            const result = processData(info);
            generateAndSendPDF(res, result);
        } else {
            res.status(404).json({
                message: 'No se encontró ningún resultado.'
            });
        }
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



module.exports = {
  getCensus,
  censusDownload
};
