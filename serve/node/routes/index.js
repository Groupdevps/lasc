const  express = require('express');
const router = express.Router();



router.get('/', async (req,res) => {
    res.send('Backend Up');
});


module.exports = function (app){
    app.use('/', router);
};