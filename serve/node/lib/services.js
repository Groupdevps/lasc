let categories = [
    {
        name: "Servicios",
        active: true,


    },
    {
        name: "Consulta 1er nivel",
        active: true,
        TypeServiceId: 5
    },
    {
        name: "Programas",
        active: true,
        TypeServiceId: 5

    }
]

categories.forEach(it => {
    it.name = it.name.toUpperCase();
    it.createdAt = new Date();
    it.updatedAt = new Date();
})

let services = [
        
    {
        
        name             : "Urgencia",             
        state             : true,
        ServiceCategoryId : 1
    },
    {
        
        name             : "Hospitalizacion",             
        state             : true,
        description      : "",
        ServiceCategoryId : 1
    },
    {
       
        name             : "Uci",             
        state             : true,
        description      : "",
        ServiceCategoryId : 1
    },
    {
        
        name             : "Cirugia",             
        state             : true,
        description      : "",
        ServiceCategoryId : 1
    },
    {
        
        name         : "consulta externa 1er Nivel",
        state     : true, 
        ServiceCategoryId : 1
    },
    {
        
        name         : "Medicina general",             
        state         : false,
        ServiceCategoryId : 2

    },
    {
        
        name         : "Laboratorios",             
        state         : false,
        
        ServiceCategoryId : 2

    },
    {
        
        name         : "Odontologia",             
        state         : false,
        ServiceCategoryId : 2
    
    },
    {
       
        name         : "Programas",
        state     : true, 
        ServiceCategoryId : 2
        
    },
    {
        
        name         : "Adulto Joven",             
        state         : false,
        ServiceCategoryId : 3
    },
    {
        
        name         : "Crecimiento y desarrollo",             
        state         : false,
        ServiceCategoryId : 3

    },
    {
        
        name         : "Planificacion familiar",             
        state         : false,
        ServiceCategoryId : 3
    },
    {
        
        name         : "Control prenatal",             
        state         : false,
        ServiceCategoryId : 3
    },
    {
        
        name         : "Adulto Mayor",             
        state         : false,
        ServiceCategoryId : 3
    },
    {
        
        name         : "Agudeza vizual",             
        state         : false,
        ServiceCategoryId : 3
    },
    {
        
        name         : "Higiene oral",             
        state         : false,
        ServiceCategoryId : 3
    },
]
services.forEach(it => {
    it.name = it.name.toUpperCase();
    it.createdAt = new Date();
    it.updatedAt = new Date();
})


module.exports = {services , categories}