const userService = require("../../services/v1/scoketServices");
const stringConstant = require("../../common/stringconstant");

const socketController = (io, socket) => {
    const user = socket.user;

    // Mark user online
    userService.updateUserStatus(user.id, 1).catch((error) => {
        console.error("Error updating user online status:", error);
    });

    socket.on("request-user-list", async (data) => {
        console.log("request-user-list", data, socket.user.id);
        const { pageIndex, pageSize } = data;

        try {
            const users = await userService.getActiveUsers(pageIndex, pageSize, socket?.user?.id||0);
            console.log("User==?",users)
            socket.emit("response-user-list", { status: 200, message: stringConstant.SUCCESS, data: users?.data });
        } catch (error) {
            console.error("Error fetching user list:", error);
            socket.emit("response-user-list", { status: 500, message: stringConstant.SOMETHINGWENTWRONG, data: error });
        }
    });

    //new message
    socket.on("send-message", async (data) => {
        console.log("send-message", data);
       

        try {
            const users = await userService.sendMessage(socket?.user?.id||0,data?.usreId || 0, data?.message || "",);
            console.log("User==?",users)
            socket.emit("response-user-list", { status: 200, message: stringConstant.SUCCESS, data: users?.data });
        } catch (error) {
            console.error("Error fetching user list:", error);
            socket.emit("response-user-list", { status: 500, message: stringConstant.SOMETHINGWENTWRONG, data: error });
        }
    });

    socket.on("message-list", async (data) => {
        console.log("message-list", data);
       

        // try {
        //     const users = await userService.sendMessage(socket?.user?.id||0,data?.usreId || 0, data?.message || "",);
        //     console.log("User==?",users)
        //     socket.emit("response-user-list", { status: 200, message: stringConstant.SUCCESS, data: users?.data });
        // } catch (error) {
        //     console.error("Error fetching user list:", error);
        //     socket.emit("response-user-list", { status: 500, message: stringConstant.SOMETHINGWENTWRONG, data: error });
        // }
    });
    
    socket.on("disconnect", async () => {
        try {
            await userService.updateUserStatus(user.id, 0);
            console.log(`User Disconnected: (ID: ${user.id})`);
        } catch (error) {
            console.error("Error updating user offline status:", error);
        }
    });
};

// ✅ Ensure this is exported correctly as a function
module.exports = socketController;
