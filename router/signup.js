const express = require('express')

const router = express()

const models = require('../models')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/sign-up', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    bcrypt.genSalt(10, function(error, salt) {
        if (!error) {
            bcrypt.hash(password, salt, function(error, hash) {
                if (!error) {

                    const user = models.User.build({
                        username: username,
                        password: hash,
                        email: email
                    })

                    user.save()
                        .then(savedUser => {
                            console.log("User added")
                            res.redirect('/')
                        })

                } else {
                    res.send('Error')
                }
            })
        } else {
            res.send("Error")
        }
    })
})

module.exports = router