const nodemailer = require('nodemailer');
const mysqlCommand = require('./mysql_conn');
const moment = require('moment-timezone');
const date = moment.tz('America/Sao_Paulo');
const dateFormat = date.format('HH:mm:ss DD/MM/YYYY')
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", //server SMTP
  port: 587,
  secure: false,
  auth: {
    user: "contato@catarseie.com.br",
    pass: "Nanny@18", // PASSWORD OF GOOGLE XANDDYBR- ojbe skqv holy scrb
  },
});


module.exports =  transporter  ;

