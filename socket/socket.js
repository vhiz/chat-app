import http from "http";
import express from "express";
import { Server } from "socket.io";
import "dotenv/config";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FrontendServer],
    methods: ["GET", "POST"],
  },
});

let users = [];

let messagesOffline = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

function sendMessage(conversationId, receiverId, content, senderName) {
  io.to(getUser(receiverId).socketId).emit("getMessage", {
    conversationId: conversationId,
    receiverId: receiverId,
    content: content,
    senderName: senderName,
  });
}

io.on("connection", function (socket) {
  console.log(socket.id + "a user connected");

  //emit all onlineUsers
  socket.on("addUsers", (userId) => {
    addUser(userId, socket.id);
    io.emit("onlineUsers", users);
  });

  // Receive message from client-side and send it back to a specific user
  socket.on(
    "privateMessage",
    ({ conversationId, receiverId, content, senderName }) => {
      // get receiverSocket
      const receiverSocket = getUser(receiverId);
      if (!receiverSocket) {
        // save the private message for when the recipient connects
        messagesOffline.push({
          receiverId: receiverId,
          senderId: socket.id,
          content,
          senderName: senderName,
        });
      } else {
        // send private message immediately
        sendMessage(conversationId, receiverId, content, senderName);
      }
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("onlineUsers", users);
    console.log(`${socket.id} disconnected`);
  });
});

const Port = process.env.PORT || 3001;
server.listen(Port, () => console.log(`Server running on port ${Port}`));
