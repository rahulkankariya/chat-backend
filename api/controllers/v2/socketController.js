const userService = require("../../services/v1/scoketServices");

const userConnections = {}; // userId => Set of socket ids

const socketController = (io, socket) => {
    const user = socket.user; // Assume user object is attached to the socket

    // 🔌 User comes online
    socket.on("user-online", async () => {
        try {
            // Track the socket connection for the user
            if (!userConnections[user.id]) {
                userConnections[user.id] = new Set();
            }

            userConnections[user.id].add(socket.id);  // Add the socket ID to the set

            // Emit 'online' only when it's the first connection (tab)
            if (userConnections[user.id].size === 1) {
                await userService.updateUserStatus(user.id, 1); // 1 = online
                io.emit("user-status-updated", { userId: user.id, status: "online" });
            }
        } catch (error) {
            console.error("Error setting user online:", error);
        }
    });

    // 🔌 User goes offline (disconnect)
    socket.on("disconnect", async () => {
        try {
            if (userConnections[user.id]) {
                // Remove the socket ID from the user's connection set
                userConnections[user.id].delete(socket.id);

                // If no more active sockets for this user, mark them offline
                if (userConnections[user.id].size === 0) {
                    // No active sockets left, mark the user as offline
                    delete userConnections[user.id];
                    await userService.updateUserStatus(user.id, 0); // 0 = offline
                    io.emit("user-status-updated", { userId: user.id, status: "offline" });
                }
            }
        } catch (error) {
            console.error("Error setting user offline:", error);
        }
    });
};

module.exports = socketController;
