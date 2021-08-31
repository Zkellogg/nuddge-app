const express = require('express')

const router = express()

const models = require('../models')

router.get('/', (req, res) => {
    res.render('dashboard')
})

module.exports = router