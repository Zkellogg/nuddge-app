const express = require('express')

const router = express()

const models = require('../models')
const user = require('../models/user')

// router.get('/', (req, res) => {
//     res.render('dashboard')
// })

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