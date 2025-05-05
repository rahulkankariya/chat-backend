var connection = require('./sqlConnection');

exports.executeQuery = function (sp, data, res, callback) {
    // console.log("rows==>",data)
    // connection.query(sp, data, (err, result) =>{
    //     if (!err) {
    //         console.log("rows==>",data)
    //         callback(rows);
    //     }
    //     else {
    //         console.log("erron in database: ",err);
    //         res.status(503).json({ status: 503, message: err });
    //     }
    // });
    connection.query(sp,data,(err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}



