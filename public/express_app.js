const express = require('express')
const {engine} = require('express-handlebars')
const mysqlCommand = require('./mysql_conn')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('assets'))

app.engine('handlebars', engine())
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use('/css', express.static('./css'))
app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', (req, res) => {

res.render('form')

})

    app.get('/person', (req, res) => {

    mysqlCommand.query(`SELECT * FROM person, poll where person.idPerson = poll.idPerson`, (err, result) => {
        if (err) {
            throw err
        }
        res.json(result)
        })
    })

    app.post('/submit', (req, res) => {

       mysqlCommand.query("INSERT INTO person VALUES (null, "+ req.body.name +", 'Souza', '21986609260', 'xanddybr@gmail.com', md5('alex@2024'),3, 1, DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y'); SET @id_person = LAST_INSERT_ID(); INSERT INTO poll VALUES (@id_person, 'first poll','15 a 30','financeira','instagram', 1,'DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y)"), (err, result) => {

            if (err) {
                throw err
            }
            res.json(result)
            res.end()
        } 
        

        })
    
        
        





module.exports = app 
