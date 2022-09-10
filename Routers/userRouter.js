
const express=require('express')
const userController = require('../controllers/userController')
const route=express.Router()
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passportConfig');
const LocalStrategy = require('passport-local').Strategy;
const upload = require('../middleware/upload');



route.post('/registre',userController.registre)
route.post('/login', passport.authenticate('local', {session: false}),userController.login)
route.get('/logout',userController.logout)
route.get('/getbyrole',userController.getAllbyrole)
route.delete('/deleteuser/:id',userController.deleteuserById)
route.put('/update/:id',userController.updateuserById)

route.put('/avatar/:id',upload.single("avatar"),userController.uploadavatar);
route.get("/authenticated", passport.authenticate('jwt', {session: false}) ,userController.authenticated)


module.exports=route;
