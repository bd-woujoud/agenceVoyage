
const express = require('express');

const app =express();
const port = 4000 ;
const db = require('./database')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors');
var cookieParser = require('cookie-parser')
require('dotenv').config() //pour acceder au fichier env 

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(cookieParser())
app.use(bodyParser.json())
// to read body from request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
   

app.get('/',(req,res)=>{
    res.send('bonjour dorra')
})


const voyageRouter=require('./Routers/voyageRouter')
app.use('/voyage',voyageRouter)

const reservationRouter=require('./Routers/reservationRouter')
app.use('/reservation',reservationRouter)

const voyageurRouter=require('./Routers/voyageurRouter')
app.use('/voyageur',voyageurRouter)


const userRouter=require('./Routers/userRouter')
app.use('/users',userRouter)

app.get("/file/:avatar", function (req, res) {
    res.sendFile(__dirname + "/upload/" + req.params.avatar);
});





// handle errors
app.use(function (err, req, res, next) {
    
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: " Path Not found" });
    else
        res.status(500).json({ message: "Something looks wrong " +err});
});


app.listen(port,console.log(` server running at http://localhost: ${port}`))