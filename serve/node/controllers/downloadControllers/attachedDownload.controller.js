const { json } = require('body-parser');
const { Attention, HistoryPerson, User, Person, ServiceProvider } = require('../../models');
const axios = require('axios');
const data = require('../../lib/formatAttached2');
const path = require('path');
const fs = require('fs');

const include = [
  'Center', 'TypeService', 'Status', 'User',
  {
    model: HistoryPerson,
    include: ['Companion', 'Person', 'TypeID', 'Gender']
  },
  {
    model: User,
    as: 'Doctor'
  },
  {
    model: Person,
    as: 'Person',
    include: [
      'Address', 'Gender', 'TypeID', {
        model: ServiceProvider,
        as: 'ServiceProvider',
      }
    ]
  }
];

const getData = async (id) => {
  try {
    const result = await Attention.findOne({
      where: {
        id: id
      },
      include: include
    });
    return result;
  } catch (error) {
    console.error('Error al buscar atención: ', error.message);
    throw error;
  }
};

const downloadAttached = async (req, res) => {
  try {
    const receivedJson = await getData(req.body.AttentionId);
    const sendJson = formatData(req.body.attached, receivedJson)
    console.log("sendJson", sendJson)
    // Realiza las operaciones necesarias con el JSON, por ejemplo, redirige o hace una solicitud POST
    const response = await axios.post(`http://localhost:4001/anexo`, {
      attached: req.body.attached,
      data : sendJson

    })
    console.log('response info = > ', response.data)
    // Configurar la respuesta HTTP para descargar el archivo
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${response.data.filename}"`);

    // Leer y enviar el archivo
    const fileStream = fs.createReadStream(response.data.path);
    fileStream.pipe(res);
    // Maneja la respuesta de la solicitud POST a localhost:4001/anexo
    //console.log(response.data);
  } catch (error) {
    console.error('Error en la solicitud: ', error.message);
    res.status(500).send('Error en la solicitud');
  }
};

const formatData =  (id, req) => {
  //metadata 
  file_name = (`${req.assignedDate}_anexo_${id}_atencion_${req.id}_paciente_${req.patient}`)
  let data = {};

  const idToFormatFunction = {
    2: formatAttached2,
    3: formatAttached3,
    9: formatAttached9
  };

  const selectedFormatFunction = idToFormatFunction[id];

  if (selectedFormatFunction) {
    data = selectedFormatFunction(file_name, req);
  } else {
    // Manejar el caso en el que el id no coincide con ninguna función
    console.error('ID no válido:', id);
  }

  
  return data;
}

