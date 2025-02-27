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
        throw err = new Error("Error in connecting to mysql")
    }
    console.log("Mysql connected..")
})

module.exports = mysqlCommand