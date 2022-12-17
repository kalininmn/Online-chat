import express from 'express';
import http from 'http';
import { Server } from "socket.io";

import Authentication from './API/Authentication';

const app = express();
const port = 8081;
const server = http.createServer(app);
const io = new Server(server);

// app.use(Authentication);

import { ChatMessagesData } from './Data/ChatMessagesData';
import { ClientsData } from './Data/ClientsData';


const messages: ChatMessagesData[] = [];
const clients: ClientsData = {
  'nikita': ['lol'],
};

io.use((socket, next) => {
  // if (!clients[socket.handshake.auth.name].includes(socket.handshake.auth.session)) {
  //   socket.removeAllListeners('message'); 
  // }
  next();
});

io.on('connection', (socket) => {
  console.log('user a connected');

  socket.on('message', (data) => {
    console.log(data);
    messages.push(data);
    sendMessageAllClients();
  });
});

function sendMessageAllClients() {
  io.sockets.emit('message', messages.slice(-1));
}

server.listen(port, () => {
  console.log(`http server running on port ${port}`);
})