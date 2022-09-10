const express=require('express')
const voyageurController = require('../controllers/voyageurController')
const route=express.Router()


route.get('/allvoyageur',voyageurController.getAllvoyageur)
route.delete('/deletevoyageur/:id',voyageurController.deletevoyageurById)
route.put('/updatevoyageur/:id',voyageurController.updatevoyageurById)

module.exports=route;
