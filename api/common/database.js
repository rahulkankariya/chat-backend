const connection = require('./sqlconnection')
const stringConstant = require('../common/stringconstant')
exports.executeQuery = (sp,data,res,callback)=>{
    try {
        connection.query(sp,data,(err,result)=>{
         
            if(!err){
                callback(null,result)
            }else{
                res.status(503).json({status:503,message:stringConstant.SOMETHINGWENTWRONG,data:err})
            }
        }) 
    } catch (error) {
        console.log("er==?",error)
        res.status(200).json({status:503,message:stringConstant.SOMETHINGWENTWRONG,data:error})
    }
  
}