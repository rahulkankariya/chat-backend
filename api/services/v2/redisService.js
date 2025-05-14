// redisService.js
const Redis = require('ioredis');
const redis = new Redis(); // Connect to Redis server (use default config)

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

const setUserStatus = async (userId, status) => {
  try {
    const statusText = status === 1 ? 'online' : 'offline';
    await redis.hset("connectedUsers", userId, statusText);
    await redis.expire("connectedUsers", 300); // TTL 5 minutes
  } catch (error) {
    console.error(`Error setting user ${status === 1 ? 'online' : 'offline'}:`, error);
    throw error;
  }
};

const getUserStatus = async () => {
  try {
    return await redis.hgetall("connectedUsers");
  } catch (error) {
    console.error("Error fetching user statuses:", error);
    throw error;
  }
};

module.exports = { setUserStatus, getUserStatus };
