const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const colname = "blesse"
const model = require('../models/' + colname)

router.post('/create', async function (req, res) {
    let dons = req.body

    if (dons.codeSoldat && dons.codeBataille && dons.codeBlessure) {
        let cedart = new model()

        cedart.codeSoldat = dons.codeSoldat
        cedart.codeBataille = dons.codeBataille
        cedart.codeBlessure = dons.codeBlessure
        cedart.dateBlessure = dons.dateBlessure

        let cedarts = await model.find({
            codeSoldat: cedart.codeSoldat,
            codeBataille: cedart.codeBataille,
            codeBlessure: cedart.codeBlessure
        })

        if (cedarts.length == 0) {
            cedart.save(function (err, data) {
                let result = {}
                if (err) {
                    console.log(err)
                    result.status = 0
                    result.error = err
                }
                else {
                    result.status = 1
                    result.message = "Enregistrement effectué"
                    result.data = data
                }
                res.json(result)
            })
        } else {
            let result = {
                status: 0,
                error: "Identifiant déja existant"
            }
            res.json(result)
        }
    } else {
        let result = {
            status: 0,
            error: "Identifiant(s) obligatoire(s)"
        }
        res.json(result)
    }
})

router.get('/readall', function (req, res) {
    model.find(function (err, data) {
        let result = {}
        if (err) {
            console.log(err)
            result.status = 0
            result.error = err
        }
        else {
            result.status = 1
            result.data = data
        }
        res.json(result)
    })
})

router.get('/read/:coda/:codb/:codc', function (req, res) {
    let coda = req.params.coda
    let codb = req.params.codb
    let codc = req.params.codc
    model.find({
        codeSoldat: coda,
        codeBataille: codb,
        codeBlessure: codc,
    },
        function (err, data) {
            let result = {}
            if (err) {
                console.log(err)
                result.status = 0
                result.error = err
            }
            else {
                result.status = 1
                result.data = data
            }
            res.json(result)
        })
})


router.post('/update', function (req, res) {
    let dons = req.body

    if (dons.codeSoldat && dons.codeBataille && dons.codeBlessure) {
        model.update({
            codeSoldat: dons.codeSoldat,
            codeBataille: dons.codeBataille,
            codeBlessure: dons.codeBlessure
        }, dons, function (err, data) {
            let result = {}
            if (err) {
                console.log(err)
                result.status = 0
                result.error = err
            }
            else {
                result.status = 1
                result.message = "Mise à jour effectuée"
                result.data = data
            }
            res.json(result)
        })
    } else {
        let result = {
            status: 0,
            error: "Identifiant(s) obligatoire(s)"
        }
        res.json(result)
    }
})


router.get('/delete/:coda/:codb/:codc', function (req, res) {
    let coda = req.params.coda
    let codb = req.params.codb
    let codc = req.params.codc

    model.remove({
        codeSoldat: coda,
        codeBataille: codb,
        codeBlessure: codc,
    },
        function (err, data) {
            let result = {}
            if (err) {
                console.log(err)
                result.status = 0
                result.error = err
            }
            else {
                result.status = 1
                result.message = "Suppression effectuée"
                result.data = data
            }
            res.json(result)
        })
})



module.exports = router
