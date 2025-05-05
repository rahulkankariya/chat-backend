import { sendMessage } from "../utils/helpers.js";

export function renderChatSection() {
  document.getElementById("root").innerHTML = `
  <div class="w-full h-screen flex">
      <!-- Sidebar (User List) -->
      <div class="w-1/3 bg-gray-100 border-r overflow-y-auto h-full" id="userList"></div>

      <!-- Chat Section -->
      <div class="w-2/3 flex flex-col h-full hidden" id="chatSection"> <!-- ✅ Initially hidden -->
        <div class="bg-blue-500 p-4 text-white font-bold flex justify-between items-center">
          <span id="chatHeader">Select a User</span>
        </div>
        <div class="flex-1 p-4 overflow-y-auto" id="chatBox"></div>
        <div class="p-4 border-t flex">
          <input type="text" id="messageInput" class="flex-1 p-2 border rounded-lg" placeholder="Type a message..." />
          <button id="sendMessageBtn" class="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
        </div>
      </div>
    </div>
  `;

  // ✅ Attach event listener AFTER rendering UI
  setTimeout(() => {
    const sendMessageBtn = document.getElementById("sendMessageBtn");
    if (sendMessageBtn) {
      sendMessageBtn.addEventListener("click", sendMessage);
    } else {
      console.error("⚠️ Send button not found!");
    }
  }, 0);
}
