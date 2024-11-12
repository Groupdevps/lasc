let list = [
	{"name":"PROCEDIMIENTO","description":null},
    {"name":"LABORATORIO","description":null},
    {"name":"MEDICAMENTOS","description":null}
]


let categories = [];
console.log("check list "), list
list.forEach((it)=>{
	if (it && it.name) {
		it.createdAt = new Date();
		it.updatedAt = new Date();
		categories.push(it)
	}

})
module.exports = categories;