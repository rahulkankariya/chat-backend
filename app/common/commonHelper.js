const appConstant = require('../common/appConstant');
const jwt = require('jsonwebtoken')
const  CryptoJS = require("crypto-js");
const storeProcudures = require('../common/storeProdure')
const database = require('../common/database')
module.exports = {
    encryptPassword :(password)=>{
        const ciphertext = CryptoJS.AES.encrypt(password, appConstant.PASSWORDKEY).toString();
        return ciphertext
    },
    decryptPassword :(password)=>{
        var bytes  = CryptoJS.AES.decrypt(password, appConstant.PASSWORDKEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    },
    generateJwTToken(data){
        let token = jwt.sign(data,appConstant.JWTKEY,{
            expiresIn:"1days"
        })
        return token
    },
    validateToken:(req,res)=>{
        return new Promise((resolve,reject) => {
            try {
               console.log("Token==>",     req.decoded.uniqueId,
                req.decoded.id)
                
                database.executeQuery(
                    storeProcudures.validateToken,[
                        req.decoded.uniqueId,
                        req.decoded.id
                    ],
                    res, function(err,rows){
                        if(rows[0][0].res){
                            resolve({ executed: 1, data: {} });
                        }else{
                            resolve({ executed: 0, data: {} });
                        }
                })
            } catch (error) {
                console.log("err==",error)
                reject({ executed: 0, data: {} });
            }
        })
    },
    validateTokenSocket:(socket)=>{
        return new Promise((resolve,reject) => {
            try {
               
                
                database.executeQuery(
                    storeProcudures.validateToken,[
                        socket.data.uniqueId,
                        socket.data.id
                    ],
                    '', function(err,rows){
                        if(rows[0][0].res){
                            resolve({ executed: 1, data: {} });
                        }else{
                            resolve({ executed: 0, data: {} });
                        }
                })
            } catch (error) {
                console.log("err==",error)
                reject({ executed: 0, data: {} });
            }
        })
    }

}