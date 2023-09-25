'use strict'

const express = require('express');

//logs de las solicitides que reciba el servidor
const morgan = require('morgan');

//seguridad basica del servidor

const helmet = require('helmet');

//aceptaciones de solicitudes desde otro origen o desde la misma maquina
const cors = require('cors');

// instancia de epress
const app = express();
const port = process.env.PORT || 3200;


//Rutas
const userRoutes = require('../src/user/user.routes');
const tiendaRoutes = require('../src/tienda/tienda.routes');
const reporteRoutes = require('../src/reporte/reporte.routes')

//configuracion servidor express
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

//rutas del servidor
app.use('/user', userRoutes);
app.use('/td', tiendaRoutes);
app.use('/reporte', reporteRoutes);

// funcion para levantar el puerto
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}
