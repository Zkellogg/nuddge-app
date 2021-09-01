const express = require('express')

const router = express()

const models = require('../models')
const user = require('../models/user')

// router.get('/', (req, res) => {
//     res.render('dashboard')
// })

router.get('/', (req, res) => {
    models.Nuddge.findAll({})
    .then(nuddges => {
        console.log(nuddges)
        res.render('dashboard', {nuddges: nuddges})
    })
})

module.exports = router