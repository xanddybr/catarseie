const express = require('express')
const {engine} = require('express-handlebars')
const transporter = require('./nodeMailer')
const mysqlCommand = require('./mysql_conn')
const moment = require('moment-timezone')

const app = express()
const bodyParser = require('body-parser')
const date = moment.tz('America/Sao_Paulo');
const dateFormat = date.format('HH:mm:ss DD/MM/YYYY')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
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

        /*const sqlSelect = "select email from fly_pigeon.person where email = '"+ email +"'";
        mysqlCommand.query(sqlSelect, (err, result) => {
            if(err) {   
                res.status(401).send(err)
                return
                } 
                if (result.length > 0) {
                    res.status(201).send(err)
                    return;
                } else {
            
                        const treatedName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
                        const mailOptions = {
                              from: 'Catarse I.E" <contato@catarseie.com.br>', // sender address
                              to: email, // list of receivers
                              subject: "Treinamento Catarse I.E, Sua apostila brinde acaba de chegar!", // Subject line
                              text: "", // plain text body
                              html: "<h1>Ola! " + treatedName + " </h1><br><br><h3>Você acaba de receber em anexo o seu brinde, leia a com calma e atenção para conseguir aproveitar o máximo possivel deste maravilhoso conteudo, e começe hoje mesmo a dar os primeiros passos na sua tranformação pessoal!</h3> <br><br> <h4>Você também ficará antenado sobre a programação do Treinamento Catarse I.E, não deixe de participar do nosso webnário em breve! </h4> <br><br><br><br> <div>Caso não queira mais receber nossos e-mails, click no link a seguir : <a href=catarseie.com.br/unsubscribe/"+ email +" target='_blank'><u><b>desinscrever-se</b></u><a/></div>"
                        }
                    
                        transporter.sendMail(mailOptions,(err,info)=> {
                           
                        if(err){
                                console.log("Fail to try sent this email...",err);
                                return
                          } else {
                    
                              const resp = info.response
                              const partresp = resp.split(" ");
                              const accp = info.accepted
                              const rjct = info.rejected
                              const msid = info.messageId

                            if(partresp === 250) {

                                const sqlinsert = "insert into sendedMails values (null, null,'"+ msid +"' ,'"+ accp +"' , '"+ rjct +"', "+ partresp[0] +", 'poll', 'automatic','"+ dateFormat +"')";
                                mysqlCommand.query(sqlinsert, (err, result) => {
                        
                                  if (err) {
                                    console.log("Fail service data base mysql...",err);
                                    return
                                  }
                                  else if (result.affectedRows > 0) {
                                    console.log("Record insert with successfully");
    
                                    const sqlinsert = "INSERT INTO person VALUES (null,'"+ firstName +"', '"+ lastName +"', '"+ phone +"', '"+ email +"', null, 3, 0, "+ agreeNotify +", null, '"+ dateFormat +"'); SET @idPerson = LAST_INSERT_ID(); INSERT INTO poll VALUES (@idPerson, 'nanny history', '"+ yourCity +"' ,  '"+ age +"', '"+ howWeMet +"', '"+ positionLife + "', '"+ dateFormat +"')";
                                    mysqlCommand.query(sqlinsert, (err, result) => {
                                                if(err) {
                                                    res.status(400).send(err)
                                                    res.end()
                                                    return
                                                    } else {
                                                    res.status(200).send(result)
                                                    res.end()
                                                   }
                                    })
    
                                                    } else {
                                                        console.log("Fail in insert record...");
                                                    }
                                    })


                            } 
                            
                            else {
                                console.log("Fail to try sent this email...",err);
                                return
                            }
 
                        }
                    })
                }
            }) */
    })

    app.get('/delete/:id', (req, res) => {
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
        const sqldelete = "Delete from person where email = '" +req.params.email+ "' and person.idType = 3;"
        mysqlCommand.query(sqldelete, (err, result) => {
            if(err) {
                res.status(404).send('Erro ao tentar cancelar inscrição... ' + err)
                res.end()
                return;
                }
                if(!result.affectedRows){
                    res.status(201).send("<h4>Sua inscrição já foi excluida de nossa lista com sucesso...</h4>") 
                    res.end()
                    return;
                } 
                if(result.affectedRows) {
                    res.status(200).send("<h4>Sua inscrição foi excluida com sucesso...</h4>")
                    res.end()
                    return
                }
        })
    })

    app.get('/get', (req, res) => {
        const sql = "SELECT * FROM person, poll WHERE person.idPerson = poll.idPerson"
        mysqlCommand.query(sql, (err, result) => {
            if(err) {
                console.log(err)
                res.send('Erro of query select on database mysql... ' + err)
                return;
                }
                    res.status(200).json(result)
                    res.end()
        })
    })

    function sum(v1, v2) {
        return v1 + v2
    }

    // mysqlCommand.query("DELETE FROM person WHERE idPerson = " + req.params.id), (err, result) => {})
    
module.exports = app, sum;