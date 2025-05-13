const database = require('../../common/database')
const storeProcudures = require('../../common/storeProcdure')
const getActiveUsers = async (pageIndex,pageSize,id) => {
    return new Promise((resolve,reject) => {
        try {
        
           
            database.executeQuery(
                storeProcudures.userList,
                [
                    id,
                    (pageIndex - 1) * pageSize,
                    pageSize

                ], '', function (err,rows) {
               
                    if (rows[0].length!=0) {
                        let totalPages = pageSize;
                        
                        var recordCount = rows[1][0].recordCount;

                       
                        if (recordCount <= 0) {
                          
                            pageSize = 0;
                            totalPages = 0;
                        }
                        else {
                            if (parseInt(recordCount) % totalPages == 0) {
                               
                                pageSize = Math.floor(parseInt(recordCount) / totalPages);
                                totalPages = Math.floor((parseInt(recordCount) / totalPages));
                            }
                            else {
                                
                                totalPages = Math.floor((parseInt(recordCount) / totalPages) + 1);
                            }
                        }
                        let data = {

                            userList: rows[0],
                            totalPages: totalPages,
                            pageIndex: pageIndex,
                            totalRecords: recordCount,
                            pageSize: pageSize ? pageSize : 10
                        };
                        resolve({ executed: 1, data: data });
                    } else {
                        let data = {

                            userList: [],
                            totalPages: 0,
                            pageIndex: pageIndex,
                            totalRecords: recordCount,
                            pageSize: pageSize ? pageSize : 10
                        };
                        resolve({ executed: 0, data: data });
                    }


                })
        } catch (error) {
           
            reject({ executed: 0, data: {} });
        }
    })
};
const updateUserStatus= (id,status)=>{
    return new Promise((resolve,reject) => {
        try {
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
            reject({ executed: 0, data: {} });
        }
    })

}
const sendMessage = (senderId,reciverId,message)=>{
    return new Promise((resolve,reject) => {
        try {
            database.executeQuery(
                storeProcudures.insertChatMessage,[
                   senderId,
                   reciverId,
                   message
                ],
                '', function(err,rows){
                    if(rows[0][0].res==1){
                        resolve({ executed: 1, data: {} });
                    }else{
                        resolve({ executed: 0, data: {} });
                    }
            })
        } catch (error) {
            reject({ executed: 0, data: {} });
        }
    })
}
const messageList = (senderId,reciverId,pageIndex,pageSize)=>{
    return new Promise((resolve,reject) => {
        try {
        
           
            database.executeQuery(
                storeProcudures.messagelist,
                [
                    senderId,
                    reciverId,
                    (pageIndex - 1) * pageSize,
                    pageSize

                ], '', function (err,rows) {
               
                    if (rows[0].length!=0) {
                        let totalPages = pageSize;
                        
                        var recordCount = rows[1][0].recordCount;

                       
                        if (recordCount <= 0) {
                        
                            pageSize = 0;
                            totalPages = 0;
                        }
                        else {
                            if (parseInt(recordCount) % totalPages == 0) {
                               
                                pageSize = Math.floor(parseInt(recordCount) / totalPages);
                                totalPages = Math.floor((parseInt(recordCount) / totalPages));
                            }
                            else {
                                
                                totalPages = Math.floor((parseInt(recordCount) / totalPages) + 1);
                            }
                        }
                        let data = {

                            userList: rows[0],
                            totalPages: totalPages,
                            pageIndex: pageIndex,
                            totalRecords: recordCount,
                            pageSize: pageSize ? pageSize : 10
                        };
                        resolve({ executed: 1, data: data });
                    } else {
                        let data = {

                            userList: [],
                            totalPages: 0,
                            pageIndex: pageIndex,
                            totalRecords: recordCount,
                            pageSize: pageSize ? pageSize : 10
                        };
                        resolve({ executed: 0, data: data });
                    }


                })
        } catch (error) {
           
            reject({ executed: 0, data: {} });
        }
    })
}

module.exports = { getActiveUsers,updateUserStatus,sendMessage,messageList };
