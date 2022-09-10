const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reservationSchema = new Schema({


    voyageur: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    voyage: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'voyage'

    },

    
    isvalid: {
        type: Boolean,
        default: false
    }


},
 { timestamps: true })

module.exports = mongoose.model('reservation', reservationSchema);