const { TypeService , ServiceCategory}  = require('../models');
const category = require('./categoryService.controller.js')
const helpers   =  require ("../lib/helpers");
include = [ServiceCategory]
const getItems = (req,res) => {
    TypeService.findAll({
        include
    }).then((result) => {  
        res.status(200).json(result);        
    }).catch((error) => {           
        res.status(404).json({
            message : error.message
        });
    });
} // getItems
const getAllItems = (id)=>{
    return new Promise((resolve, reject)=>{

        TypeService.findAll({
            where: {ServiceCategoryId: id},
            include: [ ServiceCategory ]
        }).then((result) => {  
            resolve(result);        
        }).catch(er => resolve(null))
    })
}
//Read TypeService
const getFormatItems = (req, res) => {
    let array = [];
    category.getCategories().then(categories => {

        // console.log("categories=============================== ", categories)
        if (categories && categories.length > 0) {
            categories.forEach((it, index, len)=>{
                getAllItems(it.id).then(list => {

                    if (list && list.length > 0) {
                        array.push(list);
                    }
                    if (index == (len.length - 1)) {
                        res.json(array)
                    }
                })

            })

        }else{
            res.status(404).json({message : "empty categories"})

        }
    
    }).catch(err => {
        res.status(404).json(err.message)

    });
    /*const typeService = await TypeService.findAll({
        include: [ServiceCategory]
       
    });*/
}

//Create TypeService
const create = async (req, res) => {
    // console.log(req)
    TypeService.create(req.body).then((result) => {  
        res.status(200).json({ 
            TypeService : result,
        });
        console.log('created TypeService');
    }).catch((err) => {
        console.log('error', err.message )
        res.status(404).json(err.message)
    })
}
//Search by numberId
const getItem = async(req, res) => {
    const typeService = await TypeService.findOne({where: {id: req.body.id}});
    res.json(typeService)
}
const get = async (req, res) => {
    const typeService = await TypeService.findAndCountAll({
        limit : 30,
        order : "DESC",
    });

    if (typeService.error) {
        res.status(404).json(typeService.error);
    }else{
        res.json({
            page    : 1,
            count   : typeService.count,
            rows    : typeService.rows,
        })
    }
}

const update = async (req, res) => {
    const typeService = await TypeService.update({where: {id: req.query.id}});
     if (typeService.error) {
        res.status(404).json(typeService.error);
    }else{
        res.json(typeService);
    }
}

const destroy = async (req, res) => {
    const typeService = await TypeService.destroy({where: {id: req.query.id}});
     if (typeService.error) {
        res.status(404).json(typeService.error);
    }else{
        res.json(typeService);
    }
}

module.exports = {
    get,
    getItem,
    getItems,
    create,
    update,
    destroy,
    getFormatItems,

}