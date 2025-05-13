const { emitEvent, updateUserStatus, fetchChatUserList,sendMessage,individualMessageList } = require('../../events/eventManager'); // Import the centralized functions

const socketController = (io, socket) => {
  const user = socket.user;

  // 🔌 User comes online
  socket.on("user-online", () => updateUserStatus(user, 1, io));

  // 🔌 User goes offline (disconnect)
  socket.on("disconnect", () => updateUserStatus(user, 0, io));

  // 📜 Fetch Chat User List
  socket.on("chat-user-list", (pageIndex, pageSize) => fetchChatUserList(user, pageIndex, pageSize, socket));

  socket.on('send-message', async (payload) => {
    const {
      receiverId, chatType, message, mediaType, mediaUrl
    } = payload;
    const senderId = user.id
    try {
      // Call the sendMessage function from the event manager
      await sendMessage(senderId, receiverId, chatType, message, mediaType, mediaUrl, socket,io);

    } catch (error) {
      console.error('Error in send-message event handler:', error);
    }
  });
  socket.on('individual-message-list',async (payload) => {
    const {
      receiverId, pageIndex,pageSize
    } = payload;
    const senderId = user.id
    try {
  
      // Call the sendMessage function from the event manager
      await individualMessageList(senderId,receiverId, pageIndex,pageSize, socket);

    } catch (error) {
      console.error('Error in send-message event handler:', error);
    }
  });

};

module.exports = socketController;
