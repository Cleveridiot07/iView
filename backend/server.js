// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:5173' // Replace with your frontend's URL
}));

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('down', (data) => {
    socket.broadcast.emit('down', data);
  });

  socket.on('circle', (data) => {
    socket.broadcast.emit('circle', data);
  });
  socket.on('codeUpdate', (code) => {
    socket.broadcast.emit('codeUpdate', code);
  });
  socket.on('runCode', (code) => {
    socket.broadcast.emit('runCode', code);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
