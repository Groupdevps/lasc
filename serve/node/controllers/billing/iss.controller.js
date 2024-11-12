const { iss } = require("../../models");
const paginate = require('../../lib/paginate'); 
const { attributesISS } = require("../includes");

const getAll = async (req, res) => {
    try {
        const pageSize = req.query.size || 1; 
        const pageLimit = req.query.limit || 10; 

        const search = req.query.search || {}; // Suponiendo que los filtros de búsqueda vienen en la query
        const order = req.query.order || []; // Suponiendo que los criterios de orden vienen en la query
        const searchOptions = ['code', 'description']
        // Usar el método paginate
        const paginatedResult = await paginate(
            iss, 
            pageSize, 
            pageLimit, 
            search,
            order,
            attributesISS,
            searchOptions, 
            
        );
        // Formatear los resultados como solicitas
        const formattedResults = paginatedResult.rows.map(iss => ({
            code: iss.code || "",
            description: iss.description || "",
            value: iss.uvr || 0
        }));

        res.status(200).json({
            ...paginatedResult,
            rows: formattedResults
        });
    } catch (error) {
        console.log('Error en getAll en issController', error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAll
}