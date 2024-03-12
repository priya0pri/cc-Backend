const express = require("express");
const router = express.Router();
const Message = require("../../models/message");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
const rooms = {};
wss.on("connection", function connection(ws, req) {
  // Extract room name (user ID) from URL query parameter
  const userId = req.url.substring(1);

  // Create room if not exists
  if (!rooms[userId]) {
    rooms[userId] = new Set();
  }

  // Add client to the room
  rooms[userId].add(ws);

  // Log connection
  console.log(`Client connected to room ${userId}`);

  // Handle incoming messages
  ws.on("message", async function incoming(message) {
    console.log(`Received message in room ${userId}: ${message}`);

    // Save message to MongoDB
      const newMessage = new Message({
        room: userId,
        sender: userId, // For simplicity, sender is the same as the room (user ID)
        text: message
      });
      await newMessage.save();

    // Broadcast message to all clients in the room
    rooms[userId].forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on("close", function close() {
    // Remove client from the room
    rooms[userId].delete(ws);

    // Log disconnection
    console.log(`Client disconnected from room ${userId}`);
  });
});


module.exports = router;
