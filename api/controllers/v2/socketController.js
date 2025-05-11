const { emitEvent, updateUserStatus, fetchChatUserList } = require('../../events/eventManager'); // Import the centralized functions

const socketController = (io, socket) => {
  const user = socket.user;

  // 🔌 User comes online
  socket.on("user-online", () => updateUserStatus(user, 1, io));

  // 🔌 User goes offline (disconnect)
  socket.on("disconnect", () => updateUserStatus(user, 0, io));

  // 📜 Fetch Chat User List
  socket.on("chat-user-list", (pageIndex, pageSize) => fetchChatUserList(user, pageIndex, pageSize, socket));
};

module.exports = socketController;
