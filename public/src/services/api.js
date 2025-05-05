import { showChatUI } from "../utils/helpers.js";

export async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) return alert("Please enter email and password");

  const response = await fetch("/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data?.data?.token) {
    localStorage.setItem("token", data.data.token);
    showChatUI(data.data.token);
  } else {
    alert("Invalid credentials");
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}
