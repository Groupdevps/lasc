const express                 = require('express');
const index                   = require('./routes/index')
const cors                    = require('cors');
const consign                 = require('consign');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const { sequelize } = require('./models/index.js');
const app                     = express();
const prefix = require('./lib/prefix');
// middleware

app.use(express.json());
app.use(cors());
consign({
  cwd : __dirname
})
  .then('models/index.js')
  .then('routes')
  .into(app);

// Aplica el middleware auth globalmente
//app.use(auth);


// Middleware de manejo de errores (debe ser el último)
app.use(errorHandler);
//settings
app.set('port', process.env.PORT || 4000);

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is listening on port ', app.get('port'));
  
});

