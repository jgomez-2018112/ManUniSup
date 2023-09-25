'use strict'

const express = require('express');
const api = express.Router();
const tiendaController = require('./tienda.controller');

//INFRA
api.get('/', tiendaController.test)
api.post('/addTB_T_Tienda', tiendaController.insertTiendaINFRA);
api.get('/getTipoTienda', tiendaController.getTipoTienda);

api.post('/addTB_PT_Tienda_Persona', tiendaController.insertSup);

api.post('/addTB_PSE_Supervisor_Tecnico_Tienda', tiendaController.addTecnicoTiendaNFRA);
api.get('/getClaseTec', tiendaController.getClaseINFRA);

api.post('/addTB_PSC_Supervisor_Compas_Tienda', tiendaController.addTB_PSC_Supervisor_Compas_Tienda);
api.get('/getTipoClase', tiendaController.getTipoClase);
api.get('/getPersonaCompra', tiendaController.getPersonaCompras);

//SAC
api.post('/addTiendaSAC', tiendaController.addTiendaSAC);







module.exports = api;