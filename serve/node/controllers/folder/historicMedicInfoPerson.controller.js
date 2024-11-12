const { HistoryInfoMedicPerson }  	= require('../../models')
const paginate      = require('../../lib/paginate.js');

const hmedic		= {
	
	updateMedic : (req,res) => {
		return new Promise((resolve, reject) => {
			HistoryInfoMedicPerson.update(
				req.body,
				{
					where: {
						id : req.body.HistoryInfoMedicPersonId
					}
				}
			).then(result => {
				resolve(result)
			}).catch(error => {
				reject(error)
			})			
		})
	}
}// hperson

module.exports =  hmedic
