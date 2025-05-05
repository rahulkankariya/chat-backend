import { renderChatSection } from "../components/ChatSection.js";
import { connectSocket,socket } from "../services/socket.js";

export function showChatUI(token) {
  renderChatSection();
  connectSocket(token);
}

let selectedUserId = null; // ✅ Store selected user's ID

export function selectUser(userId, userName) {
  selectedUserId = userId; // ✅ Store the selected user's ID
  document.getElementById("chatHeader").textContent = userName;
  document.getElementById("chatSection").classList.remove("hidden");
}


export function displayMessage(message, side) {
  const chatBox = document.getElementById("chatBox");
  const newMessage = document.createElement("div");
  newMessage.className = `mb-2 p-2 rounded-lg w-max ${side === "right" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"}`;
  newMessage.textContent = message;
  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}
export function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  console.log("findUserId==>",selectedUserId)
  if (!message) return;

  // ✅ Emit message to the server
  socket.emit("send-message", { message:message,usreId:selectedUserId });

  // ✅ Append the message to the chat box
  const chatBox = document.getElementById("chatBox");
  const newMessage = document.createElement("div");
  newMessage.className = "mb-2 p-2 rounded-lg w-max bg-blue-500 text-white ml-auto";
  newMessage.textContent = message;

  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message

  input.value = ""; // Clear input after sending
}