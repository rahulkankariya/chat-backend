const { Server } = require("socket.io");
const middleware = require("../middleware/middleware");
const { handleSocketConnection } = require("../socket/socketHandler");

const initializeSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" }, methods: ["GET", "POST"] });

    // Apply authentication middleware
    io.use(middleware.socketToken);

    io.on("connection", (socket) => {
    
        const user = socket.user;
        // console.log("Connection",socket)
        if (!user) {
            console.log("Unauthorized socket connection attempt.");
            socket.disconnect(true);
            return;
        }

        handleSocketConnection(io, socket);
    });

    return io;
};

module.exports = { initializeSocket };
