const database = require('../../common/database')
const storeProcudures = require('../../common/storeProcdure')
const updateUserStatus = async (userId, status) => {
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
};

module.exports = { updateUserStatus };
