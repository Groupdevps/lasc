const paginate = require("../../lib/paginate");
const { Concept, CupsList,  TariffManual, iss, sequelize } = require("../../models");
const { Op } = require('sequelize');
const { attributesConcept, includeConcept } = require("../includes");

async function validateCup (cup) {
    const cupData = await CupsList.findOne({ where: { code: cup } });
    if (!cupData) {
        throw new Error(`El CUP con código ${cup} no existe.`);
    }
    return cupData;
};
async function validateSoat (soat) {
    const soatData = await TariffManual.findOne({ where: { code: soat } });
    if (!soatData) {
        throw new Error(`El SOAT con código ${soat} no existe.`);
    }
    return soatData;
};
async function validateIss (code_iss) {
    const issData = await iss.findOne({ where: { code: code_iss } });
    if (!issData) {
        throw new Error(`El ISS con código ${iss} no existe.`);
    }
    return issData;
};


async function alreadyExist (iss, soat, cup) {
    const conceptData = await Concept.findOne({ where: { iss: iss, soat: soat, cup: cup } });
    if (conceptData) {
        return issData;
    }
    return false
};

const createConcept = async (req, res) => {
    const transaction = await sequelize.transaction(); 

    try {
        const { cup, soat, iss } = req.body;
        const { user } = req.params

        if (validateCup(cup) && validateSoat(soat) && validateIss(iss)) {
            
            const existingConcept = await Concept.findOne({
                where: { cup, soat, iss },
                transaction 
            });

            if (existingConcept) {
                res.status(200).json({
                    message: "Relación existente",
                    data: {
                        iss: existingConcept.iss,
                        soat: existingConcept.soat,
                        cup: existingConcept.cup
                    }
                });
                await transaction.rollback(); 
            } else {
                const newConcept = await Concept.create({
                    cup: cup,
                    soat: soat,
                    iss: iss,
                    UserId: user
                }, { transaction }); 

                await transaction.commit();

                res.status(200).json({
                    message: "Nueva relación de manual tarifario agregada",
                    data: {
                        iss: newConcept.iss,
                        soat: newConcept.soat,
                        cup: newConcept.cup
                    }
                });
            }
        } else {
            res.status(400).json({
                message: "Datos inválidos"
            });
            await transaction.rollback(); 
        }
    } catch (error) {
        console.log("Error en el controlador de concepto, createConcept ", error);
        await transaction.rollback();
        res.status(400).json({
            message: error.message
        });
    }
};

const getConcept = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.size, 10) || 1;
        const pageLimit = parseInt(req.query.limit, 10) || 10;
        const search = req.query.search || '';
        const order = req.query.order || [];

        const searchOptions = ['cup', 'soat', 'iss', '$CupsList.description$'];
        // Realizamos la consulta con includes para traer datos relacionados
        const paginatedResult = await paginate(
            Concept, 
            pageSize, 
            pageLimit, 
            search, 
            order,
            attributesConcept,
            searchOptions,
            includeConcept
        );

        // Formatear los resultados como solicitas
        const formattedResults = paginatedResult.rows.map(concept => ({
            code_cup: concept.CupsList?.code || null,
            description_cup: concept.CupsList?.description || null,
            code_soat: concept.TariffManual?.code || null,
            description_soat: concept.TariffManual?.description || null,
            value_soat: concept.TariffManual?.pesos || 0,
            code_iss: concept.Iss?.code || null,
            description_iss: concept.Iss?.description || null,
            value_iss: concept.Iss?.uvr || 0
        }));

        res.status(200).json({
            ...paginatedResult,
            rows: formattedResults
        });
    } catch (error) {
        console.log('Error en getAll en conceptController:', error);
        res.status(500).json({ message: error.message });
    }
};






const updateConcept = async (req, res) => {
    try {
        const { body } = req;
        const { code } = req.params;
        
        await Concept.update(body, {
            where: { code: code }
        });

        const updatedConcept = await Concept.findBy({code: code}, { include });
        res.status(200).json(updatedConcept);
    } catch (error) {
        console.log('error en updateConcept in conceptController', error);
        res.status(404).json({ error: error.message });
    }
};


const deactiveConcept = async (req, res) => {
    try {
        const { body } = req;
        const { code } = req.params;
        
        await Concept.update(body, {
            where: { code: code }
        });

        const updatedConcept = await Concept.findBy({active: false}, { where:{code: code}, includeConcept });
        res.status(200).json(updatedConcept);
    } catch (error) {
        console.log('error en updateConcept in conceptController', error);
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createConcept,
    getConcept,
    updateConcept,
    deactiveConcept
};
