const mongoose=require('mongoose')
const Schema=mongoose.Schema

const voyageSchema =new Schema({

    ville_depart:{
        type:String,
        required:true//champs obligatoire
    },


    ville_arrive:{
        type:String,
        required:true
    },
 
    
    date_depart:{
        type:String,
        required:true
    },

    date_arrive:{

        type:String,
        required:true
        
    },
    prix:{

        type:Number,
        required:true
        
    },


    agent:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'agent'
    },
    
    reservation:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:'reservation'
    
        }],

},

{timestamps:true})

module.exports=mongoose.model('voyage', voyageSchema);