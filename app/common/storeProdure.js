const storeProcudures  = {
    signup:"call signup(?,?,?,?);",
    login:"call login(?); ",
    getProfile:"call getProfile(?);",
    uuidUpdate:"call uuidUpdate(?);",
    validateToken:"call validateToken(?,?);"
}
module.exports = storeProcudures