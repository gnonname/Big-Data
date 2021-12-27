const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const colname = "promu"
const model = require('../models/' + colname)

router.post('/create', async function (req, res) {
    let dons = req.body

    if (dons.codeGrade && dons.codeSoldat) {
        let cedart = new model()

        cedart.codeGrade = dons.codeGrade
        cedart.codeSoldat = dons.codeSoldat
        cedart.datePromotion = dons.datePromotion

        let cedarts = await model.find({
            codeGrade: cedart.codeGrade,
            codeSoldat: cedart.codeSoldat,
            datePromotion: cedart.datePromotion
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


router.get('/read/:coda/:codb', function (req, res) {
    let coda = req.params.coda
    let codb = req.params.codb
    model.find({
        codeGrade: coda,
        codeSoldat: codb
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

    if (dons.codeGrade && dons.codeSoldat) {
        model.update({
            codeGrade: dons.codeGrade,
            codeSoldat: dons.codeSoldat
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


router.get('/delete/:coda/:codb', function (req, res) {
    let coda = req.params.coda
    let codb = req.params.codb

    model.remove({
        codeGrade: coda,
        codeSoldat: codb
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
