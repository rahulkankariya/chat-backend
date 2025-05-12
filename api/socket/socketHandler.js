const socketController = require("../controllers/v2/socketController");

const handleSocketConnection = (io, socket) => {
    console.log(`User Connected: (Socket ID: ${socket.user.id})`,"Io==?",socket.id);

    // Delegate event handling to the controller
    socketController(io, socket);

    socket.on("disconnect", () => {
        console.log(`User Disconnected: (Socket ID: ${socket.id})`);
    });
};

module.exports = { handleSocketConnection };
