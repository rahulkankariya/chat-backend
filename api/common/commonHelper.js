const config = require('../common/config')
const jwt = require('jsonwebtoken')
const  CryptoJS = require("crypto-js");
const storeProcudures = require('../common/storeProcdure')
const database = require('../common/database')
module.exports = {
    encryptPassword :(password)=>{
        const ciphertext = CryptoJS.AES.encrypt(password, config.PASSWORDKEY).toString();
        return ciphertext
    },
    decryptPassword :(password)=>{
        var bytes  = CryptoJS.AES.decrypt(password, config.PASSWORDKEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    },
    generateJwTToken(data){
        let token = jwt.sign(data,config.JWTKEY,{
            expiresIn:"365days"
        })
        return token
    },
    validateToken:(req,res)=>{
        return new Promise((resolve,reject) => {
            try {
               console.log("req.dec==>",req.decoded)
                
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
                reject({ executed: 0, data: {} });
            }
        })
    },
    validateSocketToken:(socket)=>{
        return new Promise((resolve,reject) => {
            try {
              
                    // console.log("validate Token==?",socket)
                database.executeQuery(
                    storeProcudures.validateToken,[
                        socket.uniqueId,
                        socket.id
                    ],
                    '', function(err,rows){
                        if(rows[0][0].res){
                            resolve({ executed: 1, data: {} });
                        }else{
                            resolve({ executed: 0, data: {} });
                        }
                })
            } catch (error) {
                reject({ executed: 0, data: {} });
            }
        })
    },
    onlineOffleUpdate:(id,status)=>{
        return new Promise((resolve,reject) => {
            try {
              console.log("Online offle call or not",id,status)
                
                database.executeQuery(
                    storeProcudures.userOnlineCheck,[
                        id,
                        status || 0
                    ],
                    '', function(err,rows){
                        if(rows[0][0].res==1){
                            resolve({ executed: 1, data: {} });
                        }else{
                            resolve({ executed: 0, data: {} });
                        }
                })
            } catch (error) {
                console.log("err==>",error)
                reject({ executed: 0, data: {} });
            }
        })
    },
    userActiveList:(pageIndex,pageSize,id)=>{
        return new Promise((resolve,reject) => {
            try {

                console.log("USerListSocket==>",pageIndex,pageSize,id,)
                database.executeQuery(
                    storeProcudures.userList,[
                       id,
                        (pageIndex - 1) * pageSize,
                       pageSize
                    ],
                    '', function(err,rows){
                        if(rows[0].length!=0){
                            resolve({ executed: 1, data: rows[0] });
                        }else{
                            resolve({ executed: 0, data: [] });
                        }
                }) 
            } catch (error) {
                resolve({ executed: 0, data: [] });
            }
        })
        
    }

}