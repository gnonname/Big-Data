const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const colname = "affecte"
const model = require('../models/' + colname)

router.post('/create', async function (req, res) {
    let dons = req.body

    if (dons.codeUnite && dons.codeSoldat) {
        let cedart = new model()
        
        cedart.codeUnite = dons.codeUnite
        cedart.codeSoldat = dons.codeSoldat
        cedart.dateAffectation = dons.dateAffectation

        let cedarts = await model.find({
            codeUnite: cedart.codeUnite,
            codeSoldat: cedart.codeSoldat
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
        codeUnite: coda,
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

    if (dons.codeUnite && dons.codeSoldat) {
        model.update({
            codeUnite: dons.codeUnite,
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
        codeUnite: coda,
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
