const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const colname = "bataille"
const model = require('../models/' + colname)

router.post('/create', async function (req, res) {
    let dons = req.body

    if (dons.codeBataille) {
        let cedart = new model()

        cedart.codeBataille = dons.codeBataille
        cedart.lieu = dons.lieu
        cedart.dateDebut = dons.dateDebut
        cedart.dateFin = dons.dateFin

        let cedarts = await model.find({ codeBataille: cedart.codeBataille })

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
    model.find({ codeBataille: code },
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

    if (dons.codeBataille) {
        model.update({ codeBataille: dons.codeBataille }, dons, function (err, data) {
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

    model.remove({ codeBataille: code },
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
