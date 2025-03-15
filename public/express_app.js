const express = require('express')
const {engine} = require('express-handlebars')
const sendm = require('./nodeMailer')
const moment = require('moment-timezone')
const mysqlCommand = require('./mysql_conn')


const app = express()
const date = moment.tz('America/Sao_Paulo');
const dateFormat = date.format('HH:mm:ss DD/MM/YYYY')

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

    app.post('/submit', (req, res) => { 
        const { firstName, lastName, phone, email, yourCity, age, howWeMet, positionLife, agreeNotify } = req.body
        const sqlSelect = "select email from fly_pigeon.person where email = '"+ email +"'";
        mysqlCommand.query(sqlSelect, (err, result) => {
            if(err) {   
                res.status(400).send("Error na busca pelos dados " + err)
                res.end()
                return
                } 
                if (result.length >= 1) {
                    res.status(201).send("Você já esta inscrito em nossa lista, aguarde logo receberá nossas novidades!")
                    res.end()
                    return;
                } else {
                    const sqlinsert = "INSERT INTO person VALUES (null,'"+ firstName +"', '"+ lastName +"', '"+ phone +"', '"+ email +"', null, 3, 0, "+ agreeNotify +", null, '"+ dateFormat +"'); SET @idPerson = LAST_INSERT_ID(); INSERT INTO poll VALUES (@idPerson, 'nanny history', '"+ yourCity +"' ,  '"+ age +"', '"+ howWeMet +"', '"+ positionLife + "', '"+ dateFormat +"')";
                    mysqlCommand.query(sqlinsert, (err, result) => {
                        if(err) {
                            res.status(400).send("Erro na inserção dos dados " + err)
                            res.end()
                            return
                            } else {
                              res.status(200).send("Dados inseridos com sucesso")
                              sendm(email, firstName)
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
                res.status(401).send('Record of number, ' + req.params.id + ' deleted with success!')
                res.end()
                return;
                } else {
                    if(result.affectedRows == 0) {
                    res.status(400).send("Not exist more data for delete with id.. " + req.params.id)
                    res.end()
                    return;
                }
                    }
              
                res.status(200).send("Record with id " + req.params.id + " deleted with success!")
        })
    })

    app.get('/unsubscribe/:email', (req, res) => {
        const sqldelete = "Delete from person where email = '"+ req.params.email +"'"
        mysqlCommand.query(sqldelete, (err, result) => {
            if(err) {
                console.log(err)
                res.status(401).send('Erro ao tentar cancelar inscrição... ' + err)
                res.end()
                return;
                }
                if(!result.affectedRows){
                    res.status(401).send("<h4>Sua inscrição já foi excluida de nossa lista com sucesso...</h4>") 
                    res.end()
                    return;
                } else {
                    res.status(200).send("<h4>Sua inscrição foi cancelada com sucesso...</h4>")
                    res.end()
                    return
                }
        })
    })

    app.get('/get', (req, res) => {
        const sql = "SELECT * FROM person"
        mysqlCommand.query(sql, (err, result) => {
            if(err) {
                console.log(err)
                res.send('Erro of query select on database mysql... ' + err)
                res.end()
                }

                const data = result[0]

                if(result.length == 0) {
                    res.status(400).send("No such record found on database... ")
                    res.end()
                    return;
                } else {
                    res.send(data.idPerson)
                    res.end()
                }
                
        })
    })

    // mysqlCommand.query("DELETE FROM person WHERE idPerson = " + req.params.id), (err, result) => {})
    
    module.exports = app 
