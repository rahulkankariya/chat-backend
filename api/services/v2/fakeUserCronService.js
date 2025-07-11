const cron = require('node-cron');
const { insertFakeUsers } = require('./fakeUserService');
const chatUsers = [];
const io = require('socket.io');
// Cron: every 1 minute
function startFakeUserCron() {
  cron.schedule('*/1 * * * *', async () => {
    console.log('🕐 [CRON] Creating 5 fake users...');
    await insertFakeUsers(5);
  });
}

module.exports = { startFakeUserCron };
