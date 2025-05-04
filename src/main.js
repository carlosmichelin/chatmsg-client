import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { HubConnectionBuilder } from '@microsoft/signalr'

let connection = null;

document.getElementById('connectForm').addEventListener('submit', (event) => {
  event.preventDefault();
});

document.getElementById('connectButton').addEventListener('click', async () => {
  const username = document.getElementById("usernameInput").value.trim();

  if (!username) {
    alert("Please enter a username.");
    return;
  }

  document.getElementById("usernameInput").disabled = true;

  connection = new HubConnectionBuilder()
    .withUrl(`http://localhost:5152/chathub?username=${encodeURIComponent(username)}`)
    .build();

  connection.on("ReceiveMessage", (user, message) => {
    console.log("Received message: ", user, message);
    const msg = `<p class="mt-2 text-gray-600 dark:text-gray-400">Message "${message}" from ${user}</p>`;
    const messageContainer = document.getElementById("messageContainer");

    // messageContainer.appendChild(msg);
    messageContainer.innerHTML += msg;
  });

  await connection.start();
});

document.getElementById('messageForm').addEventListener('submit', (event) => {
  event.preventDefault();
});

document.getElementById('sendMessageButton').addEventListener('click', async () => {
  const targetUser = document.getElementById('targetUserInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();

  if (!targetUser || !message) {
    alert('Please enter a target user and a message.');
    return;
  }

  await connection.invoke('SendMessage', targetUser, message);
});
