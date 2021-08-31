const express = require('express');
const { render } = require('mustache');

const app = express()
var session = require('express-session')

const hostname = '127.0.0.1';

const port = 3000;

const mustacheExpress = require('mustache-express');
const { REPL_MODE_SLOPPY } = require('repl');

var bcrypt = require('bycrptjs')

global.models = require('./models')

app.use(session({
    secret: 'ljjojh',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(__dirname + '/public'));

app.engine('mustache', mustacheExpress())

app.set('views', './views')

app.set('view engine', 'mustache')

app.use(express.urlencoded())

const signUpRouter = require('./routes/signup')



app.get('/', (req, res) => {
    res.render("newLogin")
})
// signUpRouter.get('/signup', (req, res) => {
//     res.render('signup')
// })

app.use('/signup', signUpRouter)

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = models.User.build({
        username: username,
        password: password
                
    })

    bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
            if(req.session) {
                req.session.userId = user.user_id
                req.session.username = user.username
            }
        }
    })
})

app.get('/add-nuddge', (req, res) => {
    models.Nuddge.findAll({})
    .then(nuddges => {
        console.log(nuddges)
        res.render('add-nuddge', {nuddges: nuddges})
    })
})

app.post('/add-nuddge', (req, res) => {
    const title = req.body.title
    const body = req.body.body
    const points = parseInt(req.body.points)
    const boostDate = req.body.boostDate
    const category = req.body.category

    const nuddge = models.Nuddge.build({
        title: title,
        body: body,
        points: points,
        boostDate: boostDate,
        category: category
    })
    nuddge.save().then((savedNuddge) => {
        res.redirect('/add-nuddge')
    })
})


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})