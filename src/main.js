import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { HubConnectionBuilder } from '@microsoft/signalr'

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5152/chathub")
  .build();

connection.on("ReceiveMessage", (user, message) => {
  console.log("Received message: ", user, message);
  const msg = `<p class="mt-2 text-gray-600 dark:text-gray-400">Message ${message} from ${user}</p>`;
  const messageContainer = document.getElementById("messageContainer");

  // messageContainer.appendChild(msg);
  messageContainer.innerHTML += msg;
});

connection.start();
