const express = require('express')
const {engine} = require('express-handlebars')
const mysqlCommand = require('./mysql_conn')
const sendm = require('./nodeMailer')



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

  /*  app.post('/submit', (req, res) => { 
       const { firstName, lastName, phone, email, yourState, age, howWeMet, positionLife, agreeNotify } = req.body
       const sqlinsert = "INSERT INTO person VALUES (null,'"+ firstName +"', '"+ lastName +"', '"+ phone +"', '"+ email +"', null, 3, 1, "+ agreeNotify +", DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y')); SET @idPerson = LAST_INSERT_ID(); INSERT INTO poll VALUES (@idPerson, 'Nanny History', '"+ yourState +"' ,  '"+ age +"', '"+ howWeMet +"', '"+ positionLife + "', DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y'))";
       mysqlCommand.query(sqlinsert, (err, result) => {
            if(err) {
                res.send('Erro ao inserir dados... ' + err)
                } else{
                   res.status(200).json({message:"this is find in db", email})
                   res.end() 
                }
                
        })
    })*/

    app.post('/submit2', (req, res) => { 
        const { firstName, lastName, phone, email, yourState, age, howWeMet, positionLife, agreeNotify } = req.body
        const sqlSelect = "SELECT DISTINCT email,namePoll FROM fly_pigeon.person, fly_pigeon.poll where namePoll = 'Nanny History' and  email = '"+ email +"'";
        mysqlCommand.query(sqlSelect, (err, result) => {
            if(err) {   
                res.status(400).json({Message:"Error to try find up data in database "} + err)
                res.end()
                } 

                if (result.length > 0) {
                    res.status(201).json({message:"Already just in database..." + result[0].email})
                    res.end()
                    return;

                } else {

                    const sqlinsert = "INSERT INTO person VALUES (null,'"+ firstName +"', '"+ lastName +"', '"+ phone +"', '"+ email +"', null, 3, 1, "+ agreeNotify +", DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y')); SET @idPerson = LAST_INSERT_ID(); INSERT INTO poll VALUES (@idPerson, 'Nanny History', '"+ yourState +"' ,  '"+ age +"', '"+ howWeMet +"', '"+ positionLife + "', DATE_FORMAT(NOW(), '%H:%i:%s %d/%m/%Y'))";
                    mysqlCommand.query(sqlinsert, (err, result) => {
                        if(err) {
                            res.status(400).json({Message:"Error to try insert data in database "} + err)
                            } else {
                              res.status(200).json({message:"Dados inseridos com sucesso... " + result})
                              //sendm(email, firstName)
                              res.end()  
                            }
                     })    
                }
        })
    })

    app.delete('/delete/:id', (req, res) => {
        const  id = req.params.id
        const sql = "DELETE FROM person WHERE idPerson in (" + id + ")"
        mysqlCommand.query(sql, (err, result) => {
            if(err) {
                console.log(err)
                res.send('Erro ao deletar dados... ' + err)
                }
                res.status(200).send("Dados deletados com sucesso... " + id)
                res.end()
        })
    })

    // mysqlCommand.query("DELETE FROM person WHERE idPerson = " + req.params.id), (err, result) => {})

    module.exports = app 
