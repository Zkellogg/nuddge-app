const express = require('express')

const router = express()

const models = require('../models')

router.get('/', (req, res) => {
    res.render('dashboard')
})

router.post('/:nuddgeId', (req,res) => {
    const nuddgeId = req.params.nuddgeId

   models.Nuddge.findByPk(nuddgeId).then((nuddge) => {
       models.User.update({
           total_points: req.session.points + nuddge.points
       },{
           where: {
               id: req.session.userId
           }
       })
       models.Nuddge.update({
           status: true
       },{
           where: {
               id: nuddge.id
           }
       })
    console.log(nuddge.points);
    req.session.points = req.session.points + nuddge.points
    console.log(req.session.points);
    res.redirect('/dashboard')
   })
    
   
})
        // .then(() =>
        // console.log(nuddgePoints),
        // res.redirect('../dashboard')
        // )




module.exports = router

