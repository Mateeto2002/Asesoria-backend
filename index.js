const express = require('express');

const { getConnection } = require('./db/db-connect-mongo');
require('dotenv').config();
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());



const port = 3002;

getConnection();
//app.use('/proyecto', require('./router/proyecto'));
//app.use('/etapa', require('./router/etapa'));
app.use('/cliente', require('./router/cliente'));
//app.use('/universidad', require('./router/universidad'));
//app.use('/tipo', require('./router/tipoProyecto'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })