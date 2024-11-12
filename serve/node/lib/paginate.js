const { Op } = require('sequelize');

// Método de paginación adaptado
const paginate = async (model, pageSize, pageLimit, search = '', order = [],  searchOptions = [], include = []) => {
    try {

        console.log('searchOptions', searchOptions)
        const limit = parseInt(pageLimit, 10) || 10;
        const page = parseInt(pageSize, 10) || 1;
        let options = {
            offset: getOffset(page, limit),
            limit: limit,
            //attributes: attributes.length ? attributes : undefined,
            include: include.length ? include : undefined
        };

        // Comprobar si el search está presente y no está vacío
        if (search && typeof search === 'string' && search.trim() !== '') {
            const searchConditions = {
                [Op.or]: searchOptions.map(field => ({
                    [field]: { [Op.iLike]: `%${search}%` }
                }))
            };
            options.where = searchConditions;
        }

        // Si existe un orden, agregarlo
        if (order && order.length) {
            options.order = order;
        }

        console.log('Query Options:', options); // Depuración para verificar la query

        const { count, rows } = await model.findAndCountAll(options);

        return {
            page: page,
            total: count,
            limit: limit,
            rows: rows,
            nextPage: getNextPage(page, limit, count),
            previousPage: getPreviousPage(page)
        };
    } catch (error) {
        console.error('Error en la paginación:', error);
        throw new Error('Error en la paginación');
    }
};





const getOffset = (page, limit) => {
    return (page - 1) * limit;
}

const getNextPage = (page, limit, total) => {
    return (total / limit) > page ? page + 1 : null;
}

const getPreviousPage = (page) => {
    return page > 1 ? page - 1 : null;
}

module.exports = paginate;
