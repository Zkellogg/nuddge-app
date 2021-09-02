const express = require('express')

const router = express()

const models = require('../models')

router.get('/', (req, res) => {
    res.render('login')
})


app.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    models.User.findOne({ where: { username: username } })

    .then((user) => {
            bcrypt.compare(password, user.password, function(err, result) {
                if (result) {
                    if (req.session) {
                        req.session.userId = user.id
                        res.render('dashboard')
                    }
                } else {
                    res.render('login', { errorMessage: 'INVALID DETAILS' })
                }
            })
        })
        .catch((error) => {
            res.render('login', { errorMessage: "User not found" })
        })
})


module.exports = router