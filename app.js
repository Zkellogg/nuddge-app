const express = require('express');
const { render } = require('mustache');

const app = express()

const hostname = '127.0.0.1';

const port = 3000;

const mustacheExpress = require('mustache-express')

app.use(express.static(__dirname + '/public'));

app.engine('mustache', mustacheExpress())

app.set('views', './views')

app.set('view engine', 'mustache')

app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.render("newLogin")
})
app.use('/sign-up', signupRouter)
    // app.post('/sign-up', (req, res) => {
    //     const email = req.body.email
    //     const username = req.body.username
    //     const password = req.body.password
    //     const user = models.Post.build({
    //         email: email,
    //         username: username,
    //         password: password
    //     })
    //     user.save()
    //         .then(newUser => {
    //             res.redirect('/')
    //         })

// })

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})