const mongoose=require('mongoose')
const userModel = require('./userModel')
const Schema = mongoose.Schema

const agentSchema =new Schema({


voyage:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'voyage'

}]

},

{timestamps:true})// date de creation et de mise à jour du model //Schema

module.exports= userModel.discriminator('agent',agentSchema) //discriminator=heritage de userModel