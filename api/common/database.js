const connection = require('./sqlconnection')
const stringConstant = require('../common/stringconstant')
exports.executeQuery = (sp,data,res,callback)=>{
    try {
        connection.query(sp,data,(err,result)=>{
         
            if(!err){
                callback(null,result)
            }else{
                console.log("SpName==?>",sp,data)
                res.status(503).json({status:503,message:stringConstant.SOMETHINGWENTWRONG,data:err})
            }
        }) 
    } catch (error) {
        console.log("er==?",error)
        res.status(200).json({status:503,message:stringConstant.SOMETHINGWENTWRONG,data:error})
    }
  
}
exports.newExecuteQuery = async (sp, data) => {
    try {
      const [result] = await connection.promise().query(sp, data);
    //   console.log("Reuslt==?",result,sp,data)
      return result;
    } catch (error) {
        console.log("Errr==?",error)
      console.error(`Error executing query [${sp}] with data [${data}]:`, error);
      throw error; // Re-throw error to be handled by the caller
    }
  };