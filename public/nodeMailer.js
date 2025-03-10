const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", //server SMTP
  port: 587,
  secure: false,
  auth: {
    user: "contato@catarseie.com.br",
    pass: "Nanny@18", // PASSWORD OF GOOGLE XANDDYBR- ojbe skqv holy scrb
  },
});

async function sendm(mailDestiny, name) {
    // send mail with defined transport object
  const info = await transporter.sendMail({
      from: 'Catarse I.E" <contato@catarseie.com.br>', // sender address
      to: mailDestiny, // list of receivers
      subject: "Treinamento Catarse I.E, Sua apostila brinde acaba de chegar!", // Subject line
      text: "", // plain text body
      html: "<h1>Ola! " + name + " </h1><br><br><h3>Você acaba de receber em anexo o seu brinde, leia a com calma e atenção para conseguir aproveitar o máximo possivel deste maravilhoso conteudo, e começe hoje mesmo a dar os primeiros passos na sua tranformação pessoal!</h3> <br><br> <h4>Você também ficará antenado sobre a programação do Treinamento Catarse I.E e a abertua das turmas para a realização do nosso curso! </h4> <br><br><br><br> <div>Caso não queira mais receber nossos e-mails, click no link a seguir : <a href='http://localhost:3000/unsubscribe' target='_blank'><u><b>desinscrever-se</b></u><a/></div>", // html body
      attachments:  [{ filename: "catarseie_gift.pdf", path: "./assets/catarseie_gift.pdf" }],
    })

    console.log('Email sent successfully!');
    info.accepted,info.rejected,info.messageId,info.response

  }

module.exports = sendm;
