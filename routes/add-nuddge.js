const express = require('express')

const router = express()

const models = require('../models')
const user = require('../models/user')
const { Op } = require('sequelize')

router.get('/', (req, res) => {
    if(req.session){
        
    models.Nuddge.findAll({
        
    })
    .then(nuddges => {
        console.log(nuddges)
       res.render('dashboard', {nuddges: nuddges})  
    })
    // models.User.findAll({
    //     where: {
    //         user_id: req.session.userId
    //     }
    // }).then(user => {
        
    // })
}
})

// router.get('/', (req, res) => {
//         models.User.findAll({
//         where: {
//             user_id: req.session.userId
//         }
//     }).then(user => {
//         res. render('dashboard', {user: user})
//     })
// })

router.post('/', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const points = parseInt(req.body.points)
    const boostDate = req.body.boostDate
    const category = req.body.category
    const userId = req.session.userId

    const nuddge = models.Nuddge.build({
        title: title,
        body: body,
        points: points,
        boostDate: boostDate,
        category: category,
        user_id: userId
    })
    nuddge.save().then(() => {
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
        res.render('dashboardTest', {nuddges: nuddges})
    })
})


router.post('/update-status/:nuddgeId', (req,res) => {
    const nuddgeId = req.params.nuddgeId
    const points = req.body.points
    const userId = req.session.userId
    const totalPoints = req.body.totalPoints
    models.Nuddge.update(
        {status: true},
        {where: {id: nuddgeId}}
    ).then(updatedNuddge => {
        models.User.update(
            {total_points: totalPoints + points},
            {where: {id: userId}}
        )
       res.redirect('/add-nuddge')
   })
    
})
    



module.exports = router