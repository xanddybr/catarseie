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

        /* sqlinsert = "INSERT INTO person VALUES (null, 'Paulo', 'Mendes', '2124986870', 'luiza@gmail.com', md5('alex@2024'), 3, 1, DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y')); SET @idPerson = LAST_INSERT_ID(); INSERT INTO poll VALUES (@idPerson, 'first poll', '15 a 30', 'financeira', 'instagram', 1, DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y'));" */

    app.get('/', (req, res) => {
        res.render('form')
    })

    app.post('/submit', (req, res) => { 
       const { firstName, lastName, phone, email, yourState, age, howWeMet, positionLife } = req.body
       /*const sqlinsert = "INSERT INTO person VALUES (null,'"+ req.body.fristName +"', '"+ req.body.lastName +"', '"+ req.body.phone +"', '"+ req.body.email +"', null, 3, 1, DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y')); SET @idPerson = LAST_INSERT_ID(); INSERT INTO poll VALUES (@idPerson, 'Nanny History', '"+ req.body.state +"' ,  '"+ req.body.age +"', '"+ req.body.howWeMet +"', '"+ req.body.positionLife + "', DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y'))";
       const query = 'INSERT INTO users (firstName, lastName, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
       db.query(sqlinsert, [firstName, lastName, phone, email, yourState, age, howWeMet, positionLife], (err, res) => {
         if (err) {
           console.error('Error inserting data into the database:', err);
           return res.status(500).json({ message: 'Error inserting data into the database' });
         }
         res.status(200).json({ message: 'Form submitted successfully!' });
       }); */
      res.status(200).json("Seus dados chegaram aqui com sucesso! viu..");
      res.end()
    })

    app.delete('/delete/:id', (req, res) => {
        const  id = req.params.id
        mysqlCommand.query("DELETE FROM person WHERE idPerson in (" + id + ")", (err, result) => {
            if(err) {
                console.log(err)
                res.send('Erro ao deletar dados... ' + err)
                }
                res.status(200).send("Dados deletados com sucesso... " + result.body)
                res.end()
        })
    })

    // mysqlCommand.query("DELETE FROM person WHERE idPerson = " + req.params.id), (err, result) => {})

    module.exports = app 
