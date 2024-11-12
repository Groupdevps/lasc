const { Inability, HistoryPerson,Center, Person, SubDiagnoseList, Attention, User, UserRole, Role,Address} = require('../../models');
const PdfPrinter = require('pdfmake');
const { generatePDF , sendPDFResponse} = require('../downloadControllers/pdfDownload.controller');
// Fuentes para pdfmake
const fonts = {
    Roboto: {
        normal: 'node_modules/pdfmake/build/vfs_fonts.js',
        bold: 'node_modules/pdfmake/build/vfs_fonts.js',
        italics: 'node_modules/pdfmake/build/vfs_fonts.js',
        bolditalics: 'node_modules/pdfmake/build/vfs_fonts.js'
    }
};

const printer = new PdfPrinter(fonts);

const includeOptions = [
    { model: Center },
    { model: Person },
    { model: SubDiagnoseList },
    { model: Attention, include: HistoryPerson },
    { model: User, as: 'Doctor' , include:[ { model: UserRole, include: Role }] }
];

const inabilityController = {
    getAll: async (req, res) => {
        try {
            const inabilities = await Inability.findAll({ include: includeOptions });
            res.status(200).json(inabilities);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const inability = await Inability.findByPk(req.params.id, { include: includeOptions });
            if (inability) {
                res.status(200).json(inability);
            } else {
                res.status(404).json({ message: 'Inability not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const newInability = await Inability.create(req.body);
            res.status(201).json(newInability);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const [updated] = await Inability.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedInability = await Inability.findByPk(req.params.id, { include: includeOptions });
                res.status(200).json(updatedInability);
            } else {
                res.status(404).json({ message: 'Inability not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const deleted = await Inability.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Inability not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    paginate: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        try {
            const { count, rows } = await Inability.findAndCountAll({
                include: includeOptions,
                limit: pageSize,
                offset: (page - 1) * pageSize
            });
            
            res.status(200).json({
                totalItems: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage: page,
                data: rows
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
};



module.exports = inabilityController
