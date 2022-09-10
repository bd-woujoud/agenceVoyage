
const joi = require('@hapi/joi')
const Voyagevalidate = data => {

    const schema = joi.object({

        ville_depart : joi.string()
               .required()
,
        ville_arrive : joi.string()
               .required()
        
        ,
        date_depart : joi.date()
               .required()
        
        ,
        date_arrive : joi.date()
               .required(),

        prix : joi.number()
               .required(),

  
    })

    return schema.validate(data, { abortEarly: false })

}


module.exports = {

    Voyagevalidate,
    
}