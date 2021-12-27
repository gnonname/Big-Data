const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const colname = "blessure"
const model = require('../models/' + colname)

router.post('/create', async function (req, res) {
    let dons = req.body

    if (dons.codeBlessure) {
        let cedart = new model()

        cedart.codeBlessure = dons.codeBlessure
        cedart.typeBlessure = dons.typeBlessure

        let cedarts = await model.find({ codeBlessure: cedart.codeBlessure })

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

router.get('/read/:code', function (req, res) {
    let code = req.params.code
    model.find({ codeBlessure: code },
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

    if (dons.codeBlessure) {
        model.update({ codeBlessure: dons.codeBlessure }, dons, function (err, data) {
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


router.get('/delete/:code', function (req, res) {
    let code = req.params.code

    model.remove({ codeBlessure: code },
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
