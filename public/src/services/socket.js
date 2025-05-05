import { renderChatList } from "../components/ChatList.js";
import { displayMessage } from "../utils/helpers.js";

// let socket;
export let socket;
export function connectSocket(token) {
  socket = io({ extraHeaders: { Authorization: token } });

  socket.on("connect", () => {
    socket.emit("request-user-list", { pageIndex: 1, pageSize: 10 });
  });

  socket.on("response-user-list", (data) => {
    if (data.status === 200) {
      renderChatList(data?.data?.userList || [])

    };
  });

  socket.on("message-list", (data) => {
    console.log("data==>",data)
    displayMessage(data.message, "left");
  });

  socket.on("force-logout", () => logout());
}
