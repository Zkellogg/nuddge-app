const express = require('express')

const app = express()

const hostname = '127.0.0.1';

const port = 3000;

const mustacheExpress = require('mustache-express')

app.engine('mustache', mustacheExpress())

app.set('views', './views')

app.set('view engine', 'mustache')

app.use(express.urlencoded())

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})