import { renderLoginPage } from "./components/Login.js";
import { showChatUI } from "./utils/helpers.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    showChatUI(token);
  } else {
    renderLoginPage();
  }
});
