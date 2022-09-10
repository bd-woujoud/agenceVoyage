const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');
const userSchema =new Schema({


    nom:{

        type:String,
    
    },

    prenom:{

        type:String,

    },

    email:{

        type:String,
        unique:true
    },

    password:{

        type:String,
    },

    Num_passport:{

        type:String,
    },

    tel:{

        type:String,
    },

    role:{
        
        type:String,
        enum:["admin","voyageur","agent"],
        default:"voyageur"
    },

    avatar: {

        type: String,

      },
          
    reservation:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:'reservation'
    
        }],
},

{timestamps:true})

//Presave middleware - NOTE: if use arrow function, this becomes empty object, and we can't use isModified()
userSchema.pre("save", function(next) {
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

userSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err)
            return cb(err)
        if(!isMatch)
            return cb(null, false)
        return cb(null, this)
    })
}
 

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator)

module.exports=mongoose.model('user', userSchema);