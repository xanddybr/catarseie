const express = require('express')
const {engine} = require('express-handlebars')
const { title } = require('process')
const { asap } = require('rxjs')

const app = express()

app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/css', express.static('./css'))
app.use(express.static('public'))
app.use(express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('form',{cidades: ['Rio de janeiroo', 'São Paulo', 'Belo Horizonte']})
})

//Retrieve data from API with citys name

module.exports = app 
