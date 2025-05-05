const mysql = require('mysql2')
const config = require('../common/config')
console
const connection = mysql.createConnection({
    host:config.DBHOST,
    user:config.DBUSERNAME,
    password:config.DBPASSWORD,
    database:config.DBNAME
})
connection.connect((err,res)=>{
    if(!err){
        console.log("Databse is connected")
    }else{
        console.log("Not Connected",err)
    }
})
module.exports = connection;