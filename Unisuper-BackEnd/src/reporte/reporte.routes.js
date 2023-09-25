'use strict'

const api = require('express').Router()
const { test, getSupTienda, getTecTienda, getAsignSupInfra, updateSup } = require('./reporte.controller')

api.get('/test', test)
api.get('/getSup', getSupTienda)
api.get('/getTec', getTecTienda)


api.get('/getAsignSup', getAsignSupInfra)
api.put('/updateSup', updateSup)
module.exports = api;