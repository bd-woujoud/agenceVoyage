const express=require('express')
const voyageController = require('../controllers/voyageController')
const route=express.Router()

route.post('/createvoyage',voyageController.createVoyage)
route.get('/allvoyage',voyageController.getAllVoyage)

route.delete('/deletevoyage/:id',voyageController.deleteVoyageById)
route.put('/updatevoyage/:id',voyageController.updateVoyageById)
route.get('/search',voyageController.SearchVol)

module.exports=route;
