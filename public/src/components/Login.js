import { login } from "../services/api.js";

export function renderLoginPage() {
  document.getElementById("root").innerHTML = `
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
      <input type="email" id="email" placeholder="Email" class="w-full p-2 border rounded mb-2" />
      <input type="password" id="password" placeholder="Password" class="w-full p-2 border rounded mb-4" />
      <button id="loginBtn" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
    </div>
  `;

  document.getElementById("loginBtn").addEventListener("click", login);
}
