
const userModel = require('../Models/userModel');
const voyageurModel = require('../Models/voyageurModel')


  module.exports = {


    getAllvoyageur: function (req, res) {

        userModel.find({ role : "voyageur" } , function (err, voyageur) {

            if (err) {

                res.json({ message: 'error get voyageur ' + err, data: null, status: 500 })
            }
            else {

                res.json({ message: 'all voyageur in DB ', data: voyageur, status: 200 })
            }

        })

    },

    deletevoyageurById: function (req, res) {


        userModel.findByIdAndDelete({_id:req.params.id}, function (err, voyageur) {


            if (err) {


                res.json({ message: 'error delete  voyageur by id ' + err, data: null, status: 500 })
            }
            else {

                res.json({ message: 'voyageur deleted successufly', data: voyageur, status: 200 })
            }

        })

    },

    updatevoyageurById: function (req, res) {


        voyageurModel.findByIdAndUpdate({_id:req.params.id},req.body, function (err, voyageur) {


            if (err) {


                res.json({ message: 'error update  voyageur by id ' + err, data: null, status: 500 })
            }
            else {

                res.json({ message: 'voyageur updated successufly', data: voyageur, status: 200 })
            }

        })

    },




}