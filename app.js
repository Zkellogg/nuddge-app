const express = require('express');
const { render } = require('mustache');

const app = express()

const session = require('express-session')

const hostname = '127.0.0.1';

const port = 3000;

const mustacheExpress = require('mustache-express');

global.bcrypt = require('bcryptjs')

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

const loginRouter = express('./routes/login')

const signUpRouter = require('./routes/signup')

const dashboardRouter = require('./routes/dashboard')

app.get('/', (req, res) => {
    res.render("login")
})

app.use('/signup', signUpRouter)
app.use('/dashboard', dashboardRouter)
app.use('/login', loginRouter)





app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    models.User.findOne({ where: { username: username } })
        // models.User.findOne({ where: { password: password } })

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
            res.render('dashboard', { errorMessage: "User not found" })
        })
})


app.get('/add-nuddge', (req, res) => {
    models.Nuddge.findAll({})
        .then(nuddges => {
            console.log(nuddges)
            res.render('add-nuddge', { nuddges: nuddges })
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