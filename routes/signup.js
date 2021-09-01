const express = require('express')

const router = express()

const models = require('../models')

router.get('/', (req, res) => {
    res.render('signup')
})

router.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    bcrypt.genSalt(10, function(err, salt) {
        if (!err) {
            bcrypt.hash(password, salt, function(err, hash) {
                const user = models.User.build({
                    username: username,
                    password: hash,
                    email: email
                })
                user.save()
                    .then(newUser => {
                        console.log('user added successfully')
                        res.redirect('/')
                    })
            })
        }
    })
})








module.exports = router