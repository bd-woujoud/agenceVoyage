const mongoose=require('mongoose')
const userModel = require('./userModel')
const Schema = mongoose.Schema

const adminSchema =new Schema({


},

{timestamps:true})// date de creation et de mise à jour du model //Schema

module.exports= userModel.discriminator('admin',adminSchema) //discriminator=heritage de userModel