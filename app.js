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

const signUpRouter = require('./routes/signup')

app.get('/', (req, res) => {
    res.render("newLogin")
})
signUpRouter.get('/signup', (req, res) => {
    res.render('signup')
})

app.use('/signup', signUpRouter)

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})