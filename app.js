const express = require('express');
const { render } = require('mustache');

const app = express()

const session = require('express-session')

const PORT = process.env.PORT || 8080

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

const addNuddgeRouter = require('./routes/add-nuddge')

const completeNuddgeRouter = require('./routes/complete-nuddge')

app.get('/', (req, res) => {
    res.render("login")
})

app.use('/signup', signUpRouter)
app.use('/dashboard', dashboardRouter)
app.use('/login', loginRouter)
app.use('/add-nuddge', addNuddgeRouter)
app.use('/complete-nuddge', completeNuddgeRouter)





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
                        req.session.points = user.total_points
                        res.redirect('/dashboard')
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





app.listen(PORT, () => {
    console.log(`Server running at http://${PORT}/`);
})