const voyageModel = require('../Models/voyageModel')
const { Voyagevalidate } = require('../validation/voyagevalidate')


module.exports = {


    createVoyage: function (req, res) {

        const { error } = Voyagevalidate(req.body)

        if (error)
            return res.status(422).json({
                success: false,
                errors: error,
                message: 'user data validation error'
            })
    
        else {

        voyageModel.create(req.body, function (err, voyage) {

              if (err) {
                res.status(500).json({
                    message: 'error adding new product',
                    success: false,
                    errors: err
                })
            } else {
                res.status(201).json({
                    message: 'product successfuly added',
                    success: true,
                    data: voyage
                })
            }

        })
    }

    },

    getAllVoyage: function (req, res) {


        voyageModel.find({}).populate('agent').populate('reservation').exec((err, voyage)=>  {


            if (err) {


                res.json({ message: 'error get voyage ' + err, data: null, status: 500 })
            }
            else {

                res.json({ message: 'all voyage in DB ', data: voyage, status: 200 })
            }

        })

    },


    deleteVoyageById: function (req, res) {

        voyageModel.findByIdAndDelete({_id:req.params.id}, function (err, voyage) {


            if (err) {


                res.json({ message: 'error delete  voyage by id ' + err, data: null, status: 500 })
            }
            else {

                res.json({ message: 'voyage deleted successufly', data: voyage, status: 200 })
            }

        })

    },

    updateVoyageById: function (req, res) {

        voyageModel.findByIdAndUpdate({_id:req.params.id},req.body, function (err, voyage) {


            if (err) {


                res.json({ message: 'error update  voyage by id ' + err, data: null, status: 500 })
            }
            else {

                res.json({ message: 'voyage updated successufly', data: voyage, status: 200 })
            }

        })

    },

    SearchVol: (req,res)=> {
 
        console.log(req.query.keyword);

        const {keyword } = req.query

        voyageModel.find( req.params.keyword !== '' ? {
            $or: [{ ville_depart: { $regex: keyword, $options: 'i' } },
            { ville_arrive: { $regex: keyword, $options: 'i' } } ,
                { date_depart: { $regex: keyword, $options: 'i' } } ,
      
          
            ]
        } : {})
        
        .then(offres => {

            res.status(200).json({
                message: 'all offres found',
                data: offres
            })
        })
        .catch( err => {

            res.status(500).json({
                message: err,
                status: 500
            })
        })
  
    }

        
    


    






























}