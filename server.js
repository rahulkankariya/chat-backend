const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./api/common/socket");
const Redis = require("ioredis");
const firebase = require('./api/common/firebase')
// Redis Initialization
const redis = new Redis(); // Default: 127.0.0.1:6379

redis.ping()
  .then(result => {
    console.log("✅ Redis Connected:", result); // Expect "PONG"
  })
  .catch(err => {
    console.error("❌ Redis Connection Failed:", err.message);
  });

const server = http.createServer(app);

// Initialize Socket.io with Redis if needed
initializeSocket(server, redis); // passing redis if your socket logic uses it

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
