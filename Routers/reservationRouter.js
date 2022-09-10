const express=require('express')
const reservationController = require('../controllers/reservationController')
const route=express.Router()

route.post('/createreservation',reservationController.createresrvation)
route.get('/allreservation',reservationController.getAllresrvation)
route.delete('/deletereservation/:id',reservationController.deleteresrvationById)
route.put('/updatereservation/:id',reservationController.updateresrvationById)
route.get('/getbyuser/:id',reservationController.getresrvationByUser)


module.exports=route;
