const nodemailer = require('nodemailer');
const mysqlCommand = require('./mysql_conn');
const moment = require('moment-timezone');
const date = moment.tz('America/Sao_Paulo');
const dateFormat = date.format('HH:mm:ss DD/MM/YYYY')

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", //server SMTP
  port: 587,
  secure: false,
  auth: {
    user: "contato@catarseie.com.br",
    pass: "Nanny@18", // PASSWORD OF GOOGLE XANDDYBR- ojbe skqv holy scrb
  },
});

function sendm(mailDestiny, name) {
    const treatedName = name.charAt(0).toUpperCase() + name.slice(1)
    const mailOptions = {
          from: 'Catarse I.E" <contato@catarseie.com.br>', // sender address
          to: mailDestiny, // list of receivers
          subject: "Treinamento Catarse I.E, Sua apostila brinde acaba de chegar!", // Subject line
          text: "", // plain text body
          html: "<h1>Ola! " + treatedName + " </h1><br><br><h3>Você acaba de receber em anexo o seu brinde, leia a com calma e atenção para conseguir aproveitar o máximo possivel deste maravilhoso conteudo, e começe hoje mesmo a dar os primeiros passos na sua tranformação pessoal!</h3> <br><br> <h4>Você também ficará antenado sobre a programação do Treinamento Catarse I.E, não deixe de participar do nosso webnário em breve! </h4> <br><br><br><br> <div>Caso não queira mais receber nossos e-mails, click no link a seguir : <a href=catarseie.com.br/unsubscribe/"+ mailDestiny +" target='_blank'><u><b>desinscrever-se</b></u><a/></div>", // html body
          attachments:  [{ filename: "catarseie_brinde.pdf", path: "./assets/catarseie_brinde.pdf" }]
    }

   transporter.sendMail(mailOptions,(err,info)=> {
        const resp = info.response
        const partresp = resp.split(" ");
        const accp = info.accepted
        const rjct = info.rejected
        const msid = info.messageId
    if(err){
        const sqlinsert = "insert into sendedMails values (null, null,'"+ msid +"' ,'"+ accp +"' , '"+ rjct +"', "+ partresp[0] +", 'poll', 'automatic','"+ dateFormat +"')";
        mysqlCommand.query(sqlinsert, (err, result) => {
          if (err) {
            console.log("Fail in insert record...",err);
            return
          } else {
            console.log("Record inserted with sucess...");
          }
    })
      return
      } else {
        const sqlinsert = "insert into sendedMails values (null, null,'"+ msid +"' ,'"+ accp +"' , '"+ rjct +"', "+ partresp[0] +", 'poll', 'automatic','"+ dateFormat +"')";
        mysqlCommand.query(sqlinsert, (err, result) => {
          if (err) {
            console.log("Fail in insert record...",err);
            return
          } else {
            console.log("Log send mail number...");
          }
    })
  }
 })
 console.log("Email sent with success...")

}

module.exports = sendm;
