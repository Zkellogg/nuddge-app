const express = require('express')

const router = express()

const models = require('../models')

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})
