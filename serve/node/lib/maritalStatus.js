let marital = [
    {"name": "casado/a"},
    {"name": "soltero/a"},
    {"name": "viudo/a"},
    {"name": "union libre"},
    
]

marital.forEach(it => {
    it.name = it.name.toUpperCase();
    it.createdAt = new Date();
    it.updatedAt = new Date();
})
module.exports = marital