const express = require('express')

const router = express()
const { Op } = require('sequelize')
const models = require('../models')
const user = require('../models/user')

// router.get('/', (req, res) => {
//     res.render('dashboard')
// })

router.get('/:category', (req, res) => {
    
    if(req.session) {
        const category = req.params.category
        models.Nuddge.findAll({ 
        where: {user_id: req.session.userId, status: false,  category: category}, 
        include: [
            {
                model: models.User, 
                as: 'user'
            }
        ]
         
  
    }).then(nuddges => {

        res.render('dashboard', {nuddges: nuddges, points: req.session.points})
    })

}
})


router.get('/', (req, res) => {
    if(req.session) {
    models.Nuddge.findAll({
        where: {user_id: req.session.userId, status: false},
        include: [
            {
                model: models.User, 
                as: 'user'
            }
        ]
    })
    .then(nuddges => {
        // console.log(nuddges[0].user)
        res.render('dashboard', {nuddges: nuddges, points: req.session.points})
    })
    
} 
    
})

module.exports = router