const mysql = require("mysql2");
const config = require('./config')
// Create a connection pool
const connection  = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER ,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,

});


connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});
module.exports = connection;
