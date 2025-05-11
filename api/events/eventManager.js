const userService = require("../services/v2/scoketServices"); // User service to handle user-specific operations

// Centralized function to emit events (with optional socket and data)
const emitEvent = (socket, event, data = {}) => {
  socket.emit(event, data);
};

// Reusable handler for user status updates (online/offline)
const updateUserStatus = async (user, status, io) => {
  try {
    // Update user status (1 = online, 0 = offline)
    await userService.updateUserStatus(user.id, status);
    const statusText = status === 1 ? 'online' : 'offline';
    io.emit("user-status-updated", { userId: user.id, status: statusText });
  } catch (error) {
    console.error(`Error setting user ${status === 1 ? 'online' : 'offline'}:`, error);
  }
};

// Reusable handler for fetching chat user list with pagination
const fetchChatUserList = async (user, pageIndex, pageSize, socket) => {
  try {
    const rows = await userService.chatUserList(user.id, pageIndex, pageSize);
    emitEvent(socket, "chat-user-list", { executed: 1, data: rows });
  } catch (error) {
    console.error("Error fetching chat user list:", error);
    emitEvent(socket, "chat-user-list", { executed: 0, data: [] });
  }
};

// Expose the functions to be used in the socket controller
module.exports = {
  emitEvent,
  updateUserStatus,
  fetchChatUserList,
};
