
const joi = require('@hapi/joi')
const UserValidation = data => {
    const schema = joi.object({

        nom: joi
            .string()
            .min(3)
            .max(6)
            .required()
        ,
        prenom: joi
            .string()
            .min(3)
            .max(6)
            .required()
        ,
        email: joi
            .string()
            .required()
            .email()
        ,
        password: joi
            .string()
            .min(6)
            .alphanum()
            .required()
        ,
        tel: joi
            .string()
            .length(8)
            .pattern(/^[0-9]+$/)
            .required()
        ,
   
        Num_passport: joi
            .number()
            .required()
        ,

        role: joi
            .string()
            .valid('admin', 'agent', 'voyageur')
            .default('voyageur'),

        avatar: joi
            .string()
           
    })

    return schema.validate(data, { abortEarly: false })
}

const ValidateLoginData = data => {
    const schema = joi.object({
        email: joi
            .string()
            .email()
            .required()
        ,
        password: joi
            .string()
            .min(6)
            .alphanum()
            .required()
    })

    return schema.validate(data, { abortEarly: false })

}


const Voyagevalidate = data => {

    const schema = joi.object({

        ville_depart : joi.string()
               .required()
,
        ville_arrive : joi.string()
               .required()
        
        ,
        date_depart : joi.number()
               .required()
        
        ,
        date_arrive : joi.number()
               .required(),

        prix : joi.number()
               .required(),

  
    })

    return schema.validate(data, { abortEarly: false })

}

module.exports = {

    UserValidation,
    ValidateLoginData,
    Voyagevalidate
    
  
}