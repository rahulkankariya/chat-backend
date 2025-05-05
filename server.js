const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./api/common/socket");

const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
