const express = require('express')
const {engine} = require('express-handlebars')
const app = express()

// Set up Handlebars as the view engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.static('assets'))

app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/css', express.static('./css'))

// Route to render the home page
app.get('/', (req, res) => {
    res.render('form')
})

console.log('App handlebars is running...')

module.exports = app