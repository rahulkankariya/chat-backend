
require('dotenv').config()
module.exports = {
    DBHOST:process.env.DBHOST,
    DBUSERNAME:process.env.DBUSERNAME,
    DBPASSWORD:process.env.DBPASSWORD,
    DBNAME:process.env.DBNAME,
    JWTKEY:process.env.JWTKEY,
    PASSWORDKEY:process.env.PASSWORDKEY
}