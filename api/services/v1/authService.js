const database = require('../../common/database');
const commonHelper = require('../../common/commonHelper')
const storeProcudures = require('../../common/storeProcdure')

module.exports = {
    
    signup:async (req,res)=>{
        return new Promise((resolve,reject) => {
            try {
                let encryptPassword = commonHelper.encryptPassword(req.body.password);
               
                database.executeQuery(
                    storeProcudures.signup,[
                        req.body.firstName,
                        req.body.lastName,
                        req.body.email,
                        encryptPassword
                    ],
                    res, function(err,rows){
                     
        
                        if(rows[0][0].res == 1){
                            let payload ={
                                id:rows[1][0].id,
                                uniqueId:rows[1][0].uniqueId
                            }
                            let token = commonHelper.generateJwTToken(payload)
                            let userDetails = {
                                userDetails:rows[1][0],
                                token
                            }
                            resolve({ executed: 1, data: userDetails });
                        }else{
                            resolve({ executed: 2, data: {} });
                        }
                })
            } catch (error) {
                console.log("err==>",error)
                reject({ executed: 0, data: {} });
            }
        })
    },
    login:(req,res)=>{
        return new Promise((resolve,reject) => {
            try {
               
                console.log("REq,es",req.body)
                database.executeQuery(
                    storeProcudures.login,[
                        req.body.email,
                    ],
                    res, function(err,rows){
                        console.log("rows==>",rows)
                        if(rows[0][0].res == 1){ // email  found 
                        let encryptPassword = commonHelper.decryptPassword(rows[1][0].password);
                        console.log("Enc==?",encryptPassword)
                        if(encryptPassword == req.body.password){
                            database.executeQuery(
                                storeProcudures.uuidUpdate,[
                                  rows[1][0].id
                                ],
                                res, function(err,rows1){
                                    if(rows1[0][0].res == 1){
                                        let payload ={
                                            id:rows1[1][0].id,
                                            uniqueId:rows1[1][0].uniqueId
                                        }
                                        let token = commonHelper.generateJwTToken(payload)
                                        let userDetails = {
                                            userDetails:rows1[1][0],
                                            token
                                        }
                                        resolve({ executed: 1, data: userDetails });
                                    }else{

                                    }
                                 
                                })
                        
                        }else{
                            resolve({ executed: 2, data: {} });
                        }

                       }else{
                 
                        resolve({ executed: 3, data: {} });
                       }
                })
            } catch (error) {
         
                reject({ executed: 0, data: {} });
            }
        })
    },
    getProfile:(req,res)=>{
        return new Promise((resolve,reject) => {
            try {
             
                console.log("Req.bod==>",req.decoded)
                database.executeQuery(
                    storeProcudures.getProfile,[
                        req.decoded.id,
                    ],
                    res, function(err,rows){
                       console.log("Rows==>",rows)
                       if(rows[0][0].res == 1){
                        resolve({ executed: 1, data: rows[1][0] });
                       }else{
                        resolve({ executed: 0, data: {} });
                       }
                })
            } catch (error) {
               
                reject({ executed: 0, data: {} });
            }
        })
    },
    userList:(req,res)=>{
        return new Promise((resolve,reject) => {
            try {
             
                let pageIndex = req.body.pageIndex ? req.body.pageIndex : 1;
                let pageSize = req.body.pageSize ? req.body.pageSize : 10;
                database.executeQuery(
                    storeProcudures.userList,
                    [
                        req.decoded.id,
                        (pageIndex - 1) * pageSize,
                        pageSize
    
                    ], res, function (err,rows) {
                        //console.log(rows)
                        if (rows[0].length!=0) {
                            let totalPages = pageSize;
                            
                            var recordCount = rows[1][0].recordCount;
    
                            console.log("recout count==>", recordCount)
                            if (recordCount <= 0) {
                                console.log("If")
                                pageSize = 0;
                                totalPages = 0;
                            }
                            else {
                                if (parseInt(recordCount) % totalPages == 0) {
                                    console.log("If")
                                    pageSize = Math.floor(parseInt(recordCount) / totalPages);
                                    totalPages = Math.floor((parseInt(recordCount) / totalPages));
                                }
                                else {
                                    console.log("else")
                                    totalPages = Math.floor((parseInt(recordCount) / totalPages) + 1);
                                }
                            }
                            let data = {
    
                                userList: rows[0],
                                totalPages: totalPages,
                                pageIndex: pageIndex,
                                totalRecords: recordCount,
                                pageSize: req.body.pageSize ? req.body.pageSize : 10
                            };
                            resolve({ executed: 1, data: data });
                        } else {
                            let data = {
    
                                userList: [],
                                totalPages: 0,
                                pageIndex: pageIndex,
                                totalRecords: recordCount,
                                pageSize: req.body.pageSize ? req.body.pageSize : 10
                            };
                            resolve({ executed: 0, data: data });
                        }
    
    
                    })
            } catch (error) {
                
                reject({ executed: 0, data: {} });
            }
        })
    },
}