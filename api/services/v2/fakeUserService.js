const { faker } = require('@faker-js/faker');
const commonHelper = require('../../common/commonHelper');
const database = require('../../common/database'); // Adjust path if needed

function createSimpleFakeUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const avatar = faker.image.avatar();

  return {
    firstName,
    lastName,
    email,
    avatar,
    password: '123456',
  };
}

function generateFakeUsers(count = 10) {
  return faker.helpers.multiple(createSimpleFakeUser, { count });
}

async function insertFakeUsers(count = 10) {
  const users = generateFakeUsers(count);

  for (const user of users) {
    const encryptedPassword = commonHelper.encryptPassword(user.password);
    const params = [
      user.firstName,
      user.lastName,
      user.email,
      encryptedPassword,
      user.avatar,
    ];

    console.log("Params==>", ...params); // Debugging the params

    try {
      const rows = await database.newExecuteQuery('call signup(?, ?, ?, ?, ?)', params);

      // Check if user was created or skipped based on the result
      if (rows[0][0].res === 1) {
        console.log(`✅ Created user: ${user.email}`);
      } else if (rows[0][0].res === 0) { // Assuming '0' indicates an existing user
        console.log(`⚠️ Skipped (exists): ${user.email}`);
      } else {
        console.log(`⚠️ Unexpected response for user: ${user.email}`);
      }
    } catch (err) {
      console.error(`❌ Error creating user: ${user.email}`, err.message);
    }
  }
}



module.exports = { insertFakeUsers };
