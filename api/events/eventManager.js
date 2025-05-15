// eventManager.js
const redisService = require('../services/v2/redisService');  // Redis logic abstraction
const socketServices = require('../services/v2/socketServices');

// Constants for events (helps prevent typos)
const EVENTS = {
  USER_STATUS_UPDATED: "user-status-updated",
  CHAT_USER_LIST: "chat-user-list",
  SEND_MESSAGE: "send-message",
  INDIVIDUAL_MESSAGE_LIST: "individual-message-list",
  NEW_MESSAGE: "new-message"
};

// Centralized function to emit events (with optional socket and data)
const emitEvent = (socket, event, data = {}) => {
  socket.emit(event, data);
};

// Reusable handler for user status updates (online/offline)
const updateUserStatus = async (user, status, io) => {
  try {
    const statusText = status === 1 ? 'online' : 'offline';
    
    // Store user status in Redis using the Redis service
    await redisService.setUserStatus(user.id, statusText);

    // Broadcast status update to all clients
    io.emit(EVENTS.USER_STATUS_UPDATED, { userId: user.id, status: statusText });
  } catch (error) {
    console.error(`Error setting user ${status === 1 ? 'online' : 'offline'}:`, error);
    // Emit error status update back to the socket
    emitEvent(io, EVENTS.USER_STATUS_UPDATED, { userId: user.id, status: 'error' });
  }
};

// Fetch the list of users with online/offline status
const fetchChatUserList = async (user, pageIndex, pageSize, socket) => {
  try {
    // Fetch list of users (can be from DB or mock data)
    const rows = await socketServices.chatUserList(user.id, pageIndex, pageSize);
    let RediisUsers = [];
    if(rows.executed = 1){
      RediisUsers.push(rows?.data?.userList || [])
    }
  
    // Check online status for each user in Redis
    const onlineUsers = await redisService.getUserStatus();
    
    // Attach online status to each user in the list
    const userList = RediisUsers.map((row) => ({
      ...rows,
      onlines: onlineUsers[row.id] === 'online' ? 1 : 0,
    }));

    // Emit the updated chat user list with online/offline status
    emitEvent(socket, EVENTS.CHAT_USER_LIST, { executed: 1, data: rows });
  } catch (error) {
    console.error("Error fetching chat user list:", error);
    emitEvent(socket, EVENTS.CHAT_USER_LIST, { executed: 0, data: [] });
  }
};

// Send message function to handle message sending and updates
const sendMessage = async (senderId, receiverId, chatType, message, mediaType, mediaUrl, socket, io) => {
  try {
    const result = await socketServices.sendMessage(senderId, receiverId, chatType, message, mediaType, mediaUrl);
    
    if (result) {
      io.to(receiverId).emit(EVENTS.NEW_MESSAGE, result);
      io.emit(EVENTS.NEW_MESSAGE, result);
    } else {
      throw new Error('Failed to send the message');
    }
  } catch (error) {
    console.error('Error in sendMessage (Event Manager):', error);
    emitEvent(socket, EVENTS.SEND_MESSAGE, { executed: 0, error: error.message });
  }
};

// Fetch individual message list (to load initial or new messages)
const individualMessageList = async (senderId, receiverId, pageIndex, pageSize, socket) => {
  try {
    const rows = await socketServices.individualMessageList(senderId, receiverId, pageIndex, pageSize);
    emitEvent(socket, EVENTS.INDIVIDUAL_MESSAGE_LIST, { executed: 1, data: rows });
  } catch (error) {
    console.error("Error fetching individual message list:", error);
    emitEvent(socket, EVENTS.INDIVIDUAL_MESSAGE_LIST, { executed: 0, data: [] });
  }
};

// Exporting functions for use in socket handling
module.exports = {
  emitEvent,
  updateUserStatus,
  fetchChatUserList,
  sendMessage,
  individualMessageList
};
