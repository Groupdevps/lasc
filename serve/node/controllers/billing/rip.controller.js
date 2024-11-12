// controllers/rips.controller.js
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const { HistoryPerson, Attention, Bill, SubdiagnoseList } = require('../../models');

const getAttentionsWithDetails = async (startDate, endDate, currentAdministratorName) => {
  try {
    // Obtener atenciones con factura en el rango de fechas y filtradas por currentAdministratorName
    const attentions = await Attention.findAll({
      where: {
        assignedDate: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: HistoryPerson,
          attributes: ['name', 'secondName', 'lastName', 'secondSurname', 'TypeIDId', 'numberId', 'age', 'cellphone', 'email', 'city', 'state'],
          where: {
            currentAdministratorName: currentAdministratorName,
          },
        },
        {
          model: Bill,
          attributes: ['billSubtotal'],
          // Agregar condición para incluir solo las atenciones con factura
          where: {
            AttentionId: {
              [Op.not]: null,
            },
          },
        },
        {
          model: SubdiagnoseList,
          attributes: ['subdiagnose'],
        },
      ],
    });

    return attentions;
  } catch (error) {
    console.error('Error en getAttentionsWithDetails', error);
    throw new Error('Error al obtener las atenciones con detalles.');
  }
};

const generateRIPSFile = async (req, res) => {
  try {
    const { startDate, endDate, currentAdministratorName } = req.body;
    const attentions = await getAttentionsWithDetails(startDate, endDate, currentAdministratorName);
  
    // Crear un archivo de texto con los datos
    const filePath = path.join(__dirname, 'rips_data.txt');
    const fileStream = fs.createWriteStream(filePath);
  
    attentions.forEach((attention) => {
      // Formato de línea en el archivo de texto
      const subdiagnoses = attention.subdiagnoseList.map((subdiagnose) => {
        return subdiagnose.subdiagnose;
      });
  
      const line = `${attention.historyPerson.name} ${attention.historyPerson.secondName} ${attention.historyPerson.lastName} ${attention.historyPerson.secondSurname} ${attention.historyPerson.TypeIDId} ${attention.historyPerson.numberId} ${attention.historyPerson.age} ${attention.historyPerson.cellphone} ${attention.historyPerson.email} ${attention.historyPerson.city} ${attention.historyPerson.state} ${attention.TypeServiceId} ${attention.assignedDate} ${attention.authorizationCode} ${attention.bill.billSubtotal} ${subdiagnoses.join(', ')}\n`;
  
      // Escribir la línea en el archivo de texto
      fileStream.write(line);
    });
  
    // Cerrar el archivo de texto
    fileStream.end();
  
    res.status(200).json({ message: 'Archivo RIPS generado correctamente.', filePath });
  } catch (error) {
    console.error('Error en generateRIPSFile', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
  
const getRIPSData = async (req, res) => {
  try {
    const { startDate, endDate, currentAdministratorName } = req.body;
    const attentions = await getAttentionsWithDetails(startDate, endDate, currentAdministratorName);
  
    // Formatear los datos en un array de objetos
    const ripsData = attentions.map((attention) => {
      return {
        historyPerson: {
          name: attention.historyPerson.name,
          secondName: attention.historyPerson.secondName,
          lastName: attention.historyPerson.lastName,
          secondSurname: attention.historyPerson.secondSurname,
          TypeIDId: attention.historyPerson.TypeIDId,
          numberId: attention.historyPerson.numberId,
          age: attention.historyPerson.age,
          cellphone: attention.historyPerson.cellphone,
          email: attention.historyPerson.email,
          city: attention.historyPerson.city,
          state: attention.historyPerson.state,
        },
        TypeServiceId: attention.TypeServiceId,
        assignedDate: attention.assignedDate,
        authorizationCode: attention.authorizationCode,
        bill: {
          billSubtotal: attention.bill.billSubtotal,
        },
        subdiagnoseList: {
          subdiagnoses: attention.subdiagnoseList.map((subdiagnose) => {
            return subdiagnose.subdiagnose;
          }),
        },
      };
    });
  
    res.status(200).json({ ripsData });
  } catch (error) {
    console.error('Error en getRIPSData', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

module.exports = { generateRIPSFile, getRIPSData };