const formatAttached2 = (file_name, req) => {
  //metadata
  data.metadata.file_name = file_name
  //format

  data.format.numeroAtencion = req.id
  data.format.fecha = req.assignedDate,
  data.format.hora = req.hour,
  data.format.nombrePrestador = "",
  data.format.nit = "",
  data.format.cc = "",
  data.format.codigo = "",
  data.format.direccionPrestador = "",
  data.format.indicativoTelefonoPrestador = "",
  data.format.numeroTelefonoPrestador = "",
  data.format.departamentoPrestador = "",
  data.format.municipioPrestador = "",
  data.format.pagadorPrestador = "",
  data.format.codigoPagador = "",
  data.format.primerApellidoPaciente = req.HistoryPerson.lastName,
  data.format.segundoApellidoPaciente = req.HistoryPerson.secondSurname,
  data.format.primerNombrePaciente = req.HistoryPerson.name,
  data.format.segundoNombrePaciente = req.HistoryPerson.secondName,
  data.format.RC = req.HistoryPerson.TypeID.name,
  data.format.TI = req.HistoryPerson.TypeID.name,
  data.format.CC = req.HistoryPerson.TypeID.name,
  data.format.CE = req.HistoryPerson.TypeID.name,
  data.format.PA = req.HistoryPerson.TypeID.name,
  data.format.AS = req.HistoryPerson.TypeID.name,
  data.format.MS = req.HistoryPerson.TypeID.name,
  data.format.numeroIDPaciente = req.patient,
  data.format.fechaNacimiento = req.HistoryPerson.birthDate,
  data.format.direccionPaciente = req.Person.Address.address,
  data.format.telefonoPaciente = req.HistoryPerson.phone,
  data.format.departamentoPaciente = req.Person.Address.stateString,
  data.format.municipioPaciente = req.Person.Address.cityString,
  data.format.regimenContributivo = "",
  data.format.regimenSubsidiadoTotal = "",
  data.format.regimenSubsidiadoParcial = "",
  data.format.poblacionPobreNoAseguradaConSisben = "",
  data.format.poblacionPobreNoAseguradaSinSisben = "",
  data.format.desplazado = "",
  data.format.planAdicionalDeSalud = "",
  data.format.otroCoberturaSalud = "",
  data.format.enfermedadGeneralAtencion = "",
  data.format.enfermedadProfesionalAtencion = "",
  data.format.accidenteTrabajoAtencion = "",
  data.format.accidenteTransitoAtencion = "",
  data.format.eventoCatastroficoAtencion = "",
  data.format.triageRojo = "",
  data.format.triageAmarillo = "",
  data.format.triageVerde = "",
  data.format.fechaUrgencia = "",
  data.format.horaUrgencia = "",
  data.format.pacienteRemitidoSi = "",
  data.format.pacienteRemitidoNo = "",
  data.format.prestadorSaludQueRemite = req.Center.name,
  data.format.codigoPrestadorSaludQueRemite = req.Center.id,
  data.format.departamentoPrestadorSaludQueRemite = "",
  data.format.municipioPrestadorSaludQueRemite = "",
  data.format.motivoConsultaUrgencia = "",
  data.format.diagnosticoPrincipalCIE10 = "",
  data.format.diagnosticoRelacionado1CIE10 = "",
  data.format.diagnosticoRelacionado2CIE10 = "",
  data.format.diagnosticoRelacionado3CIE10 = "",
  data.format.descripcionDiagnosticoPrincipalCIE10 = "",
  data.format.descripcionDiagnosticoRelacionado1CIE10 = "",
  data.format.descripcionDiagnosticoRelacionado2CIE10 = "",
  data.format.descripcionDiagnosticoRelacionado3CIE10 = "",
  data.format.domicilioDestinoPaciente = "",
  data.format.observacionDestinoPaciente = "",
  data.format.internacionDestinoPaciente = "",
  data.format.remisionDestinoPaciente = "",
  data.format.contrarremisionDestinoPaciente = "",
  data.format.otroDestinoPaciente = "",
  data.format.personaQuienInforma = "",
  data.format.cargoActividadQuienInforma = "",
  data.format.indicativoTelefonoQuienInforma = "",
  data.format.numeroTelefonoQuienInforma = "",
  data.format.extensionTelefonoQuienInforma = "",
  data.format.celularQuienInforma = ""    
  return data 
}
const formatAttached3 = (file_name, req) => {
  //metadata
  data.metadata.file_name = file_name
  //format

  data.format.numeroAtencion = req.id
  data.format.fecha = req.assignedDate,
  data.format.hora = req.hour,
  data.format.nombrePrestador = "",
  data.format.nit = "",
  data.format.cc = "",
  data.format.codigo = "",
  data.format.direccionPrestador = "",
  data.format.indicativoTelefonoPrestador = "",
  data.format.numeroTelefonoPrestador = "",
  data.format.departamentoPrestador = "",
  data.format.municipioPrestador = "",
  data.format.pagadorPrestador = "",
  data.format.codigoPagador = "",
  data.format.primerApellidoPaciente = req.HistoryPerson.lastName,
  data.format.segundoApellidoPaciente = req.HistoryPerson.secondSurname,
  data.format.primerNombrePaciente = req.HistoryPerson.name,
  data.format.segundoNombrePaciente = req.HistoryPerson.secondName,
  data.format.RC = req.HistoryPerson.TypeID.name,
  data.format.TI = req.HistoryPerson.TypeID.name,
  data.format.CC = req.HistoryPerson.TypeID.name,
  data.format.CE = req.HistoryPerson.TypeID.name,
  data.format.PA = req.HistoryPerson.TypeID.name,
  data.format.AS = req.HistoryPerson.TypeID.name,
  data.format.MS = req.HistoryPerson.TypeID.name,
  data.format.numeroIDPaciente = req.patient,
  data.format.fechaNacimiento = req.HistoryPerson.birthDate,
  data.format.direccionPaciente = req.Person.Address.address,
  data.format.telefonoPaciente = req.HistoryPerson.phone,
  data.format.departamentoPaciente = req.Person.Address.stateString,
  data.format.municipioPaciente = req.Person.Address.cityString,
  data.format.regimenContributivo = "",
  data.format.regimenSubsidiadoTotal = "",
  data.format.regimenSubsidiadoParcial = "",
  data.format.poblacionPobreNoAseguradaConSisben = "",
  data.format.poblacionPobreNoAseguradaSinSisben = "",
  data.format.desplazado = "",
  data.format.planAdicionalDeSalud = "",
  data.format.otroCoberturaSalud = "",
  data.format.enfermedadGeneralAtencion = "",
  data.format.enfermedadProfesionalAtencion = "",
  data.format.accidenteTrabajoAtencion = "",
  data.format.accidenteTransitoAtencion = "",
  data.format.eventoCatastroficoAtencion = "",
  data.format.triageRojo = "",
  data.format.triageAmarillo = "",
  data.format.triageVerde = "",
  data.format.fechaUrgencia = "",
  data.format.horaUrgencia = "",
  data.format.pacienteRemitidoSi = "",
  data.format.pacienteRemitidoNo = "",
  data.format.prestadorSaludQueRemite = req.Center.name,
  data.format.codigoPrestadorSaludQueRemite = req.Center.id,
  data.format.departamentoPrestadorSaludQueRemite = "",
  data.format.municipioPrestadorSaludQueRemite = "",
  data.format.motivoConsultaUrgencia = "",
  data.format.diagnosticoPrincipalCIE10 = "",
  data.format.diagnosticoRelacionado1CIE10 = "",
  data.format.diagnosticoRelacionado2CIE10 = "",
  data.format.diagnosticoRelacionado3CIE10 = "",
  data.format.descripcionDiagnosticoPrincipalCIE10 = "",
  data.format.descripcionDiagnosticoRelacionado1CIE10 = "",
  data.format.descripcionDiagnosticoRelacionado2CIE10 = "",
  data.format.descripcionDiagnosticoRelacionado3CIE10 = "",
  data.format.domicilioDestinoPaciente = "",
  data.format.observacionDestinoPaciente = "",
  data.format.internacionDestinoPaciente = "",
  data.format.remisionDestinoPaciente = "",
  data.format.contrarremisionDestinoPaciente = "",
  data.format.otroDestinoPaciente = "",
  data.format.personaQuienInforma = "",
  data.format.cargoActividadQuienInforma = "",
  data.format.indicativoTelefonoQuienInforma = "",
  data.format.numeroTelefonoQuienInforma = "",
  data.format.extensionTelefonoQuienInforma = "",
  data.format.celularQuienInforma = ""    
  return data 
}
const formatAttached9 = (file_name, req) => {
  //metadata
  data.metadata.file_name = file_name
  //format

  data.format.numeroAtencion = req.id
  data.format.fecha = req.assignedDate,
  data.format.hora = req.hour,
  data.format.nombrePrestador = "",
  data.format.nit = "",
  data.format.cc = "",
  data.format.codigo = "",
  data.format.direccionPrestador = "",
  data.format.indicativoTelefonoPrestador = "",
  data.format.numeroTelefonoPrestador = "",
  data.format.departamentoPrestador = "",
  data.format.municipioPrestador = "",
  data.format.pagadorPrestador = "",
  data.format.codigoPagador = "",
  data.format.primerApellidoPaciente = req.HistoryPerson.lastName,
  data.format.segundoApellidoPaciente = req.HistoryPerson.secondSurname,
  data.format.primerNombrePaciente = req.HistoryPerson.name,
  data.format.segundoNombrePaciente = req.HistoryPerson.secondName,
  data.format.RC = req.HistoryPerson.TypeID.name,
  data.format.TI = req.HistoryPerson.TypeID.name,
  data.format.CC = req.HistoryPerson.TypeID.name,
  data.format.CE = req.HistoryPerson.TypeID.name,
  data.format.PA = req.HistoryPerson.TypeID.name,
  data.format.AS = req.HistoryPerson.TypeID.name,
  data.format.MS = req.HistoryPerson.TypeID.name,
  data.format.numeroIDPaciente = req.patient,
  data.format.fechaNacimiento = req.HistoryPerson.birthDate,
  data.format.direccionPaciente = req.Person.Address.address,
  data.format.telefonoPaciente = req.HistoryPerson.phone,
  data.format.departamentoPaciente = req.Person.Address.stateString,
  data.format.municipioPaciente = req.Person.Address.cityString,
  data.format.regimenContributivo = "",
  data.format.regimenSubsidiadoTotal = "",
  data.format.regimenSubsidiadoParcial = "",
  data.format.poblacionPobreNoAseguradaConSisben = "",
  data.format.poblacionPobreNoAseguradaSinSisben = "",
  data.format.desplazado = "",
  data.format.planAdicionalDeSalud = "",
  data.format.otroCoberturaSalud = "",
  data.format.enfermedadGeneralAtencion = "",
  data.format.enfermedadProfesionalAtencion = "",
  data.format.accidenteTrabajoAtencion = "",
  data.format.accidenteTransitoAtencion = "",
  data.format.eventoCatastroficoAtencion = "",
  data.format.triageRojo = "",
  data.format.triageAmarillo = "",
  data.format.triageVerde = "",
  data.format.fechaUrgencia = "",
  data.format.horaUrgencia = "",
  data.format.pacienteRemitidoSi = "",
  data.format.pacienteRemitidoNo = "",
  data.format.prestadorSaludQueRemite = req.Center.name,
  data.format.codigoPrestadorSaludQueRemite = req.Center.id,
  data.format.departamentoPrestadorSaludQueRemite = "",
  data.format.municipioPrestadorSaludQueRemite = "",
  data.format.motivoConsultaUrgencia = "",
  data.format.diagnosticoPrincipalCIE10 = "",
  data.format.diagnosticoRelacionado1CIE10 = "",
  data.format.diagnosticoRelacionado2CIE10 = "",
  data.format.diagnosticoRelacionado3CIE10 = "",
  data.format.descripcionDiagnosticoPrincipalCIE10 = "",
  data.format.descripcionDiagnosticoRelacionado1CIE10 = "",
  data.format.descripcionDiagnosticoRelacionado2CIE10 = "",
  data.format.descripcionDiagnosticoRelacionado3CIE10 = "",
  data.format.domicilioDestinoPaciente = "",
  data.format.observacionDestinoPaciente = "",
  data.format.internacionDestinoPaciente = "",
  data.format.remisionDestinoPaciente = "",
  data.format.contrarremisionDestinoPaciente = "",
  data.format.otroDestinoPaciente = "",
  data.format.personaQuienInforma = "",
  data.format.cargoActividadQuienInforma = "",
  data.format.indicativoTelefonoQuienInforma = "",
  data.format.numeroTelefonoQuienInforma = "",
  data.format.extensionTelefonoQuienInforma = "",
  data.format.celularQuienInforma = ""    
  return data 
}

module.exports = {
  downloadAttached
};
