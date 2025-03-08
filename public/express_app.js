const express = require('express')
const {engine} = require('express-handlebars')
const mysqlCommand = require('./mysql_conn')
const e = require('express')
const { exit } = require('process')

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
       const { firstName, lastName, phone, email, yourState, age, howWeMet, positionLife, agreeNotify } = req.body
       const sqlinsert = "INSERT INTO person VALUES (null,'"+ firstName +"', '"+ lastName +"', '"+ phone +"', '"+ email +"', null, 3, 1, "+ agreeNotify +", DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y')); SET @idPerson = LAST_INSERT_ID(); INSERT INTO poll VALUES (@idPerson, 'Nanny History', '"+ yourState +"' ,  '"+ age +"', '"+ howWeMet +"', '"+ positionLife + "', DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y'))";
       mysqlCommand.query(sqlinsert, (err, result) => {
            if(err) {
                console.log(err)
                res.send('Erro ao inserir dados... ' + err)
                }
                console.log(result)
                res.status(200).send("Data inserted successfully... ")
                res.end()
        })
    })

    app.post('/submit2', (req, res) => { 
        const { firstName, lastName, phone, email, yourState, age, howWeMet, positionLife, agreeNotify } = req.body
        const sqlSelect = "SELECT DISTINCT email,namePoll FROM fly_pigeon.person INNER JOIN fly_pigeon.poll ON namePoll = 'Nanny History'"
        mysqlCommand.query(sqlSelect, (err, result) => {
             if(err) {
                 console.log(err)
                 res.send('Erro ao inserir dados... ' + err)
                 return;
                 }
                 
                 for(let i = 0; i < result.length; i++){
                    console.log(result[i].email)

                    if(!result[i].email){
                        console.log("Email não encontrado ", email)
                        return;
                    }

                    if(result[i].email == email){
                        console.log("Email já cadastrado ", result[i].email)
                        return;
                    }
                 }
         })

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
