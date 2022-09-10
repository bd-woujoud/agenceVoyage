const reservationModel = require('../Models/reservationModel')



module.exports = {


    createresrvation: function (req, res) {

    
        reservationModel.create(data, function (err, resrvation) {


            if (err) {


                res.json({ message: 'error add resrvation ' + err, data: null, status: 500 })
            }
            else {

                res.json({ message: 'resrvation added successfuly', data: resrvation, status: 200 })
            }

        })

    },

    getAllresrvation: function (req, res) {

        reservationModel.find({}).populate('voyage').populate('voyageur').exec((err, resrvation)=> {

            if (err) {

                res.json({ message: 'error get resrvation ' + err, data: null, status: 500 })
            }

            else {

                res.json({ message: 'all resrvation in DB ', data: resrvation, status: 200 })
            }

        })

    }
,

    getresrvationByUser: function (req, res) {

        reservationModel.find ({user:req.params.id}).populate('voyage').populate('voyageur').exec((err, resrvation)=> {

            if (err) {
                res.json({ message: 'error get resrvation by id ' + err, data: null, status: 500 })
            }
            else {
                res.json({ message: 'resrvation by id exist ', data: resrvation, status: 200 })
            }

        })

    },


    deleteresrvationById: function (req, res) {


        reservationModel.findByIdAndDelete({_id:req.params.id}, function (err, resrvation) {


            if (err) {


                res.json({ message: 'error delete  resrvation by id ' + err, data: null, status: 500 })
            }
            else {

                res.json({ message: 'resrvation deleted successufly', data: resrvation, status: 200 })
            }

        })

    },

    updateresrvationById: function (req, res) {

        reservationModel.findByIdAndUpdate({_id:req.params.id}, req.body,{new:true} ,function (err, reservation) {

            if (err) {
                res.json({ message: 'error update  resrvation by id ' + err, data: null, status: 500 })
            }

            else {
                res.json({ message: 'resrvation updated successufly', data: reservation, status: 200 })
            }

        })

    },

}