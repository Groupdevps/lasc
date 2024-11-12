const { DigitalSignature } = require('../models'); // Asegúrate de tener la ruta correcta al modelo




const fs = require('fs');
const path = require('path');

const createDigitalSignature = async (req, res) => {
  const { UserId, name, base64 } = req.body;

  try {
    // Decodificar la cadena base64 y guardar la imagen en el disco
    const fileName = `ds_${UserId}.png`
    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(__dirname, '../public/uploads', fileName);
    const imageUrl = `/uploads/${fileName}`;

    fs.writeFileSync(filePath, base64Data, 'base64');

    // Guardar la ruta del archivo en la base de datos
    const digitalSignature = await DigitalSignature.create({
      UserId,
      name,
      filePath,
      imageUrl
    });

    res.status(200).json({
      message: "Firma digital guardada correctamente",
      data: { imageUrl }
    });
  } catch (error) {
    console.error("Error al guardar la firma digital", error);
    res.status(500).json({ message: error.message });
  }
};

const getDigitalSignature = async (req, res) => {
  const { id } = req.params;

  try {
    const digitalSignature = await DigitalSignature.findByPk(id); // Buscar por id

    if (!digitalSignature) {
      return res.status(404).json({
        message: "Firma digital no encontrada"
      });
    }

    // Verificar si el archivo de imagen existe en el disco
    const filePath = path.join(__dirname, '../public/uploads', `ds_${digitalSignature.UserId}.png`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Imagen no encontrada"
      });
    }

     // Extraer solo la propiedad imageUrl
     const { imageUrl } = digitalSignature.toJSON();

     res.status(200).json({
       message: "Firma digital recuperada correctamente",
       data: { imageUrl }
     });
  } catch (error) {
    console.error("Error al recuperar la firma digital", error);
    res.status(500).json({ message: error.message });
  }
};

const updateDigitalSignature = async (req, res) => {
  const { id } = req.params; // ID de la firma digital a actualizar
  const { base64 } = req.body; // Nueva imagen en base64

  try {
    // Buscar la firma digital en la base de datos usando el id
    const digitalSignature = await DigitalSignature.findByPk(id);

    if (!digitalSignature) {
      return res.status(404).json({
        message: "Firma digital no encontrada"
      });
    }

    // Decodificar la cadena base64 y guardar la nueva imagen en el disco
    const fileName = `ds_${id}.png`; // Usar el mismo nombre de archivo para reemplazar
    const base64Data = base64.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(__dirname, '../public/uploads', fileName);
    const imageUrl = `/uploads/${fileName}`;

    // Reemplazar la imagen existente con la nueva
    fs.writeFileSync(filePath, base64Data, 'base64');

    // Actualizar la firma digital en la base de datos
    const updatedSignature = await digitalSignature.update({
      filePath,
      imageUrl
    });

    res.status(200).json({
      message: "Firma digital actualizada correctamente",
      data: {imageUrl}
    });
  } catch (error) {
    console.error("Error al actualizar la firma digital", error);
    res.status(500).json({ message: error.message });
  }
};
  

module.exports = { createDigitalSignature, updateDigitalSignature, getDigitalSignature };
