const mysql = require("mysql2")

const mysqlCommand = mysql.createConnection ({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "Alex@1797",
    database: "fly_pigeon",
    multipleStatements: true
})

mysqlCommand.connect((err)=>{
    if(err) {
        console.log("Error on connect mysql..." + err)
        return;
    } else {
        console.log("Mysql connected..")
    }
    
})

module.exports = mysqlCommand