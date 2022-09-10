const mongoose = require('mongoose')
const userModel = require('./userModel')
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt=require('bcrypt')
const Schema = mongoose.Schema

const voyageurSchema = new Schema({


    commentaire:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'commentaire'

    },
    
    reservation:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'reservation'
    },

   
},

 { timestamps: true })// date de creation et de mise à jour du model //Schema



//Presave middleware - NOTE: if use arrow function, this becomes empty object, and we can't use isModified()
voyageurSchema.pre("save", function(next) {
    //If there's no change to password field (no change, no add new), call next()
    if(!this.isModified('password')){
        next()
    }
 

    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if(err)
            return next(err)
        this.password = hashedPassword;
        return next()
    })
})

//Custom method - if u wanna use 'this' as user document, don't use arrow function coz arrow function watch video 8 in my react document for more info

voyageurSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return cb(err)
        if(!isMatch)
            return cb(null, false)
        return cb(null, this)
    })
}
 

// Apply the uniqueValidator plugin to userSchema.
voyageurSchema.plugin(uniqueValidator)


module.exports = userModel.discriminator('voyageur', voyageurSchema) //discriminator=heritage de userModel