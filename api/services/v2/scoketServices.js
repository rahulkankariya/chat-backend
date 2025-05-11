const database = require('../../common/database');
const storeProcedures = require('../../common/storeProcdure');

// Update user online/offline status
const updateUserStatus = async (userId, status = 0) => {
  try {
    return new Promise((resolve, reject) => {
      database.executeQuery(
        storeProcedures.userOnlineCheck,
        [userId, status],
        '',
        (err, rows) => {
          if (err) return reject({ executed: 0, error: err });

          const result = rows?.[0]?.[0]?.res;
          resolve({
            executed: result === 1 ? 1 : 0,
            data: {},
          });
        }
      );
    });
  } catch (error) {
    return { executed: 0, error };
  }
};

// Get paginated chat user list
const chatUserList = async (userId, pageIndex = 1, pageSize = 10) => {
    
  try {
    const offset = (pageIndex - 1) * pageSize;
    const params = [userId, offset, pageSize];

    const rows = await database.newExecuteQuery(storeProcedures.userList, params);

    const userList = rows?.[0] || [];
    const recordCount = rows?.[1]?.[0]?.recordCount || 0;

    const totalPages = recordCount > 0
      ? Math.ceil(recordCount / pageSize)
      : 0;

    return {
      executed: userList.length > 0 ? 1 : 0,
      data: {
        userList,
        totalPages,
        pageIndex,
        totalRecords: recordCount,
        pageSize,
      },
    };
  } catch (error) {
    return { executed: 0, error };
  }
};

module.exports = { updateUserStatus, chatUserList };
