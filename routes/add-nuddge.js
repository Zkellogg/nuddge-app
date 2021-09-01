const express = require('express')

const router = express()

const models = require('../models')
const user = require('../models/user')
const { Op } = require('sequelize')

router.get('/', (req, res) => {
    models.Nuddge.findAll({})
    .then(nuddges => {
        console.log(nuddges)
        res.render('add-nuddge', {nuddges: nuddges})
    })
})

router.post('/', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const points = parseInt(req.body.points)
    const boostDate = req.body.boostDate
    const category = req.body.category
    // const userId = req.body.userId

    const nuddge = models.Nuddge.build({
        title: title,
        body: body,
        points: points,
        boostDate: boostDate,
        category: category,
        // user_id: userId
    })
    nuddge.save().then((savedNuddge) => {
        res.redirect('/dashboard')
    })
})

router.get('/:category', (req, res) => {
    const category = req.params.category
    models.Nuddge.findAll({ 
        where: {
            category: {
                [Op.iLike]: category
            }
        }
    }).then(nuddges => {
        res.render('add-nuddge', {nuddges: nuddges})
    })
})


// router.post('/updateStatus', (req,res) => {
//     const nuddgeId = req.body.nuddgeId
//     const status = req.body.status
//     const userId = req.body.userId

// } )


module.exports = router