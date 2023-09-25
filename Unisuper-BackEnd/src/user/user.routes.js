'use strict '

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');

const {errHandler} = require('../../services/authenticated');

api.get('/',[errHandler] ,userController.test);
api.post('/insertUserINFRA', userController.insertUserInfra);
api.get('/getPersonaINFRA', userController.getPersonasINFRA);
api.get('/getRolInfra', userController.getRol);

api.get('/getPersonasSAC', userController.getPersonasSAC);
api.post('/insertUserSAC', userController.insertUserSAC);
api.get('/getRolSAC', userController.getRolSAC);



module.exports = api;