const userService = require("../../services/v2/scoketServices");
// const database = require("../../common/database");

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

    // 📜 Fetch Chat User List
    socket.on("chat-user-list", async (pageIndex,pageSize) => {
        let userId = user?.id || 0
        try {
           
            const rows = await userService.chatUserList(userId,pageIndex,pageSize)
           

            // Emit the user list back to the client
            socket.emit("chat-user-list", { executed: 1, data: rows });

        } catch (error) {
            console.error("Error fetching chat user list:", error);
            socket.emit("chat-user-list", { executed: 0, data: {} });
        }
    });
};

module.exports = socketController;
