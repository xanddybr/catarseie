const express = require('express')
const {engine} = require('express-handlebars')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.static('assets'))
app.use(express.json())
app.engine('handlebars', engine())
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/css', express.static('./css'))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('form')
})



module.exports = app 
