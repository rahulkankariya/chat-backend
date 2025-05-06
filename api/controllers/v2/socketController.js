const userService = require("../../services/v1/scoketServices");

const socketController = (io, socket) => {
    const user = socket.user;

    // 🔌 User comes online
    socket.on("user-online", async () => {
        try {
            await userService.updateUserStatus(user.id, 1); // 1 = online
            io.emit("user-status-updated", { userId: user.id, status: "online" });
        } catch (error) {
            console.error("Error setting user online:", error);
        }
    });

    // 🔌 User goes offline (disconnect)
    socket.on("disconnect", async () => {
        try {
            await userService.updateUserStatus(user.id, 0); // 0 = offline
            io.emit("user-status-updated", { userId: user.id, status: "offline" });
        } catch (error) {
            console.error("Error setting user offline:", error);
        }
    });
};

module.exports = socketController;
